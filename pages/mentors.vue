<template>
  <div class="page mentors-page">
    <div class="container">
      <h1 class="title">Mentors</h1>

      <template v-if="$fetchState.pending">
        <app-spinner class="d-block mx-auto" />
      </template>

      <template v-else-if="$fetchState.error">
        <span class="d-block text-center text-error my-4">Fetch error...</span>
      </template>

      <template v-else>
        <PersonList :persons="postList.mentor.items" strict-type="mentors" />
        <client-only>
          <infinite-loading v-if="postList.mentor.items.length >= postList.mentor.limit" @infinite="loadMoreMentors" />
        </client-only>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.postList.mentor.items = await this.$content('persons')
      .where({ mentor: { $in: ['Mentor', 'İkisi de', 'Both'] } })
      .limit(this.postList.mentor.limit)
      .skip(this.postList.mentor.skip)
      .fetch()
    this.isLoading = false
  },
  data() {
    return {
      isLoading: true,
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
        .where({ mentor: { $in: ['Mentor', 'İkisi de', 'Both'] } })
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
