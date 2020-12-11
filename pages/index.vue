<template>
  <div>
    <header><nuxt-content :document="page" /></header>
    <div class="container">
      <hr />
      <!-- Mentors -->
      <h2 class="title">
        <NuxtLink to="/mentors/"> Mentors </NuxtLink>
      </h2>
      <ul class="persons">
        <Card
          v-for="mentor in postList.mentor.items"
          :key="mentor.slug"
          class="person"
          :person="mentor"
          person-type="mentor"
        />
      </ul>
      <client-only>
        <infinite-loading @infinite="loadMoreMentors" />
      </client-only>
      <hr />

      <!-- Mentees -->
      <h2 class="title">
        <NuxtLink to="/mentees/"> Mentees </NuxtLink>
      </h2>
      <ul class="persons">
        <Card
          v-for="mentee in postList.mentee.items"
          :key="mentee.slug"
          class="person"
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
  async fetch() {
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
  async asyncData({ $content }) {
    const page = await $content('readme').fetch()

    return {
      page
    }
  },
  data() {
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
    async loadMoreMentees($state) {
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
    async loadMoreMentors($state) {
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
<style>
* {
  box-sizing: border-box;
}
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
.persons {
  list-style-type: none;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 0;
}
.person {
  width: 250px;
  height: 250px;
  text-align: center;
  margin: 30px 7.5px 0 7.5px;
}
.name {
  font-size: 26px;
}

.interestContent {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
