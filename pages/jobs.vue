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
          v-for="(job, id) in jobs"
          :key="id"
          no-body
          class="mb-1 accordion-color"
        >
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-card
              :text-variant="!$colorMode.value"
              :bg-variant="$colorMode.value"
            >
              <div class="row align-items-center justify-content-between">
                <div
                  class="d-flex col col-12 col-lg justify-content-center justify-content-lg-start"
                >
                  <b-img
                    class="w-50"
                    :src="job.logo"
                    :alt="job.company"
                  ></b-img>
                </div>
                <div
                  class="d-flex col col-12 col-lg justify-content-sm-center justify-content-lg-start flex-column"
                >
                  <b-card-title>{{ job.company }} </b-card-title>
                  <b-card-text>
                    {{ job.position }}
                  </b-card-text>
                </div>
                <div
                  class="d-flex col col-12 col-lg justify-content-center align-items-center flex-column justify-content-lg-start"
                >
                  <b-card-title>{{ job.location }} </b-card-title>
                </div>

                <div
                  class="d-flex col col-12 col-lg justify-content-center justify-content-lg-end"
                >
                  <b-button v-b-toggle="`${id}`" variant="primary"
                    >Details</b-button
                  >
                </div>
              </div>
            </b-card>
          </b-card-header>
          <b-collapse
            :id="`${id}`"
            accordion="jobs-accordion"
            role="tabpanel"
          >
            <b-card
              :text-variant="!$colorMode.value"
              :bg-variant="$colorMode.value"
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
                      <a :href="job.address">Visit the job detail 👈</a>
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

<style lang="scss">
.accordion {
  .accordion-color {
    background-color: var(--color-ui-02);
    border: none;
  }
}
</style>
