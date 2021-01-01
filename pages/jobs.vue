<template>
  <div class="page jobs-page">
    <div class="container">
      <div id="jumbotron-mentor" class="mx-auto">
        <b-jumbotron text-variant="black" border-variant="dark">
          <h1>Jobs</h1>
          <p>
            This community, driven/developed by a fellow community. <br />
            As you can see, this project is the mentorship project. Developed by mentees. <br />
            You can list your job listing below for 30 days.
          </p>
          <a href="https://forms.gle/895gP7bu1AqTbXi1A">
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
  async fetch() {
    const { jobs } = await this.$content('jobs').fetch()
    this.jobs = jobs.reverse()
  },
  data() {
    return { jobs: [] }
  },
  head() {
    const title = 'Job Listing | Find Mentor & Mentees Network'
    const description = `${this.jobs.length} job listing exists. Due to the natural need in our mentor and mentee finding platform, where more than 10 thousand pages are viewed daily, the community needs to list job postings. We can help us deliver your posting to more people.`
    const icon = 'https://findmentor.network/icon.png'
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: icon,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: description,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: icon,
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: icon,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: description,
        },
      ],
    }
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

.job {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  outline-color: transparent !important;
  margin: 1rem 1rem;

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
    a {
      padding: 4px;

      text-align: center;
      border: 2px solid transparent;
      vertical-align: middle;
      font-weight: 400;

      border-radius: 6px;
      background-color: #ff4742;
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>
