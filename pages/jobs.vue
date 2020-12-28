<template>
  <div id="jumbotron-mentor" class="container">
    <b-jumbotron text-variant="black" border-variant="dark">
      <h1>Jobs</h1>
      <p>
        <i>
          <p>
            This community, driven/developed by a fellow community. <br />
            As you can see, this project is the mentorship project. Developed by
            mentees. <br />
            You can list your job listing below for 30 days.
          </p>
        </i>
        <a href="https://forms.gle/895gP7bu1AqTbXi1A"
          ><b>Add your job listing</b></a
        >
      </p>
    </b-jumbotron>
    <b-card-group deck>
      <div v-for="job in jobs" :key="job">
        <b-card no-body class="overflow-hidden mb-4">
          <b-row no-gutters>
            <b-col md="4">
              <b-img fluid :src="job.logo" :alt="job.company"></b-img>
            </b-col>
            <b-col md="8">
              <b-card-body class="">
                <b-card-title
                  >{{ job.company }} | {{ job.position }}</b-card-title
                >
                <b-card-text>
                  {{ job.description }}
                </b-card-text>
                <b-card-text> <b>Location: </b>{{ job.location }} </b-card-text>
                <b-card-text>
                  <a :href="job.address">{{ job.address }}</a>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
          <template #footer>
            <small class="text-muted float-right"
              ><b>Posting date: </b> {{ job.date }}</small
            >
          </template>
        </b-card>
      </div>
    </b-card-group>
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
