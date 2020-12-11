<template>
  <div class="container">
    <h1>Active Mentorships</h1>
    <h3>
      <a href="https://forms.gle/1517jvGHWW1Ma66K9">Add your mentorship campaign</a>
    </h3>
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
    <hr>
    <h4>
      <a href="https://github.com/cagataycali/find-mentor/blob/master/pages/mentorships.vue">Contribute this page</a>
    </h4>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params, error }) {
    const mentorships = await $content('activeMentorships').fetch()
    return { mentorships }
  }
}
</script>
