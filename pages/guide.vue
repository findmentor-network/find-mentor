<template>
  <div id="jumbotron-mentor" class="container">

    <b-jumbotron text-variant="black" border-variant="dark" >
      <h1>Founders</h1>
      <p><i>As contributors are the actual founders of this collaborative artwork.</i></p>
      <a v-for="c in contribs" :key="c.url" class="contr-a" :href="c.url" target="_blank">
        <img class="contr-image" :src="c.avatar_url">
      </a>
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
</template>

<script>
export default {
  async asyncData({ $content }) {
    const rows = await Promise.all([
      $content('mentees').fetch(),
      $content('mentors').fetch(),
      $content('how-to-contact').fetch(),
      $content('github-best-practises').fetch(),
      $content('linkedin-best-practises').fetch()
    ])

    let contribs = await $content('contribs').fetch()
    contribs = contribs.contribs

    return { rows, contribs }
  }
}
</script>

<style>
#jumbotron-mentor {
  margin-top: 2%;
}
.contr-image {
  padding: 2px;
  width: 8%; 
  border-radius: 100%;
  opacity: 0.7;
}
.contr-image:hover {
  opacity: 1;
  transition: 0.7s;
}
.contr-a:hover {
  color: white;
}
</style>
