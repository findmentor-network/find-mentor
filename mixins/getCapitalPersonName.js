export default {
  methods: {
    getCapitalPersonName ({ model }) {
      const name = this.$lowerCase(model)
      const words = name.split(' ')
      const manipulatedName = []

      words.forEach((word) => {
        manipulatedName.push(this.$upperCaseFirst(word))
      })

      return String(manipulatedName).replace(/,/g, ' ')
    }
  }
}
