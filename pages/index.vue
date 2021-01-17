<template>
  <div class="page main-page">
    <header>
      <h1>
        <a href="https://github.com/cagataycali/find-mentor"> Feel free to contribute! </a>
      </h1>
      <p class="pad-both">Every night & every deploy, the spread sheet will be parsed by GitHub actions, then generate this beauty.</p>
      <div id="contribs">
        <template v-if="$fetchState.pending">
          <app-spinner class="d-block mx-auto my-5" />
        </template>
        <template v-else>
          <ContribList :contribs="contribs" />
        </template>
      </div>
      <template v-if="$fetchState.pending">
        <app-spinner class="d-block mx-auto my-5" />
      </template>
      <template v-else>
        <nuxt-content :document="page" />
      </template>

      <cta-button class="upcoming-button" text="Upcoming Events" to="/events/" :nuxt-link="true" />

      <NuxtLink to="/guide/" class="how-it-works-link" :class="[{ 'how-it-works-link--visited': isVisitedGuide }]" title="How It Works?">
        How It Works?
      </NuxtLink>
    </header>
    <div class="container">
      <hr />
      <!-- Mentors -->
      <h2 class="title my-4">
        <NuxtLink to="/mentors/">
          👉 Mentors
          <b-badge>({{ info.mentorCount }} people)</b-badge>
        </NuxtLink>
      </h2>
      <template v-if="$fetchState.pending">
        <app-spinner class="d-block mx-auto my-5" />
      </template>
      <template v-else>
        <PersonList :persons="mentors" strict-type="mentors" />
      </template>
      <div class="text-center">
        <NuxtLink class="text-center mb-5 btn btn-primary" to="/mentors/"> 🤳 Click here for all mentors </NuxtLink>
      </div>

      <!-- Mentees -->
      <h2 class="title mb-4 mt-5">
        <NuxtLink to="/mentees/">
          👉 Mentees
          <b-badge>({{ info.menteeCount }} people)</b-badge>
        </NuxtLink>
      </h2>
      <template v-if="$fetchState.pending">
        <app-spinner class="d-block mx-auto my-5" />
      </template>
      <template v-else>
        <PersonList :persons="mentees" strict-type="mentees" />
      </template>
      <div class="text-center">
        <NuxtLink class="text-center mb-5 btn btn-primary" to="/mentees/"> 🤳 Click here for all mentees </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    const [info, page, { contribs }] = await Promise.all([
      this.$content('info').fetch(),
      this.$content('readme').fetch(),
      this.$content('contribs').fetch(),
    ])

    const [mentors, mentees] = await Promise.all([
      // Mentors
      this.$content('persons')
        .where({ mentor: { $in: ['Mentor', 'Both'] } })
        .sortBy('registered_at', 'desc')
        .skip(Math.random() * (info.mentorCount - 0) + 0)
        .limit(16)
        .fetch(),
      // Mentees
      this.$content('persons')
        .where({ mentor: { $in: ['Mentee', 'Both'] } })
        .sortBy('registered_at', 'desc')
        .skip(Math.random() * (info.menteeCount - 0) + 0)
        .limit(16)
        .fetch(),
    ])

    this.info = info
    this.page = page
    this.contribs = contribs
    this.mentors = mentors
    this.mentees = mentees
  },
  data() {
    return {
      info: {},
      page: null,
      contribs: {},
      mentors: [],
      mentees: [],
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
  head() {
    const title = 'Find Mentor & Mentees Network'
    const description = `${this.info.mentorCount || ''} mentor is mentoring ${this.info.menteeCount | ''} people, join us!`
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
