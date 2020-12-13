export default {
  methods: {
    getPersonTypeClass({ model }) {
      const type = model

      if (type === 'mentor') {
        return 'mentor'
      } else if (type === 'mentee') {
        return 'mentee'
      } else {
        return 'both'
      }
    },
  },
}
