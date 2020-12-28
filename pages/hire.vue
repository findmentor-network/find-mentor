<template>
  <div class="page mentees-page">
    <div class="container">
      <h1 class="title">Job Seekers</h1>

      <h3>
        <a href="https://forms.gle/RnBV3sPzr8YnDjRY9"
          >Add yourself as a Hireable!</a
        >
      </h3>

      <br />
      <br />
      <template v-if="$fetchState.pending">
        <app-spinner class="d-block mx-auto" />
      </template>

      <template v-else-if="$fetchState.error">
        <span class="d-block text-center text-error my-4">Fetch error...</span>
      </template>

      <template v-else>
        <PersonList :persons="postList.hire.items" strict-type="mentees" />
        <client-only>
          <infinite-loading
            v-if="postList.hire.items.length >= postList.hire.limit"
            @infinite="loadMorePersons"
          />
        </client-only>
      </template>
      <h4>
        <a
          href="https://github.com/cagataycali/find-mentor/blob/master/pages/hire.vue"
          >Contribute this page</a
        >
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.postList.hire.items = await this.$content('persons')
      .where({ isHireable: true })
      .limit(this.postList.hire.limit)
      .skip(this.postList.hire.skip)
      .fetch()
  },
  data() {
    return {
      postList: {
        hire: {
          items: [],
          limit: 16,
          skip: 0,
        },
      },
    }
  },
  methods: {
    async loadMorePersons($state) {
      this.postList.hire.skip += this.postList.hire.limit

      const hire = await this.$content('persons')
        .where({ mentor: { $in: ['Mentee', 'İkisi de'] } })
        .limit(this.postList.hire.limit)
        .skip(this.postList.hire.skip)
        .fetch()

      this.postList.hire.items.push(...hire)
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
