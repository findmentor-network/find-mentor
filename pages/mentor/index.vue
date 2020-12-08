<template>
  <div class="container">
    <h1>Mentors</h1>
    <ul class="persons">
      <li v-for="mentor in mentors" :key="mentor.slug" class="person">
        <b-avatar :src="mentor.avatar" size="6rem" />
        <NuxtLink :to="'/mentor/' + mentor.slug">
          <h3 class="name">
            {{ mentor.name }}
          </h3>
        </NuxtLink>
        <p class="head">
          Interests:
        </p>
        <p class="interestContent">
          {{ mentor.interests }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const mentors = await $content('mentors').fetch()
    return { mentors }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
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
