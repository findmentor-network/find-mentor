<template>
  <div class="page mentors-page">
    <div class="container">
      <h1 class="title">Mentors</h1>
      <ul class="persons mentors">
        <h5 v-if="postList.mentor.items.length <= 0" class="d-block mb-4">
          No results...
        </h5>
        <PersonCard
          v-for="(mentor, index) in postList.mentor.items"
          v-else
          :key="index"
          :person="mentor"
          person-type="mentor"
        />
      </ul>
      <client-only>
        <infinite-loading
          v-if="postList.mentor.items.length >= postList.mentor.limit"
          @infinite="loadMoreMentors"
        />
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
  },
  data() {
    return {
      postList: {
        mentor: {
          items: [],
          limit: 16,
          skip: 0,
        },
      },
    }
  },
  methods: {
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
    },
  },
}
</script>

<style lang="scss">
.mentors-page {
  .title {
    display: block;
    margin: 2.4rem auto;
    color: var(--color-ui-03);
  }
}
</style>
