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
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img
              :src="job.logo"
              :alt="job.company"
              class="rounded-0"
            ></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body :title="job.company + ' | ' + job.position">
              <b-card-text>
                {{ job.company }} | {{ job.position }}
              </b-card-text>
              <b-card-text>
                {{ job.description }}
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
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

<style>
.card-title {
  color: black;
}
.card-text {
  color: #343b3f !important;
}
</style>
