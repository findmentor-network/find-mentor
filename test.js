const persons = require('./content/persons.json')
let activeMentorships = require('./content/activeMentorships.json')

activeMentorships = activeMentorships.mentorships

persons.map((person) => {
  person.mentorships = activeMentorships.filter((mentorship) => {
    if (mentorship.mentor.endsWith(person.slug)) {
      return mentorship
    }
  })
  person.contributions = activeMentorships.filter((mentorship) => {
    const gh = person.github
    console.log(gh)
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

console.log(persons);


