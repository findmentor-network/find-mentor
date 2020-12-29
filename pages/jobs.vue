<template>
  <div id="jumbotron-mentor" class="container">
    <b-jumbotron text-variant="black" border-variant="dark">
      <h1>Jobs</h1>

      <div class="description">
        <p>This community, driven/developed by a fellow community.</p>
        <p>You can list your job listing below for 30 days.</p>
        <p>As you can see, this project is the mentorship project. Developed by mentees.</p>
      </div>

      <a href="https://forms.gle/895gP7bu1AqTbXi1A">
        <b>Add your job listing</b>
      </a>
    </b-jumbotron>

    <div class="accordion" role="tablist">
      <div
        v-for="(job, id) in jobs"
        :key="id"
        no-body
        class="shadow mb-2 accordion-color"
      >
        <div v-b-toggle="`${id}`" class="job">
          <div class="job-img">
            <a href="#">
              <img :src="job.logo" :alt="job.company" />
            </a>
          </div>
          <div class="job-content">
            <h3>{{ job.company }}</h3>
            <h4>{{ job.position }}</h4>
          </div>
          <div class="job-tags">
            <p v-for="(item, jobId) in job.tags" :key="jobId">
              {{ item }}
            </p>
          </div>

          <div class="job-button">
            <a :href="job.address" target="_blank">Apply</a>
          </div>
        </div>

        <b-collapse :id="`${id}`" accordion="jobs-accordion" role="tabpanel">
          <b-card-body class="card">
            <b-card-title>
              {{ job.company }} | {{ job.position }}
            </b-card-title>

            <b-card-text> <b>Posting date: </b> {{ job.date }} </b-card-text>

            <b-card-text>
              {{ job.description }}
            </b-card-text>

            <b-card-text> <b>Location: </b>{{ job.location }} </b-card-text>

            <b-card-text>
              <a :href="job.address">Visit the job detail 👈</a>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </div>
    </div>
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
  methods: {
    jobButton: (e) => {
      e.stopPropagation()
    },
  },
}
</script>

<style lang="scss">
.jumbotron {
  .description {
    margin-bottom: 1rem;

    p {
      margin: 0rem;
      font-style: oblique;
    }

  }
}

.accordion {
  .accordion-color {
    background-color: var(--color-ui-02);
    border: none;

    .card {
      border-radius: 0px 0px 0.25rem 0.25rem;
      border-width: 0px;
    }
  }
}

.job {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  outline: none;
  padding: 1rem;

  // box-shadow: 0px 2px 8px rgba(155, 155, 155, 0.5);

  &-img {
    a {
      text-decoration: none;
    }

    img {
      height: 48px;
    }
  }

  &-content {
    h3 {
      font-size: 16px;
      margin: 0;
      display: inline;
      vertical-align: middle;
      font-weight: 400;
    }

    h4 {
      font-size: 18px;
      line-height: 1.5;
    }
  }

  &-tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    p {
      border: 2px solid #0f1115;
      border-radius: 6px;
      display: table;
      padding: 0.33em;
      margin: 0.2em;
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 700;
      vertical-align: middle;
    }
  }

  &-button {
    display: flex;
    &:hover a {
      // visibility: visible;
    }
    a {
      // visibility: hidden;
      padding: 4px;

      text-align: center;
      border: 2px solid transparent;
      vertical-align: middle;
      font-weight: 400;

      border-radius: 6px;
      background-color: #ff4742;
      color: #fff;
      font-size: 16px;
      // &:hover {
      //   visibility: visible;
      //   background-color: blue;
      // }
    }
  }
}
</style>
