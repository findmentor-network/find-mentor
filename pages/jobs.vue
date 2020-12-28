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

    <template>
      <div class="app-tile accordion" role="tablist">
        <b-card
          v-for="job in jobs"
          :key="job.id"
          no-body
          class="mb-1 accordion-color"
        >
          <b-card-header
            :table-variant="$colorMode.value"
            header-tag="header"
            class="p-1"
            role="tab"
          >
            <b-card bg-variant="light" text-variant="white">
              <b-row align-v="center">
                <b-col md="2">
                  <b-img
                    class="w-"
                    fluid
                    :src="job.logo"
                    :alt="job.company"
                  ></b-img>
                </b-col>
                <b-col md="3" class="ml-5">
                  <b-card-title>{{ job.company }} </b-card-title>
                  <b-card-text>
                    {{ job.position }}
                  </b-card-text>
                </b-col>
                <b-col md="3" class="ml-5">
                  <b-card-title>{{ job.location }} </b-card-title>
                  <b-card-text> Location </b-card-text>
                </b-col>

                <b-col md="1">
                  <b-button v-b-toggle="`${job.id}`" variant="primary"
                    >Details</b-button
                  >
                </b-col>
              </b-row>
            </b-card>
          </b-card-header>
          <b-collapse
            :id="`${job.id}`"
            accordion="jobs-accordion"
            role="tabpanel"
          >
            <b-card
              :table-variant="$colorMode.value"
              no-body
              class="overflow-hidden mb-4"
            >
              <b-row no-gutters>
                <b-col md="12">
                  <b-card-body class="">
                    <b-card-title
                      >{{ job.company }} | {{ job.position }}</b-card-title
                    >
                    <b-card-text
                      ><b>Posting date: </b> {{ job.date }}
                    </b-card-text>
                    <b-card-text>
                      {{ job.description }}
                    </b-card-text>
                    <b-card-text>
                      <b>Location: </b>{{ job.location }}
                    </b-card-text>
                    <b-card-text>
                      <a :href="job.address">{{ job.address }}</a>
                    </b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-collapse>
        </b-card>
      </div>
    </template>
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
