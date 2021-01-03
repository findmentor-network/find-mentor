<template>
  <div class="page mentorships-page">
    <div class="container">
      <div id="jumbotron-mentor" class="mx-auto">
        <b-jumbotron text-variant="black" border-variant="dark">
          <h1>Mentorships</h1>
          <p>
            This community, driven/developed by a fellow community. <br />
            As you can see, this project is the mentorship project. Developed by mentees. <br />
            You can find the mentors active mentorship campaigns below. <br />
            Pick one & contribute. You're mentee now.
          </p>
          <a href="https://forms.gle/1517jvGHWW1Ma66K9">
            <b>Add your mentorship campaign</b>
          </a>
        </b-jumbotron>
      </div>

      <div v-for="mentorship in mentorships" :key="mentorship.slug" class="p-card">
        <ActiveMentorshipCard :mentorship="mentorship" />
      </div>
    </div>
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

.mentorships-page {
  .title {
    display: block;
    margin: 2.4rem auto;
    color: var(--color-ui-04);
  }
}

.p-card {
  display: flex;
  justify-content: center;
}
</style>
