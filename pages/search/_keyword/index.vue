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
  async fetch () {
    this.postList.items = await this.$content('persons').search(this.$lowerCase(this.$route.params.keyword)).fetch()
  },
  data () {
    return {
      postList: {
        items: []
      }
    }
  },
  head () {
    const title = 'Search | Find Mentor & Mentees Network'
    const description = 'Find in findmentork.network'
    const icon = 'https://findmentor.network/icon.png'
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: icon
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: description
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: icon
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: icon
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: description
        }
      ]
    }
  }
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
