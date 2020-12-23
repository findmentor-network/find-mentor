/* eslint-disable camelcase */
const fs = require('fs')
const got = require('got')
const spreadsheetId =
  process.env.SPREADSHEET_ID || '1x_W7Z2o_TGmEjL5cLTFbjO1R3KzQOqIhQKu9RQ4a_P4'
const apiKey = process.env.API_KEY || 'AIzaSyA5el9Fo8rMSYkcMjUqLfJi4tDB5_n0bzY'
const slugify = require('slugify')
const githubApiKey = process.env.GH_API_KEY
const getContributors = require('./getContributors')

if (!githubApiKey) {
  console.log(
    'Please provide active github api key from https://github.com/settings/tokens'
  )
  process.exit(1)
}

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
  if (!github) return `https://ui-avatars.com/api/?name=${name}&size=256`

  const regex = /github.com\/([\w\d-]+)(. +)?/
  const response = github.match(regex)
  if (!response) return ''

  return `https://avatars.githubusercontent.com/${response[1]}`
}

const fixProtocol = (url) =>
  url
    ? 'https://' + url.replace(/https?:\/\/|(www.)/gi, '').replace(/\/$/gi, '')
    : ''

const clearTwitterAdr = (url) => url.replace(/@/g, '').trim()

const clearPeople = (people) =>
  people.map((person) => {
    person.slug = slugger(person.name)
    person.github = fixProtocol(person.github)
    person.twitter_handle = fixProtocol(person.twitter_handle)
    person.twitter_handle = clearTwitterAdr(person.twitter_handle)
    person.linkedin = fixProtocol(person.linkedin)
    person.avatar = generateAvatar(person)
    person.displayInterests = person.interests
    person.interests = person.interests.toLowerCase()
    return person
  })

const clearMentorships = (mentorships) =>
  mentorships.map((mentorship) => {
    mentorship.project_adress = fixProtocol(mentorship.project_adress)
    mentorship.slug = mentorship.project_adress.split('/').pop()
    return mentorship
  })

const getData = async () => {
  try {
    // request datas
    const attendies_url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?key=${apiKey}&fields=valueRanges(range,values)&ranges=Mentees&ranges=Aktif%20Mentorluklar`
    const contribs_url =
      'https://api.github.com/repos/cagataycali/find-mentor/contributors'
    const [attendies, contribs] = await Promise.all([
      got(attendies_url).then((res) => JSON.parse(res.body)),
      got(contribs_url, {
        headers: {
          Authorization: `token ${githubApiKey}`,
        },
      }).then((res) => JSON.parse(res.body)),
    ])

    // clear data
    let [people, mentorships] = attendies.valueRanges
    people = clearPeople(mapper(people.values.slice(4).filter((r) => r.length)))
    mentorships = clearMentorships(
      mapper(mentorships.values.slice(1).filter((r) => r.length))
    )
    mentorships = await getContributors(mentorships, people)
    let [menteeCount, mentorCount, both, total] = [0, 0, 0, 0]

    // find and place mentorships
    people.map((person) => {
      if (person.mentor === 'Mentee') {
        menteeCount++
      } else if (person.mentor === 'İkisi de') {
        both++
        mentorCount++
        menteeCount++
      } else if (person.mentor === 'Mentor') {
        mentorCount++
      }
      total++

      person.mentorships = mentorships.filter((mentorship) =>
        mentorship.mentor.endsWith(person.slug)
      )

      person.contributions = mentorships.filter((mentorship) => {
        if (!person.github) return false

        for (const contrib of mentorship.contributors) {
          const personHasContributed = contrib.github_address == person.github
          if (personHasContributed) return true
        }

        return false
      })
    })

    // remove the bot
    contribs.splice(0, 1)

    // check if contributor has find-mentor profile
    contribs.forEach((contrib) => {
      for (const person of people) {
        if (person.github === contrib.html_url) {
          contrib.fmn_url = `https://findmentor.network/peer/${person.slug}`
          break
        }
      }
    })

    const data = {
      persons: people,
      mentorships,
      contribs,
      counts: { menteeCount, mentorCount, both, total },
    }
    return { status: 200, data }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return { status: 404 }
  }
}

// writes collected data to disk
async function makeContent(name, data) {
  const serialized_data = JSON.stringify(data, null, 2)
  fs.writeFileSync(`content/${name}.json`, serialized_data)
  fs.writeFileSync(`static/${name}.json`, serialized_data)
}

// entry point
getData().then(
  ({ status, data: { persons, mentorships, contribs, counts } }) => {
    if (status !== 200) {
      throw new Error('Error when fetching data from spreadsheet')
    }

    makeContent('persons', persons)
    makeContent('activeMentorships', { mentorships })
    makeContent('contribs', { contribs })
    makeContent('info', counts)
  }
)
