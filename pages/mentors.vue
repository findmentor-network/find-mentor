<template>
  <div class="container">
    <h1>Mentors</h1>
    <input v-model="search.keyword" class="filter" placeholder="Search in Mentors" @input="searchMentor">
    <ul class="persons">
      <h5 v-if="postList.mentor.items.length <= 0">
        No results...
      </h5>
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
      <infinite-loading v-if="postList.mentor.items.length >= postList.mentor.limit && !search.isFilled" @infinite="loadMoreMentors" />
    </client-only>
  </div>
</template>

<script>
export default {
  async fetch () {
    this.postList.mentor.items = await this.$content('persons').where({ mentor: { $in: ['Mentor', 'İkisi de'] } })
      .limit(this.postList.mentor.limit)
      .skip(this.postList.mentor.skip)
      .fetch()
  },
  data () {
    return {
      search: {
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
    async loadMoreMentors ($state) {
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
    async searchMentor () {
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
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.filter {
  width: 40%;
  font-size: 14px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
  margin-left: 35px;
}

.persons {
  list-style-type: none;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 0;
}

.mentor-item {
  width: 248px;
  height: 320px;
  background-color: #17aa90;
  border-radius: 20px;
  transition: box-shadow 0.3s;
  border: 1px solid #ccc;
  overflow: hidden;
}

.mentor-item:hover {
  box-shadow: 16px 16px 16px rgba(11, 11, 11, 0.2);
}

.person {
  width: 250px;
  height: 250px;
  text-align: center;
  margin: 30px 7.5px 0 7.5px;
}
.name {
  font-size: 26px;
}

.interestContent {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
