<template>
  <div id="jumbotron-mentor" class="container">
    <h1 class="title">Jobs</h1>
    <br />
    <h3>
      <a href="https://forms.gle/895gP7bu1AqTbXi1A">Add your job listing</a>
    </h3>
    <p>This community, driven/developed by a fellow community.</p>
    <p>
      As you can see, this project is the mentorship project. Developed by
      mentees.
    </p>
    <p>You can list your job listing below for 30 days.</p>
    <div v-for="job in jobs" :key="job">
      <b-jumbotron bg-variant="dark" text-variant="white" border-variant="dark">
        <template #header>
          {{ job.company }}
        </template>

        <template #lead>
          {{ job.position }}
        </template>

        <h5>
          <a v-bind:href="job.address"> Apply </a>
        </h5>

        <br />
        <p>
          {{ job.description }}
        </p>
      </b-jumbotron>
    </div>
    <h4>
      <a
        href="https://github.com/cagataycali/find-mentor/blob/master/pages/jobs.vue"
        >Contribute this page</a
      >
    </h4>
  </div>
</template>

<script>
export default {
  async fetch() {
    const { jobs } = await this.$content('jobs').fetch()
    this.jobs = jobs
  },
  data() {
    return { jobs: [] }
  },
}
</script>

<style lang="scss" scoped>
.mentorships-page {
  .title {
    display: block;
    margin: 2.4rem auto;
    color: var(--color-ui-04);
  }
}
</style>
