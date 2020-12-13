<template>
  <div class="page mentorships-page">
    <div class="container">
      <h1 class="title">Mentorships</h1>
      <br />
      <h3>
        <a href="https://forms.gle/1517jvGHWW1Ma66K9"
          >Add your mentorship campaign</a
        >
      </h3>
      <p>This community, driven/developed by a fellow community.</p>
      <p>
        As you can see, this project is the mentorship project. Developed by
        mentees.
      </p>
      <p>You can find the mentors active mentorship campaigns below.</p>
      <p>Pick one & contribute. You're mentee now.</p>
      <br />
      <hr />
      <br />
      <div v-for="mentorship in mentorships" :key="mentorship.slug">
        <NuxtLink
          :to="`/peer/${mentorship.mentor.split('/').pop()}`"
          itemprop="url"
        >
          <active-mentorship-card :mentorship="mentorship" />
        </NuxtLink>
      </div>
      <hr />
      <h4>
        <a
          href="https://github.com/cagataycali/find-mentor/blob/master/pages/mentorships.vue"
          >Contribute this page</a
        >
      </h4>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
export default {
  async fetch() {
    const data = await this.$content('activeMentorships').fetch()
    this.mentorships = data.mentorships
  },
  data() {
    return { mentorships: [] }
  },
}
</script>

<style lang="scss" scoped>
.mentorships-page {
  .title {
    display: block;
    margin: 2.4rem auto;
    color: var(--color-ui-04);
  }
}
</style>
