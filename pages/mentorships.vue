<template>
  <div class="page mentorships-page">
    <div class="container">
      <h1 class="title">Mentorships</h1>
      <br />
      <h3>
        <a href="https://forms.gle/1517jvGHWW1Ma66K9">Add your mentorship campaign</a>
      </h3>
      <p>This community, driven/developed by a fellow community.</p>
      <p>As you can see, this project is the mentorship project. Developed by mentees.</p>
      <p>You can find the mentors active mentorship campaigns below.</p>
      <p>Pick one & contribute. You're mentee now.</p>
      <br />
      <hr />
      <br />
      <div v-for="mentorship in mentorships" :key="mentorship.slug">
        <NuxtLink :to="`/peer/${mentorship.mentor.split('/').pop()}`" itemprop="url">
          <active-mentorship-card :mentorship="mentorship" />
        </NuxtLink>
      </div>
      <hr />
      <h4>
        <a href="https://github.com/cagataycali/find-mentor/blob/master/pages/mentorships.vue">Contribute this page</a>
      </h4>
    </div>
    <br />
    <br />
    <AppFooter />
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
  head() {
    const title = 'Mentorships | Find Mentor & Mentees Network'
    const description = `${this.mentorships.length} active mentorship exists. The best way to teach is to encourage production. Join us and let us teach your expertise to someone else.`
    const icon = 'https://findmentor.network/icon.png'
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: icon,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: description,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: icon,
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: icon,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: description,
        },
      ],
    }
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
