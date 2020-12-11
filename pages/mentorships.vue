<template>
  <div class="container">
    <h1>Active Mentorships</h1>
    <p>This community, driven/developed by a fellow community.</p>
    <p>As you can see, this project is the mentorship project. Developed by mentees.</p>
    <p>You can find the mentors active mentorship campaigns below.</p>
    <p>Pick one & contribute. You're mentee now.</p>
    <ul>
      <li v-for="mentorship in mentorships" :key="mentorship.slug">
        <NuxtLink :to="`/mentorship/${mentorship.slug}`" itemprop="url">
          {{ mentorship.goal }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async fetch () {
    this.mentorships = await this.$content('mentorships').fetch()
  },
  data () {
    return {
      mentorships: []
    }
  }

}
</script>
