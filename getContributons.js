const got = require('got')

/*
We know the mentee's GitHub address.

We know the active mentorship projects GitHub addresses.

Fetch the project contributor list,
Loop through person object and inject them into a "contributions" array.
Show the contributions (as active mentee) on the peer profile.
*/
const get = async (projects) => {
  const requests = projects.map((project) => {
    const projectName = project.project_adress
      .split('/')
      .slice(project.project_adress.split('/').length - 2)
      .join('/')
    return got(
      `https://api.github.com/repos/${projectName}/contributors`
    ).then((res) => JSON.parse(res.body))
  })
  const responses = await Promise.all(requests)
  responses.map(
    (response, index) =>
      (projects[index].contributors = response.map((r) => {
        return {
          username: r.login,
          github_address: r.html_url,
          avatar: `https://avatars.githubusercontent.com/${r.login}`,
        }
      }))
  )
  return projects
}

module.exports = get
