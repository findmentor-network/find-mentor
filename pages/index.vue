<template>
  <div class="page main-page">
    <header><nuxt-content :document="page" /></header>
    <div class="container">
      <hr>
      <!-- Mentors -->
      <h2 class="title text-center my-4">
        <NuxtLink to="/mentors/">
          Mentors
        </NuxtLink>
      </h2>
      <ul class="persons">
        <PersonCard
          v-for="mentor in postList.mentor.items"
          :key="mentor.slug"
          :person="mentor"
          person-type="mentor"
        />
      </ul>
      <client-only>
        <infinite-loading @infinite="loadMoreMentors" />
      </client-only>
      <hr>

      <!-- Mentees -->
      <h2 class="title text-center my-4">
        <NuxtLink to="/mentees/">
          Mentees
        </NuxtLink>
      </h2>
      <ul class="persons">
        <PersonCard
          v-for="mentee in postList.mentee.items"
          :key="mentee.slug"
          :person="mentee"
          person-type="mentee"
        />
      </ul>
      <client-only>
        <infinite-loading @infinite="loadMoreMentees" />
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  async fetch () {
    this.postList.mentor.items = await this.$content('persons')
      .where({ mentor: { $in: ['Mentor', 'İkisi de'] } })
      .limit(this.postList.mentor.limit)
      .skip(this.postList.mentor.skip)
      .fetch()
    this.postList.mentee.items = await this.$content('persons')
      .where({ mentor: { $in: ['Mentee', 'İkisi de'] } })
      .limit(this.postList.mentee.limit)
      .skip(this.postList.mentee.skip)
      .fetch()
  },
  async asyncData ({ $content }) {
    const page = await $content('readme').fetch()

    return {
      page
    }
  },
  data () {
    return {
      postList: {
        mentor: {
          items: [],
          limit: 16,
          skip: 0
        },
        mentee: {
          items: [],
          limit: 16,
          skip: 0
        }
      }
    }
  },
  methods: {
    async loadMoreMentees ($state) {
      this.postList.mentee.skip += this.postList.mentee.limit

      const mentees = await this.$content('persons')
        .where({ mentor: { $in: ['Mentee', 'İkisi de'] } })
        .limit(this.postList.mentee.limit)
        .skip(this.postList.mentee.skip)
        .fetch()

      this.postList.mentee.items.push(...mentees)
      $state.loaded()

      if (mentees.length <= 0) {
        $state.complete()
      }
    },
    async loadMoreMentors ($state) {
      this.postList.mentor.skip += this.postList.mentor.limit

      const mentors = await this.$content('persons')
        .where({ mentor: { $in: ['Mentor', 'İkisi de'] } })
        .limit(this.postList.mentor.limit)
        .skip(this.postList.mentor.skip)
        .fetch()

      this.postList.mentor.items.push(...mentors)
      $state.loaded()

      if (mentors.length <= 0) {
        $state.complete()
      }
    }
  }
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
