<template>
  <div class="page mentees-page">
    <div class="container">
      <h1 class="title">Mentees</h1>
      <ul class="persons mentees">
        <h5 v-if="postList.mentee.items.length <= 0" class="d-block mb-4">
          No results...
        </h5>
        <PersonCard
          v-for="(mentee, index) in postList.mentee.items"
          v-else
          :key="index"
          :person="mentee"
          person-type="mentee"
        />
      </ul>
      <client-only>
        <infinite-loading
          v-if="postList.mentee.items.length >= postList.mentee.limit"
          @infinite="loadMoreMentees"
        />
      </client-only>
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
