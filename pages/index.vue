<template>
  <div class="page main-page">
    <header>
      <nuxt-content :document="page" />
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
        <NuxtLink to="/mentors/"> 👉 Mentors </NuxtLink>
      </h2>
      <ul class="persons mentors">
        <PersonCard
          v-for="mentor in mentors"
          :key="mentor.slug"
          :person="mentor"
          person-type="mentor"
        />
      </ul>
      <NuxtLink class="float-right" to="/mentors/">
        🤳 Click here for all mentors
      </NuxtLink>
      <br />
      <br />

      <!-- Mentees -->
      <h2 class="title my-4">
        <NuxtLink to="/mentees/"> 👉 Mentees </NuxtLink>
      </h2>
      <ul class="persons mentees">
        <PersonCard
          v-for="mentee in mentees"
          :key="mentee.slug"
          :person="mentee"
          person-type="mentee"
        />
      </ul>
      <NuxtLink class="float-right" to="/mentees/">
        🤳 Click here for all mentees
      </NuxtLink>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const [mentors, mentees, page] = await Promise.all([
      $content('persons')
        .where({ mentor: { $in: ['Mentor', 'İkisi de'] } })
        .sortBy('', 'desc')
        .limit(16)
        .fetch(),
      $content('persons')
        .where({ mentor: { $in: ['Mentee', 'İkisi de'] } })
        .sortBy('', 'desc')
        .limit(16)
        .fetch(),
      $content('readme').fetch(),
    ])
    return {
      mentors,
      mentees,
      page,
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
  }
  .contrib {
    text-decoration: underline;
    text-decoration-color: dodgerblue;
  }
  .information {
    padding: 10px;
    font-size: 16px;
  }
}
</style>
