<template>
  <div class="container">
    <h1>Mentees</h1>
    <input v-model="filter" class="filter" placeholder="Filter Mentees">
    <ul class="persons">
      <li v-for="(mentee, index) in filteredMentees" :key="index" class="person">
        <b-avatar :src="mentee.avatar" size="6rem" />
        <NuxtLink :to="'/mentee/' + mentee.slug">
          <h3 class="name">
            {{ mentee.name }}
          </h3>
        </NuxtLink>
        <p class="head">
          Interests:
        </p>
        <p class="interestContent">
          {{ mentee.interests }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: null
    }
  },
  computed: {
    filteredMentees() {
      if (this.filter) {
        return this.mentees.filter((mentee) => {
          return this.filter.toLowerCase().split(' ').every(v => mentee.name.toLowerCase().includes(v));
        });
      } else {
        return this.mentees;
      }
    }
  },
  async asyncData ({ $content, params }) {
    const mentees = await $content('mentees').fetch()
    return { mentees }
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
  flex-wrap: wrap;
}
.person {
  width: 250px;
  height: 250px;
  align-items: start;
  text-align: center;
  border: 1px solid grey;
  border-radius: 4px;
  padding-top: 10px;
  margin: 20px 10px 0 0;
  overflow: hidden;
}
.name {
  font-size: 26px;
  color: chocolate;
}
.head {
  color: #1d2124;
  font-size: large;
  margin-bottom: 0;
  display: inline-flex;
}
.interestContent {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
