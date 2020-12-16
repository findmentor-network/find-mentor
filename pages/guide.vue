<template>
  <div class="page guide-page">
    <div id="jumbotron-mentor" class="container">
      <b-jumbotron text-variant="black" border-variant="dark">
        <h1>Founders</h1>
        <p>
          <i>
            As contributors are the actual founders of this collaborative
            artwork.
          </i>
        </p>
        <ContribList :contribs="contribs"/>
      </b-jumbotron>

      <b-jumbotron
        v-for="(row, index) in rows"
        :key="index"
        text-variant="black"
        border-variant="dark"
      >
        <nuxt-content :document="row" />
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const rows = await Promise.all([
      $content('mentees').fetch(),
      $content('mentors').fetch(),
      $content('how-to-contact').fetch(),
      $content('github-best-practises').fetch(),
      $content('linkedin-best-practises').fetch(),
    ])

    const { contribs } = await $content('contribs').fetch()

    return { rows, contribs }
  },
  beforeMount() {
    this.checkGuideVisited()
  },
  methods: {
    checkGuideVisited() {
      if (window) {
        window.localStorage.setItem('guideVisited', true)
      }
    },
  },
}
</script>

<style>
#jumbotron-mentor {
  margin-top: 50px;
  max-width: 850px;
}
html.dark-mode #jumbotron-mentor .jumbotron {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0px 2px 8px rgba(155, 155, 155, 0.18);
}
html.dark-mode #jumbotron-mentor h1,
html.dark-mode #jumbotron-mentor p,
html.dark-mode #jumbotron-mentor li {
  color: #ddd;
}
.jumbotron {
  border-radius: 20px 0px 20px 0px;
  -moz-border-radius: 20px 0px 20px 0px;
  -webkit-border-radius: 20px 0px 20px 0px;
  padding: 2rem 2rem;
  box-shadow: 0px 2px 8px rgba(155, 155, 155, 0.5);
}
.border {
  border: unset !important;
}
.border-dark {
  /* background-color: unset; */
  border-color: unset !important;
}
</style>
