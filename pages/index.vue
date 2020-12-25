<template>
  <div class="page main-page">
    <header>
      <h1>
        <a href="https://github.com/cagataycali/find-mentor">
          Feel free to contribute!
        </a>
      </h1>
      <p class="pad-both">
        Every night & every deploy, the spread sheet will be parsed by GitHub
        actions, then generate this beauty.
      </p>
      <div id="contribs">
        <ContribList :contribs="contribs" />
      </div>
      <nuxt-content :document="page" />

      <cta-button
        class="upcoming-button"
        text="Upcoming Events"
        to="/events/"
        :nuxtLink="true"
      />

      <NuxtLink
        to="/guide/"
        class="how-it-works-link"
        :class="[{ 'how-it-works-link--visited': isVisitedGuide }]"
        title="How It Works?"
      >
        How It Works?
      </NuxtLink>
    </header>
    <div class="container">
      <hr />
      <!-- Mentors -->
      <h2 class="title my-4">
        <NuxtLink to="/mentors/">
          👉 Mentors
          <b-badge>({{ info.mentorCount }} people)</b-badge></NuxtLink
        >
      </h2>
      <PersonList :persons="mentors" strict-type="mentors" />
      <NuxtLink class="text-center d-block mb-5" to="/mentors/">
        🤳 Click here for all mentors
      </NuxtLink>

      <!-- Mentees -->
      <h2 class="title mb-4 mt-5">
        <NuxtLink to="/mentees/">
          👉 Mentees
          <b-badge>({{ info.menteeCount }} people)</b-badge></NuxtLink
        >
      </h2>
      <PersonList :persons="mentees" strict-type="mentees" />
      <NuxtLink class="text-center d-block mb-5" to="/mentees/">
        🤳 Click here for all mentees
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const [mentors, mentees, page, info] = await Promise.all([
      $content('persons')
        .where({ mentor: { $in: ['Mentor', 'İkisi de'] } })
        .sortBy('registered_at', 'desc')
        .limit(16)
        .fetch(),
      $content('persons')
        .where({ mentor: { $in: ['Mentee', 'İkisi de'] } })
        .sortBy('registered_at', 'desc')
        .limit(16)
        .fetch(),
      $content('readme').fetch(),
      $content('info').fetch(),
    ])
    const { contribs } = await $content('contribs').fetch()
    return {
      mentors,
      mentees,
      contribs,
      page,
      info,
    }
  },
  data() {
    return {
      isVisitedGuide: false,
    }
  },
  beforeMount() {
    this.checkGuideVisited()
  },
  methods: {
    checkGuideVisited() {
      const isVisited = window.localStorage.getItem('guideVisited')

      this.isVisitedGuide = isVisited
    },
  },
}
</script>

<style lang="scss">
.main-page {
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 80px 0px;

    .how-it-works-link {
      display: block;
      margin-top: 28px;
      font-size: 28px;
      &--visited {
        display: none;
      }
    }

    #contribs {
      padding: 10px;
      max-width: 700px;
    }
  }
  .information {
    padding: 10px;
    font-size: 16px;
  }
}
.pad-both {
  padding: 0px 20px;
}

.upcoming-button {
  font-size: xx-large !important;
}
</style>
