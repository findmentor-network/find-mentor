<template>
  <div class="page search-results-page">
    <div class="container">
      <h1 class="title">
        Search Results for <strong>{{ $route.params.keyword }}</strong>
      </h1>

      <p v-if="$fetchState.pending" class="text-center">Loading...</p>
      <p v-else-if="$fetchState.error" class="text-center text-error">
        Fetch Error...
      </p>
      <template v-else>
        <!-- Persons -->
        <ul class="persons mixed">
          <h5 v-if="postList.items.length <= 0" class="d-block mb-4">
            No results...
          </h5>
          <PersonCard
            v-for="(mentor, index) in postList.items"
            v-else
            :key="index"
            :person="mentor"
            :person-type="$lowerCase(mentor.mentor)"
          />
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.postList.items = await this.$content('persons')
      .search(this.$lowerCase(this.$route.params.keyword))
      .fetch()
  },
  data() {
    return {
      postList: {
        items: [],
      },
    }
  },
}
</script>

<style lang="scss">
.search-results-page {
  .title {
    display: block;
    text-align: center;
    margin: 2.4rem auto;
    color: var(--color-text-01);
  }
}
</style>
