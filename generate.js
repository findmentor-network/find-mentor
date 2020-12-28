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
    ? 'https://' + url.replace(/https?:\/\/|(www.)/gi, '').replace(/\/$/gi, '')
    : ''
}

const clearTwitterAdr = (url) => {
  return url.replace(/@/g, '').trim()
}

const clearData = (posts) => {
  return posts.map((post) => {
    post.slug = slugger(post.name)
    post.github = fixProtocol(post.github)
    post.twitter_handle = fixProtocol(post.twitter_handle)
    post.twitter_handle = clearTwitterAdr(post.twitter_handle)
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

const getData = async () => {
  try {
    // request datas
    const attendies_url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?key=${apiKey}&fields=valueRanges(range,values)&ranges=Mentees&ranges=Aktif%20Mentorluklar&ranges=Jobs&ranges=Interns`
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
    let [people, activeMentorships, jobs, hireable] = attendies.valueRanges
    jobs = mapper(jobs.values.slice(1).filter((r) => r.length))
    jobs = jobs.map((job, id) => {
      job.isRemoveAllowed = job.remote === 'Evet'
      job.tags = job.tags.split(',').map((p) => p.trim())
      return job
    })
    hireable = mapper(hireable.values.slice(1).filter((r) => r.length))

    people = clearData(mapper(people.values.slice(4).filter((r) => r.length)))
    activeMentorships = clearMentorships(
      mapper(activeMentorships.values.slice(1).filter((r) => r.length))
    )
    activeMentorships = await getContributors(activeMentorships, people)
    let [menteeCount, mentorCount, both, total] = [0, 0, 0, 0]

    // 500 x 4 = 2000 kere array icinde arama

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

      const isHireable = hireable.find((p) => p.profile.includes(person.slug))
      person.isHireable = isHireable ? true : false
      if (isHireable) {
        isHireable.person = person
      }

      person.mentorships = activeMentorships.filter((mentorship) => {
        if (mentorship.mentor.endsWith(person.slug)) {
          return mentorship
        }
      })
      person.contributions = activeMentorships.filter((mentorship) => {
        const gh = person.github
        if (gh) {
          const amIExists = mentorship.contributors.find((contributor) => {
            if (contributor.github_address === gh) {
              return contributor
            }
          })
          if (amIExists) {
            return mentorship
          }
        }
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
      activeMentorships,
      contribs,
      jobs,
      hireable,
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
  ({
    status,
    data: { persons, activeMentorships, contribs, counts, jobs, hireable },
  }) => {
    if (status !== 200) {
      throw new Error('Error when fetching data from spreadsheet')
    }

    const mentorships = activeMentorships
    makeContent('persons', persons)
    makeContent('activeMentorships', { mentorships })
    makeContent('contribs', { contribs })
    makeContent('jobs', { jobs })
    makeContent('hireable', { hireable })
    makeContent('info', counts)
  }
)
