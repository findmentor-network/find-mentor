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
      <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header
            v-b-toggle="job.jid" 
            header-tag="header"
            class="p-1"
            role="tab"
          >
          <div class="info">
            <img :src="job.logo" :alt="job.company" class="images" />
            <div class="info-items">
            <p class="item">{{ job.position }}</p>
            <p class="item">{{ job.company }}</p>
            <p class="item">{{ job.location }}</p>
            </div>
            </div>
          </b-card-header>
          <b-collapse :id="job.jid" role="tabpanel">
            <b-card-body>
              <b-card-text
                >{{ job.description }}
                <br />
                <a target="_blank" :href="job.address">Apply here</a>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
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
    // const { jobs } = await this.$content('jobs').fetch()
    // this.jobs = jobs
  },
  data() {
    return { jobs: [
      {
      "jid": "1",
      "logo": "https://http.cat/102",
      "company": "sirket",
      "location": "Antalya",
      "description": "Aciklamalarim",
      "position":"posizyon"
    },
    {
      "jid": "2",
      "logo": "https://http.cat/102",
      "company": "sirket",
      "location": "Antalya",
      "description": "Aciklamalarim",
      "position":"posizyon"
    },
    {
      "jid": "3",
      "logo": "https://http.cat/102",
      "company": "sirket",
      "location": "Antalya",
      "description": "Aciklamalarim",
      "position":"posizyon"
    },
    {
      "jid": "4",
      "logo": "https://http.cat/102",
      "company": "sirket",
      "location": "Antalya",
      "description": "Aciklamalarim",
      "position":"posizyon"
    },
    ] }
  },
}
</script>
<style>
.mb-1 {
  padding: 10px;
  background-color: rgb(52, 58, 64);
  border-radius: 30px;
  color: black;
}
.active, .mb-1:hover {
  background-color: rgb(34, 86, 179);
}
.images {
  border-radius: 50%;
  width: 75px;
  height: 75px;
  float: left;
}
.info {
  align-items: baseline;
}
.info-items {
  display: flex;
  justify-content: space-between;
}
.item {
  display: flex;
  
}
// TODO MOBILE RESPONSIVE
@media only screen and (max-width: 600px) {
  .images {
    margin-left: 35%;
    margin-right: 40%;
  }
}
</style>
