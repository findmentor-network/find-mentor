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
    const [info, items] = await Promise.all([
      this.$content('info').fetch(),
      this.$content('persons')
        .where({ mentor: { $in: ['Mentor', 'Both'] } })
        .sortBy('registered_at', 'desc')
        .limit(this.postList.mentor.limit)
        .skip(this.postList.mentor.skip)
        .fetch(),
    ])
    this.postList.mentor.items = items
    this.info = info
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
      info: {},
    }
  },
  methods: {
    async loadMoreMentors($state) {
      this.postList.mentor.skip += this.postList.mentor.limit

      const mentors = await this.$content('persons')
        .where({ mentor: { $in: ['Mentor', 'Both'] } })
        .sortBy('registered_at', 'desc')
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
  head() {
    const title = 'Mentors | Find Mentor & Mentees Network'
    const description = `${this.info.mentorCount} mentor is actually teaching here, join us!`
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
.mentors-page {
  .title {
    display: block;
    margin: 2.4rem auto;
    color: var(--color-ui-03);
  }
}
</style>
