<template>
  <div id="jumbotron-mentor" class="container">
    <b-jumbotron v-for="(row, index) in rows" :key="index" text-variant="black" border-variant="dark">
      <nuxt-content :document="row" />
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const rows = await Promise.all([
      $content('contributors').fetch(),
      $content('mentees').fetch(),
      $content('mentors').fetch(),
      $content('how-to-contact').fetch(),
      $content('github-best-practises').fetch(),
      $content('linkedin-best-practises').fetch()
    ])
    return { rows }
  }
}
</script>

<style>
#jumbotron-mentor {
  margin-top: 2%;
}
</style>
