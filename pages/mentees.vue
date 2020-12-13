<template>
  <div class="page mentees-page">
    <div class="container">
      <h1 class="title">Mentees</h1>

      <template v-if="$fetchState.pending">
        <app-spinner class="d-block mx-auto" />
      </template>

      <template v-else-if="$fetchState.error">
        <span class="d-block text-center text-error my-4">Fetch error...</span>
      </template>

      <template v-else>
        <PersonList :persons="postList.mentee.items" strict-type="mentees" />
        <client-only>
          <infinite-loading
            v-if="postList.mentee.items.length >= postList.mentee.limit"
            @infinite="loadMoreMentees"
          />
        </client-only>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.postList.mentee.items = await this.$content('persons')
      .where({ mentor: { $in: ['Mentee', 'İkisi de'] } })
      .limit(this.postList.mentee.limit)
      .skip(this.postList.mentee.skip)
      .fetch()
  },
  data() {
    return {
      postList: {
        mentee: {
          items: [],
          limit: 16,
          skip: 0,
        },
      },
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
  },
}
</script>

<style lang="scss">
.mentees-page {
  .title {
    display: block;
    margin: 2.4rem auto;
    color: var(--color-ui-04);
  }
}
</style>
