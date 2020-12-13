export default {
  methods: {
    getCapitalPersonName({ model }) {
      const name = model
      const words = name.split(' ')
      const manipulatedName = []

      words.forEach((word) => {
        manipulatedName.push(this.$upperCaseFirst(word))
      })

      return String(manipulatedName).replace(/,/g, ' ')
    },
  },
}
