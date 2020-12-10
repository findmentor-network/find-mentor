<template>
  <div class="container">
    <h1>Mentees</h1>
    <input v-model="search.keyword" class="filter" placeholder="Search in Mentees" @input="searchMentee">
    <ul class="persons">
      <h5 v-if="postList.mentee.items.length <= 0">
        No results...
      </h5>
      <Card
        v-for="(mentee, index) in postList.mentee.items"
        v-else
        :key="index"
        class="person"
        :person="mentee"
        person-type="mentee"
      />
    </ul>
    <client-only>
      <infinite-loading v-if="postList.mentee.items.length >= postList.mentee.limit && !search.isFilled" @infinite="loadMoreMentees" />
    </client-only>
  </div>
</template>

<script>
export default {
  async fetch () {
    this.postList.mentee.items = await this.$content('persons').where({ mentor: { $in: ['Mentee', 'İkisi de'] } })
      .limit(this.postList.mentee.limit)
      .skip(this.postList.mentee.skip)
      .fetch()
  },
  data () {
    return {
      search: {
        keyword: null,
        isFilled: false
      },
      postList: {
        mentee: {
          items: [],
          limit: 16,
          skip: 0
        }
      }
    }
  },
  methods: {
    async loadMoreMentees ($state) {
      this.postList.mentee.skip += this.postList.mentee.limit

      const mentees = await this.$content('persons')
        .where({ mentor: { $in: ['Mentee', 'İkisi de'] } })
        .limit(this.postList.mentee.limit)
        .skip(this.postList.mentee.skip)
        .fetch()

      this.postList.mentee.items.push(...mentees)
      $state.loaded()

      if (mentees.length <= 0) {
        $state.complete()
      }
    },
    async searchMentee () {
      const result = await this.$content('persons')
        .where({ mentor: { $in: ['Mentee', 'İkisi de'] } })
        .search(this.search.keyword)
        .fetch()

      if (this.search.keyword.length > 0) {
        this.search.isFilled = true

        this.postList.mentee.items = result
      } else {
        this.postList.mentee.skip = 0
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

.item {
  width: 248px;
  height: 320px;
  background-color: #17aa90;
  border-radius: 20px;
  transition: box-shadow 0.3s;
  border: 1px solid #ccc;
  overflow: hidden;
}

.item:hover {
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
