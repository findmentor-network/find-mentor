export default {
  methods: {
    getPersonTypeLabel ({ model }) {
      const type = this.$lowerCase(model)

      if (type === 'mentor') {
        return 'Mentor'
      } else if (type === 'mentee') {
        return 'Mentee'
      } else {
        return 'Mentor & Mentee'
      }
    }
  }
}
