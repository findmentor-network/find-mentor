export default {
  methods: {
    getPersonTypeLabel ({ model }) {
      const type = model

      if (type === 'mentor') {
        return 'Mentor'
      } else if (type === 'mentee') {
        return 'Mentee'
      } else {
        return 'Mentor ve Mentee'
      }
    }
  }
}
