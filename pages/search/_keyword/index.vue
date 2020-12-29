<template>
  <div class="page search-results-page">
    <div class="container">
      <h1 class="title">
        Search Results for <strong>{{ $route.params.keyword }}</strong>
      </h1>

      <template v-if="$fetchState.pending">
        <app-spinner class="d-block mx-auto" />
      </template>

      <template v-else-if="$fetchState.error">
        <span class="d-block text-center text-error my-4">Fetch error...</span>
      </template>

      <template v-else>
        <PersonList :persons="postList.items" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.postList.items = await this.$content('persons').search(this.$lowerCase(this.$route.params.keyword)).fetch()
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
