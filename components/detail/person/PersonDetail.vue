<template>
  <div class="person-detail">
    <!-- Profile Person Card -->
    <profile-person-card :person="person" />

    <!-- Github README -->
    <template v-if="markdown.length > 0">
      <h2>
        <font-awesome-icon class="social-media-icon" :icon="['fab', 'github']" />
        GitHub
      </h2>
      <hr />
      <div class="app-tile readme" v-html="markdown" />
    </template>

    <!-- Active Mentorships -->
    <template v-if="person.mentorships.length > 0">
      <h2 id="active-mentorships">Active Mentorships</h2>
      <hr />
      <div class="app-tile accordion" role="tablist">
        <b-card v-for="(mentorship, index) in person.mentorships" :key="mentorship.slug" no-body class="mb-1 accordion-color">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button v-b-toggle="mentorship.slug" block variant="dark">
              <h3>{{ mentorship.slug }}</h3>
            </b-button>
          </b-card-header>
          <b-collapse :id="mentorship.slug" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <h5>Contributors</h5>
              <div align="center">
                <a v-for="cont in mentorship.contributors" :key="cont.id" :href="cont.github_address">
                  <img class="cont-image" :src="cont.avatar" alt="" />
                </a>
              </div>
              <b-card-text v-if="projects[index]">
                <a class="float-right" :href="mentorship.project_adress" target="_blank">Go to project page</a>
                <hr />
                <div v-html="projects[index]" />
              </b-card-text>
              <b-card-text v-else>
                This project does not have README.md file,
                <a :href="mentorship.project_adress" target="_blank">please visit project to see content.</a>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </template>

    <!-- Contributed Projects -->
    <template v-if="person.contributions.length">
      <h2>Contributed</h2>
      <hr />
      <div v-if="person.contributions.length" class="app-tile accordion">
        <div>
          <div v-for="(contribution, index) in person.contributions" :key="index">
            <h2 :href="contribution.mentor">
              {{ contribution.slug }}
            </h2>
            <p>{{ contribution.goal }}</p>

            <div align="center">
              <a v-for="cont in contribution.contributors" :key="cont.id" :href="cont.fmn_url || cont.github_address">
                <img class="cont-image" :src="cont.avatar" alt="" />
              </a>
            </div>
            <br />
          </div>
        </div>
      </div>
      <hr />
    </template>

    <div class="row">
      <div class="col-lg-6">
        <!-- Disqus -->
        <template>
          <h2>💬 Give Feedback</h2>
          <hr />
          <div class="app-tile">
            <Disqus class="disqus-thread" :shortname="disqus.shortName" :page-config="disqus.pageConfig" />
          </div>
        </template>
      </div>
      <div class="col-lg-6">
        <!-- Tweets -->
        <template v-if="person.twitter_handle.length > 0">
          <h2>
            <font-awesome-icon class="social-media-icon" :icon="['fab', 'twitter']" />
            Tweets
          </h2>
          <hr />
          <div class="app-tile twitter-wrapper">
            <Timeline
              v-show="$colorMode.value === 'dark'"
              :id="twitterHandle"
              source-type="profile"
              :options="{ tweetLimit: '5', theme: 'dark' }"
            />
            <Timeline
              v-show="$colorMode.value === 'light'"
              :id="twitterHandle"
              source-type="profile"
              :options="{ tweetLimit: '5', theme: 'light' }"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { Disqus } from 'vue-disqus'
import { Timeline } from 'vue-tweet-embed'
import Markdown from '@nuxt/markdown'
const md = new Markdown({ toc: true, sanitize: true })

export default {
  components: {
    Disqus,
    Timeline,
  },
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      markdown: '',
      projects: [],
      disqus: {
        shortName: 'findmentor',
        pageConfig: {
          url: `https://findmentor.network${this.$route.fullPath}`,
          identifier: `https://findmentor.network${this.$route.fullPath}`,
          title: this.person.name || '',
        },
      },
    }
  },
  computed: {
    twitterHandle() {
      return this.person.twitter_handle.split('twitter.com/')[1]
    },
  },
  created() {
    if (this.person.github.length > 0) {
      this.renderMarkdown()
    }
    if (this.person.mentorships.length > 0) {
      this.renderMentorshipProjects()
    }
  },
  methods: {
    async renderMarkdown() {
      const username = this.person.github.replace(/\/$/gi, '').split('/').pop()
      const markdownContent = await fetch(`https://raw.githubusercontent.com/${username}/${username}/master/README.md`).then((res) => {
        if (res.status === 200) {
          return res.text()
        } else {
          return ''
        }
      })
      const { html } = await md.toMarkup(markdownContent)
      this.markdown = html
    },
    async renderMentorshipProjects() {
      const requests = []
      this.person.mentorships.map((mentorship) => {
        const url = mentorship.project_adress.split('/').slice(3).join('/')
        requests.push(
          fetch(`https://raw.githubusercontent.com/${url}/master/README.md`)
            .then((res) => {
              if (res.status === 200) {
                return res.text()
              } else {
                return ''
              }
            })
            .then(async (markdownContent) => {
              const { html } = await md.toMarkup(markdownContent)
              return html
            })
        )
      })
      this.projects = await Promise.all(requests)
    },
    getProfilePicture(username) {
      return `https://avatars.githubusercontent.com/${username}`
    },
    getGithubLink(username) {
      return `https://github.com/${username}`
    },
  },
}
</script>

<style lang="scss">
.profile-person-card {
  margin: 32px auto;
}

.readme,
.disqus-thread,
.accordion {
  padding: 24px;
  margin-bottom: 36px;
}

.readme {
  overflow: scroll;
}

.readme::-webkit-scrollbar {
  display: none;
}

.disqus-thread {
  height: 580px;
  background-color: var(--color-disqus-thread) !important;
  overflow-y: auto;
}

.accordion {
  .accordion-color {
    background-color: var(--color-ui-02);
    border: none;
  }
}

.cont-image {
  padding: 2px;
  width: 6%;
  border-radius: 100%;
}
.cont-image:hover {
  opacity: 0.5;
  transition: 0.7s;
}
.cont-a:hover {
  color: white;
}

.twitter-wrapper {
  width: 100%;
  height: 580px;
  overflow-y: auto;
}

@media (max-width: 900px) {
  .cont-image {
    width: 10%;
  }

  .twitter-wrapper {
    height: 300px;
    overflow: scroll;
  }
}

@media (max-width: 450px) {
  .cont-image {
    width: 14%;
  }
}
</style>
