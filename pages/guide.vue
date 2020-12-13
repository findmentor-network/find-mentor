<template>
  <div class="page guide-page">
    <div id="jumbotron-mentor" class="container">
      <b-jumbotron text-variant="black" border-variant="dark">
        <h1>Founders</h1>
        <p>
          <i
            >As contributors are the actual founders of this collaborative
            artwork.</i
          >
        </p>
        <p align="center">
          <a
            v-for="c in contribs"
            :key="c.url"
            class="contr-a"
            :href="c.fmn_url || c.html_url"
            target="_blank"
          >
            <img class="contr-image" :src="c.avatar_url" />
          </a>
        </p>
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

    let contribs = await $content('contribs').fetch()
    contribs = contribs.contribs

    return { rows, contribs }
  },
  created() {
    this.checkGuideVisited()
  },
  methods: {
    checkGuideVisited() {
      window.localStorage.setItem('guideVisited', true)
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
.contr-image {
  padding: 2px;
  width: 10%;
  border-radius: 100%;
  opacity: 0.5;
}
.contr-image:hover {
  opacity: 1;
  transition: 0.7s;
}
.contr-a:hover {
  color: white;
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
