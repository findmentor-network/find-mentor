export default {
  data() {
    return {
      reveal: false,
      backReveal: false,
    }
  },
  mounted() {
    this.revealHeader()
  },
  methods: {
    revealHeader() {
      let lastScrollTop = 0
      window.addEventListener(
        'scroll',
        () => {
          const st = window.pageYOffset || document.documentElement.scrollTop

          if (st > lastScrollTop) {
            // Downscroll code
            this.reveal = false
            this.backReveal = true
          } else {
            // Upscroll code.
            this.reveal = true
            this.backReveal = false
          }
          lastScrollTop = st <= 0 ? 0 : st // For Mobile or negative scrolling
        },

        false
      )
    },
  },
  computed: {
    revealClass() {
      return this.reveal ? 'reveal' : '' || this.backReveal ? 'back-reveal' : ''
    },
  },
}
