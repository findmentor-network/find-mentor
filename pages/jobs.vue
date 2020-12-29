<template>
  <div class="page jobs-page">
    <div class="container">
      <div id="jumbotron-mentor" class="mx-auto">
        <b-jumbotron text-variant="black" border-variant="dark">
          <h1>Jobs</h1>
          <p>
            This community, driven/developed by a fellow community. <br>
            As you can see, this project is the mentorship project. Developed by
            mentees. <br>
            You can list your job listing below for 30 days.
          </p>
          <a
            href="https://forms.gle/895gP7bu1AqTbXi1A"
          >
            <b>Add your job listing</b>
          </a>
        </b-jumbotron>
      </div>

      <JobList :jobs="jobs" />
    </div>
  </div>
</template>

<script>
export default {
  async fetch () {
    const { jobs } = await this.$content('jobs').fetch()
    this.jobs = jobs
  },
  data () {
    return { jobs: [] }
  }
}
</script>

<style lang="scss">
.accordion {
  .accordion-color {
    background-color: var(--color-ui-02);
    border: none;
  }
}

.job {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  outline-color: transparent !important;
  margin: 1rem 1rem;
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
