const got = require('got')

/*
We know the mentee's GitHub address.

We know the active mentorship projects GitHub addresses.

Fetch the project contributor list,
Loop through person object and inject them into a "contributions" array.
Show the contributions (as active mentee) on the peer profile.
*/
const get = async (projects, people) => {
  const requests = projects.map(makeRequest)
  const responses = await Promise.all(requests)

  const processes = responses.map(async (response, index) => {
    const contributors = response.map(async (data) => {
      const person = people.find((person) => person.github == data.html_url)
      return {
        username: data.login,
        github_address: data.html_url,
        avatar: `https://avatars.githubusercontent.com/${data.login}`,
        fmn_url: person ? `/peer/${person.slug}` : '',
      }
    })
    projects[index].contributors = await Promise.all(contributors)
  })
  await Promise.all(processes)

  return projects
}

const makeRequest = async (project) => {
  const projectName = project.project_adress
    .split('/')
    .slice(project.project_adress.split('/').length - 2)
    .join('/')

  const res = await got(
    `https://api.github.com/repos/${projectName}/contributors`,
    {
      headers: {
        Authorization: `token ${process.env.GH_API_KEY}`,
      },
    }
  )

  return JSON.parse(res.body)
}

module.exports = get
