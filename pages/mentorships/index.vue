<template>
  <div>
    <div class="container">
      <h1>
        <a href="https://forms.gle/1517jvGHWW1Ma66K9">Add your active mentorship project</a>
      </h1>
      <ul>
        <li v-for="mentorship in postList.mentorships.items" :key="mentorship.slug">
          <NuxtLink :to="`/mentorships/${mentorship.slug}`" itemprop="url">
            {{ mentorship.goal }}
          </NuxtLink>
        </li>
      </ul>
      <client-only>
        <infinite-loading @infinite="loadMore" />
      </client-only>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  async fetch () {
    this.postList.mentorships.items = await this.$content('mentorships')
      .limit(this.postList.mentorships.limit)
      .skip(this.postList.mentorships.skip)
      .fetch()
  },
  data () {
    return {
      postList: {
        mentorships: {
          items: [],
          limit: 16,
          skip: 0
        }
      }
    }
  },
  methods: {
    async loadMore ($state) {
      this.postList.mentorships.skip += this.postList.mentorships.limit

      const mentorships = await this.$content('mentorships')
        .limit(this.postList.mentorships.limit)
        .skip(this.postList.mentorships.skip)
        .fetch()

      this.postList.mentorships.items.push(...mentorships)
      $state.loaded()

      if (mentorships.length <= 0) {
        $state.complete()
      }
    }
  }
}
</script>
