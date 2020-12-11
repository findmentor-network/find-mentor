const fs = require('fs')
const got = require('got')
const spreadsheetId = '1x_W7Z2o_TGmEjL5cLTFbjO1R3KzQOqIhQKu9RQ4a_P4'
const apiKey = 'AIzaSyA5el9Fo8rMSYkcMjUqLfJi4tDB5_n0bzY'
const slugify = require('slugify')

const slugger = (text) =>
  slugify(text, {
    replacement: '-',
    lower: true,
    locale: 'tr'
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
    ? 'https://' + url.replace(/https?:\/\//gi, '').replace(/\/$/gi, '') : '' }

const clearData = (posts) => {
  return posts.map((post) => {
    post.slug = slugger(post.name)
    post.github = fixProtocol(post.github)
    post.twitter_handle = fixProtocol(post.twitter_handle)
    post.linkedin = fixProtocol(post.linkedin)
    post.avatar = generateAvatar(post)
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
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?key=${apiKey}&fields=valueRanges(range,values)&ranges=Mentees&ranges=Aktif%20Mentorluklar`
    let response = await got(url)
    response = JSON.parse(response.body)
    let [persons, activeMentorships] = response.valueRanges
    persons = clearData(mapper(persons.values.slice(4).filter((r) => r.length)))
    activeMentorships = clearMentorships(
      mapper(activeMentorships.values.slice(1).filter((r) => r.length))
    )

    persons.map((person) => {
      person.mentorships = activeMentorships.filter((mentorship) => {
        if (mentorship.mentor.endsWith(person.slug)) {
          return mentorship
        }
      })
    })

    const contribs_url = 'https://api.github.com/repos/cagataycali/find-mentor/contributors'
    const contribs_res = await got(contribs_url)
    const contribs = JSON.parse(contribs_res.body)

    // remove the bot
    contribs.splice(0, 1)

    // check if contributor has find-mentor profile
    contribs.forEach(contrib => {
      for (let person of persons) {
        if (person.github == contrib.html_url) {
          contrib.fmn_url = `https://findmentor.network/${person.slug}`
          break;
        }
      }
    })

    const data = { persons, activeMentorships, contribs }
    return { status: 200, data }
  } catch (err) {
    console.log(err)
    return { status: 404 }
  }
}

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
  fs.writeFileSync('content/contribs.json', JSON.stringify({ contribs }, null, 2))
})
