<template>
  <div>
    <div class="container">
      <!-- Profile Person Card -->
      <profile-person-card :person="person" />

      <!-- Github README -->
      <template v-if="markdown.length > 0">
        <h2>
          <font-awesome-icon
            class="social-media-icon"
            :icon="['fab', 'github']"
          />
          GitHub
        </h2>
        <hr />
        <div class="app-card readme" v-html="markdown" />
      </template>

      <!-- Active Mentorships -->
      <template v-if="person.mentorships.length > 0">
        <h2>Active Mentorships</h2>
        <hr />
        <div class="app-card accordion" role="tablist">
          <b-card
            v-for="(mentorship, index) in person.mentorships"
            :key="mentorship.slug"
            no-body
            class="mb-1 accordion-color"
          >
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button v-b-toggle="mentorship.slug" block variant="dark">
                {{ mentorship.slug }}
              </b-button>
            </b-card-header>
            <b-collapse
              :id="mentorship.slug"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-card-text v-if="projects[index]">
                  <a
                    class="float-right"
                    :href="mentorship.project_adress"
                    target="_blank"
                    >Go to project page</a
                  >
                  <div v-html="projects[index]" />
                </b-card-text>
                <b-card-text v-else>
                  This project does not have README.md file,
                  <a :href="mentorship.project_adress" target="_blank"
                    >please visit project to see content.</a
                  >
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </template>

      <div class="row">
        <div class="col-lg-6">
          <!-- Disqus -->
          <template>
            <h2>💬 Give Feedback</h2>
            <hr />
            <div id="disqus_thread" class="app-card disqus_thread" />
          </template>
        </div>
        <div class="col-lg-6">
          <!-- Tweets -->
          <template v-if="person.twitter_handle.length > 0">
            <h2>
              <font-awesome-icon
                class="social-media-icon"
                :icon="['fab', 'twitter']"
              />
              Tweets
            </h2>
            <hr />
            <div class="twitter-wrapper">
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
  </div>
</template>

<script>
import { Timeline } from 'vue-tweet-embed'
import Markdown from '@nuxt/markdown'
const md = new Markdown({ toc: true, sanitize: true })

export default {
  components: {
    Timeline,
  },
  props: {
    person: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      markdown: '',
      projects: [],
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
      const markdownContent = await fetch(
        `https://raw.githubusercontent.com/${username}/${username}/master/README.md`
      ).then((res) => {
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
  },
}
</script>

<style lang="scss">
.profile-person-card {
  margin: 32px auto;
}

.readme,
.disqus_thread,
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

.disqus_thread {
  background-color: var(--color-disqus-thread) !important;
  border-radius: 5px;
}

.accordion {
  .accordion-color {
    background-color: var(--color-ui-02);
    border: none;
  }
}
</style>
