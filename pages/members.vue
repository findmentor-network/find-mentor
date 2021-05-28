<template>
  <div class="page members-page">
    <div class="container">
      <h1 class="title">Members</h1>

      <template v-if="$fetchState.pending">
        <app-spinner class="d-block mx-auto" />
      </template>

      <template v-else-if="$fetchState.error">
        <span class="d-block text-center text-error my-4">Fetch error...</span>
      </template>

      <template v-else>
        <PersonList :persons="postList.member.items" strict-type="members" />
        <client-only>
          <infinite-loading v-if="postList.member.items.length >= postList.member.limit" @infinite="loadMoreMembers" />
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
        .where({ mentor: { $in: ['Member'] } })
        .limit(this.postList.member.limit)
        .skip(this.postList.member.skip)
        .fetch(),
    ])
    this.postList.member.items = items
    this.info = info
    this.isLoading = false
  },
  data() {
    return {
      isLoading: true,
      postList: {
        member: {
          items: [],
          limit: 16,
          skip: 0,
        },
      },
      info: {},
    }
  },
  methods: {
    async loadMoreMembers($state) {
      this.postList.member.skip += this.postList.member.limit

      const members = await this.$content('persons')
        .where({ mentor: { $in: ['Member'] } })
        .limit(this.postList.member.limit)
        .skip(this.postList.member.skip)
        .fetch()

      this.postList.member.items.push(...members)
      $state.loaded()

      if (members.length <= 0) {
        $state.complete()
      }
    },
  },
  head() {
    const title = 'Members | Find Mentor & Mentees Network'
    const description = `${this.info.memberCount} member is actually teaching here, join us!`
    const icon = 'https://findmember.network/icon.png'
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
.members-page {
  .title {
    display: block;
    margin: 2.4rem auto;
    color: var(--color-ui-07);
  }
}
</style>
