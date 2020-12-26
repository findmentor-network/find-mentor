<template>
  <div class="page mentorships-page">
    <div class="container">
      <h1 class="title">Jobs</h1>
      <br />
      <h3>
        <a href="https://forms.gle/895gP7bu1AqTbXi1A"
          >Add your job listing</a
        >
      </h3>
      <p>This community, driven/developed by a fellow community.</p>
      <p>
        As you can see, this project is the mentorship project. Developed by
        mentees.
      </p>
      <p>You can list your job listing below for 30 days.</p>
      <br />
      <hr />
      <br />
      <div v-for="job in jobs">
        {{job.company}}
        {{job.position}}
        {{job.address}}
        {{job.description}}
      </div>
      <hr />
      <h4>
        <a
          href="https://github.com/cagataycali/find-mentor/blob/master/pages/mentorships.vue"
          >Contribute this page</a
        >
      </h4>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
export default {
  async fetch() {
    const {jobs} = await this.$content('jobs').fetch()
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
