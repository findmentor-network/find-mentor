<template>
  <div class="page main-page">
    <header><nuxt-content :document="page" /></header>
    <div class="container">
      <hr />
      <!-- Mentors -->
      <h2 class="title my-4">
        <NuxtLink to="/mentors/">👉 Mentors</NuxtLink>
      </h2>
      <ul class="persons mentors">
        <PersonCard
          v-for="mentor in mentors"
          :key="mentor.slug"
          :person="mentor"
          person-type="mentor"
        />
      </ul>
      <NuxtLink class="float-right" to="/mentors/"
        >🤳 Click here for all mentors</NuxtLink
      >
      <br />
      <br />

      <!-- Mentees -->
      <h2 class="title my-4">
        <NuxtLink to="/mentees/">👉 Mentees</NuxtLink>
      </h2>
      <ul class="persons mentees">
        <PersonCard
          v-for="mentee in mentees"
          :key="mentee.slug"
          :person="mentee"
          person-type="mentee"
        />
      </ul>
      <NuxtLink class="float-right" to="/mentees/"
        >🤳 Click here for all mentees</NuxtLink
      >
      <br />
      <br />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const [mentors, mentees, page] = await Promise.all([
      $content('persons')
        .where({ mentor: { $in: ['Mentor', 'İkisi de'] } })
        .sortBy('', 'desc')
        .limit(16)
        .fetch(),
      $content('persons')
        .where({ mentor: { $in: ['Mentee', 'İkisi de'] } })
        .sortBy('', 'desc')
        .limit(16)
        .fetch(),
      $content('readme').fetch(),
    ])
    return {
      mentors,
      mentees,
      page,
    }
  },
}
</script>

<style lang="scss">
.main-page {
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 80px 0px;
  }
  .contrib {
    text-decoration: underline;
    text-decoration-color: dodgerblue;
  }
  .information {
    padding: 10px;
    font-size: 16px;
  }
}
</style>
