export default {
  methods: {
    getPersonTypeColor ({ model }) {
      const type = model

      if (type === 'mentor') {
        return 'var(--color-ui-03)'
      } else if (type === 'mentee') {
        return 'var(--color-ui-04)'
      } else {
        return 'var(--color-ui-05)'
      }
    }
  }
}
