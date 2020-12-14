let activeMentorships = require('./content/activeMentorships.json')
const persons = require('./content/persons.json')

activeMentorships = activeMentorships.mentorships

persons.map((person) => {
  person.mentorships = activeMentorships.filter((mentorship) => {
    if (mentorship.mentor.endsWith(person.slug)) {
      return mentorship
    }
  })
  person.conributions = activeMentorships.filter((mentorship) => {
    const gh = person.github
    if (gh) {
      const username = gh.split('/').pop()
      if (mentorship.contributors.includes(username)) {
        return mentorship
      }
    }
  })
})

console.log(persons.find(p => p.slug === 'cagatay-cali'));