<template>
  <div class="page hire-page">
    <div class="container">
      <h1 class="title">Job Seekers</h1>

      <h3>
        <a href="https://forms.gle/RnBV3sPzr8YnDjRY9">Add yourself as a Job Seeker!</a>
      </h3>

      <p>This platform getting 1m+ page views per month. Add yourself as a job seeker, totally free to add!</p>

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
          <infinite-loading v-if="postList.hire.items.length >= postList.hire.limit" @infinite="loadMorePersons" />
        </client-only>
      </template>
      <h4>
        <a href="https://github.com/cagataycali/find-mentor/blob/master/pages/hire.vue">Contribute this page</a>
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.postList.hire.items = await this.$content('persons')
      .where({ isHireable: true })
      .sortBy('contributions', 'desc')
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
        .where({ isHireable: true })
        .sortBy('contributions', 'desc')
        .limit(this.postList.hire.limit)
        .skip(this.postList.hire.skip)
        .fetch()

      this.postList.hire.items.push(...hire)
      $state.loaded()

      if (hire.length <= 0) {
        $state.complete()
      }
    },
  },
  head() {
    const title = 'Job Seekers | Find Mentor & Mentees Network'
    const description = `Discover job seekers!`
    const icon = 'https://findmentor.network/icon.png'
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: icon,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: description,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: icon,
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: icon,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: description,
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.hire-page {
  .title {
    display: block;
    margin: 2.4rem auto;
    color: var(--color-ui-04);
  }
}
</style>
