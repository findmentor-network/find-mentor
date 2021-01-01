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
          <infinite-loading v-if="postList.mentee.items.length >= postList.mentee.limit" @infinite="loadMoreMentees" />
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
        .where({ mentor: { $in: ['Mentee', 'Both'] } })
        .sortBy('registered_at', 'desc')
        .limit(this.postList.mentee.limit)
        .skip(this.postList.mentee.skip)
        .fetch()
    ])
    this.postList.mentee.items = items
    this.info = info
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
      info: {}
    }
  },
  methods: {
    async loadMoreMentees($state) {
      this.postList.mentee.skip += this.postList.mentee.limit

      const mentees = await this.$content('persons')
        .where({ mentor: { $in: ['Mentee', 'Both'] } })
        .sortBy('registered_at', 'desc')
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
  head() {
    const title = 'Mentees | Find Mentor & Mentees Network'
    const description = `${this.info.menteeCount} mentee is actually coding & learning here, join us!`
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
          content: description,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
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
.mentees-page {
  .title {
    display: block;
    margin: 2.4rem auto;
    color: var(--color-ui-04);
  }
}
</style>
