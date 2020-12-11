<template>
  <div class="container">
    <h1>Mentors</h1>
    <input
      v-model="search.keyword"
      class="filter"
      placeholder="Search in Mentors"
      @input="searchMentor"
    />
    <input
      v-model="search2.keyword"
      class="filter"
      placeholder="Search in Topics"
      @input="searchTopic"
    />
    <ul class="persons">
      <h5 v-if="postList.mentor.items.length <= 0">No results...</h5>
      <Card
        v-for="(mentor, index) in postList.mentor.items"
        v-else
        :key="index"
        class="person"
        :person="mentor"
        person-type="mentor"
      />
    </ul>
    <client-only>
      <infinite-loading
        v-if="
          postList.mentor.items.length >= postList.mentor.limit &&
          !search.isFilled
        "
        @infinite="loadMoreMentors"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.postList.mentor.items = await this.$content('persons')
      .where({ mentor: { $in: ['Mentor', 'İkisi de'] } })
      .limit(this.postList.mentor.limit)
      .skip(this.postList.mentor.skip)
      .fetch()
  },
  data() {
    return {
      search: {
        keyword: null,
        isFilled: false
      },
      search2: {
        keyword: null,
        isFilled: false
      },
      postList: {
        mentor: {
          items: [],
          limit: 16,
          skip: 0
        }
      }
    }
  },
  methods: {
    async loadMoreMentors($state) {
      this.postList.mentor.skip += this.postList.mentor.limit

      const mentors = await this.$content('persons')
        .where({ mentor: { $in: ['Mentor', 'İkisi de'] } })
        .limit(this.postList.mentor.limit)
        .skip(this.postList.mentor.skip)
        .fetch()

      this.postList.mentor.items.push(...mentors)
      $state.loaded()

      if (mentors.length <= 0) {
        $state.complete()
      }
    },
    async searchMentor() {
      this.search2.keyword = ''
      const result = await this.$content('persons')
        .where({ mentor: { $in: ['Mentor', 'İkisi de'] } })
        .search(this.search.keyword)
        .fetch()

      if (this.search.keyword.length > 0) {
        this.search.isFilled = true

        this.postList.mentor.items = result
      } else {
        this.postList.mentor.skip = 0
        this.$fetch()
        this.search.isFilled = false
      }
    },
    async searchTopic() {
      this.search.keyword = ''
      const result = await this.$content('persons')
        .where({
          interests: { $contains: this.search2.keyword },
          mentor: { $in: ['Mentor', 'İkisi de'] }
        })
        .fetch()

      if (this.search2.keyword.length > 0) {
        this.search2.isFilled = true

        this.postList.mentor.items = result
      } else {
        this.postList.mentor.skip = 0
        this.$fetch()
        this.search2.isFilled = false
      }
    }
  }
}
</script>
