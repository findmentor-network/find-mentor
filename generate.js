/* eslint-disable camelcase */
const fs = require('fs')
const got = require('got')
const spreadsheetId = '1x_W7Z2o_TGmEjL5cLTFbjO1R3KzQOqIhQKu9RQ4a_P4'
const apiKey = 'AIzaSyA5el9Fo8rMSYkcMjUqLfJi4tDB5_n0bzY'
const slugify = require('slugify')

const slugger = (text) =>
  slugify(text, {
    replacement: '-',
    lower: true,
    locale: 'tr',
  })

const mapper = (posts) => {
  const keys = posts.slice(0, 1)[0]
  return posts.slice(1).map((row) => {
    const rowData = {}
    keys.map((key, index) => {
      key = key.toLowerCase().replace(/\W/g, '_')
      rowData[key] = row[index]
    })
    return rowData
  })
}

const generateAvatar = ({ name, github }) => {
  let avatar
  if (github) {
    const regex = /github.com\/([\w\d-]+)(. +)?/
    const response = github.match(regex)
    if (!response) {
      return ''
    }
    avatar = `https://avatars.githubusercontent.com/${response[1]}`
  } else {
    avatar = `https://ui-avatars.com/api/?name=${name}&size=256`
  }
  return avatar
}

const fixProtocol = (url) => {
  return url
    ? 'https://' + url.replace(/https?:\/\//gi, '').replace(/\/$/gi, '')
    : ''
}

const clearData = (posts) => {
  return posts.map((post) => {
    post.slug = slugger(post.name)
    post.github = fixProtocol(post.github)
    post.twitter_handle = fixProtocol(post.twitter_handle)
    post.linkedin = fixProtocol(post.linkedin)
    post.avatar = generateAvatar(post)
    post.displayInterests = post.interests
    post.interests = post.interests.toLowerCase()
    return post
  })
}

const clearMentorships = (posts) => {
  return posts.map((post) => {
    post.project_adress = fixProtocol(post.project_adress)
    const projectName = post.project_adress.split('/').pop()
    post.slug = projectName
    return post
  })
}

async function getData() {
  try {
    // request datas
    const attendies_url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?key=${apiKey}&fields=valueRanges(range,values)&ranges=Mentees&ranges=Aktif%20Mentorluklar`
    const contribs_url =
      'https://api.github.com/repos/cagataycali/find-mentor/contributors'
    const responses = Promise.all([got(attendies_url), got(contribs_url)])

    // convert to json
    const [attendies, contribs] = (await responses).map((res) =>
      JSON.parse(res.body)
    )

    // clear data
    let [persons, activeMentorships] = attendies.valueRanges
    persons = clearData(mapper(persons.values.slice(4).filter((r) => r.length)))
    activeMentorships = clearMentorships(
      mapper(activeMentorships.values.slice(1).filter((r) => r.length))
    )

    // find and place mentorships
    persons.map((person) => {
      person.mentorships = activeMentorships.filter((mentorship) => {
        if (mentorship.mentor.endsWith(person.slug)) {
          return mentorship
        }
      })
    })

    // remove the bot
    contribs.splice(0, 1)

    // check if contributor has find-mentor profile
    contribs.forEach((contrib) => {
      for (const person of persons) {
        if (person.github === contrib.html_url) {
          contrib.fmn_url = `https://findmentor.network/peer/${person.slug}`
          break
        }
      }
    })

    const data = { persons, activeMentorships, contribs }
    return { status: 200, data }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return { status: 404 }
  }
}

// entry point
getData().then(({ status, data: { persons, activeMentorships, contribs } }) => {
  if (status !== 200) {
    throw new Error('Error when fetching data from spreadsheet')
  }
  fs.writeFileSync('content/persons.json', JSON.stringify(persons, null, 2))
  fs.writeFileSync('static/persons.json', JSON.stringify(persons, null, 2))
  fs.writeFileSync(
    'content/activeMentorships.json',
    JSON.stringify({ mentorships: activeMentorships }, null, 2)
  )
  fs.writeFileSync(
    'static/activeMentorships.json',
    JSON.stringify({ mentorships: activeMentorships }, null, 2)
  )
  fs.writeFileSync(
    'content/contribs.json',
    JSON.stringify({ contribs }, null, 2)
  )
})
