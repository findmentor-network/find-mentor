<template>
  <div>
    <div class="container">
      <ul class="profile-card" itemscope itemtype="https://schema.org/Person">
        <div class="left-main">
          <li v-if="avatar.length" loading="lazy">
            <img :src="avatar" class="avatar" itemprop="image" :alt="name" />
          </li>
          <div class="main">
            <li v-if="name" class="name" itemprop="name">
              {{ name }}
            </li>
            <hr />
            <li
              v-if="interests && interests.length"
              class="text"
              itemprop="seeks"
            >
              <b>Interests:</b> {{ interests }}
            </li>
            <li
              v-if="goals && goals.length"
              class="text"
              itemprop="description"
            >
              <b>Goals:</b> {{ goals }}
            </li>
            <div class="social-media">
              <li v-if="twitter.length" class="links">
                <a :href="twitter" target="_blank" itemprop="sameAs">
                  <button class="button twitter">
                    <font-awesome-icon
                      :icon="['fab', 'twitter']"
                      color="white"
                    />
                    Twitter
                  </button>
                </a>
              </li>
              <li v-if="github.length" class="links">
                <a :href="github" target="_blank" itemprop="sameAs">
                  <button class="button github">
                    <font-awesome-icon
                      :icon="['fab', 'github']"
                      color="white"
                    />
                    GitHub
                  </button>
                </a>
              </li>
              <li v-if="linkedin.length" class="links">
                <a :href="linkedin" target="_blank" itemprop="sameAs">
                  <button class="button linkedin">
                    <font-awesome-icon
                      :icon="['fab', 'linkedin']"
                      color="white"
                    />
                    LinkedIn
                  </button>
                </a>
              </li>
            </div>
          </div>
        </div>
        <li class="text">
          <a
            :href="`https://findmentor.network/peer/` + slug"
            target="_blank"
            rel="noopener noreferrer"
            itemprop="url"
          >
            <qrcode
              class="qrcode"
              :value="`https://findmentor.network/peer/` + slug"
              :options="{ width: 200 }"
            />
          </a>
        </li>
      </ul>
      <h2 v-if="markdown.length">
        GitHub
        <hr />
      </h2>
      <div v-html="markdown" />
      <hr />
      <h2>
        Gave Feedback
      </h2>

      <hr />
      <div id="disqus_thread" />
      <h2>
        Active Mentorships
      </h2>
      <hr />
      <div class="accordion" role="tablist">
        <b-card
          no-body
          class="mb-1"
          v-for="(mentorship, index) in mentorships"
          :key="mentorship.slug"
        >
          <b-card-header header-tag="header" class="p-1" role="tablist">
            <b-button block :v-b-toggle="`${mentorship.slug}`" variant="info">{{
              mentorship.slug
            }}</b-button>
          </b-card-header>
          <b-collapse
            :id="mentorship.slug"
            accordion="my-accordion"
            role="tabpanel"
          >
            <b-card-body>
              <b-card-text><div v-html="projects[index]"/></b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>

      <div id="disqus_thread" />
      <hr />
      <Timeline
        v-if="twitter.length"
        :id="twitterHandle"
        source-type="profile"
        :options="{ tweetLimit: '5' }"
      />
    </div>
  </div>
</template>

<script>
import { Timeline } from "vue-tweet-embed";
import Markdown from "@nuxt/markdown";
const md = new Markdown({ toc: true, sanitize: true });

export default {
  components: {
    Timeline
  },
  props: {
    slug: {
      type: String,
      default: ""
    },
    mentor: {
      type: Boolean,
      default: false
    },
    both: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ""
    },
    twitter: {
      type: String,
      default: ""
    },
    github: {
      type: String,
      default: ""
    },
    linkedin: {
      type: String,
      default: ""
    },
    avatar: {
      type: String,
      default: ""
    },
    interests: {
      type: String,
      default: ""
    },
    goals: {
      type: String,
      default: ""
    },
    mentorships: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      markdown: "",
      projects: []
    };
  },
  computed: {
    twitterHandle() {
      return this.twitter.split("twitter.com/")[1];
    }
  },
  created() {
    if (this.github.length) {
      this.renderMarkdown();
    }
    if (this.mentorships.length) {
      this.renderMentorshipProjects();
    }
  },
  methods: {
    async renderMarkdown() {
      const username = this.github
        .replace(/\/$/gi, "")
        .split("/")
        .pop();
      const markdownContent = await fetch(
        `https://raw.githubusercontent.com/${username}/${username}/master/README.md`
      ).then(res => {
        if (res.status === 200) {
          return res.text();
        } else {
          return "";
        }
      });
      const { html } = await md.toMarkup(markdownContent);
      this.markdown = html;
    },
    async renderMentorshipProjects() {
      const requests = [];
      this.mentorships.map(mentorship => {
        const url = mentorship.project_adress
          .split("/")
          .slice(3)
          .join("/");
        requests.push(
          fetch(`https://raw.githubusercontent.com/${url}/master/README.md`)
            .then(res => {
              if (res.status === 200) {
                return res.text();
              } else {
                return "";
              }
            })
            .then(async markdownContent => {
              const { html } = await md.toMarkup(markdownContent);
              return html;
            })
        );
      });
      this.projects = await Promise.all(requests);
    }
  }
};
</script>

<style>
.profile-card {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 36vh;
  background-color: var(--color-ui-02);
  margin: 18px auto;
  padding: 28px 16px;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
}

.avatar,
.name,
.links {
  margin-top: 14px;
}

.name {
  font-size: 26px;
  color: var(--color-text-01);
}

.seeks,
.description {
  color: var(--color-text-02);
}

.social-media {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.social-media .button {
  padding: 10px 30px;
  border: 2px solid transparent;
  border-radius: 0;
  color: #fff;
  margin-right: 16px;
}

.twitter {
  background-color: #00acee;
}

.github {
  background-color: #24292e;
}

.linkedin {
  background-color: #0e76a8;
}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  margin-right: 30px;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
}

.left-main {
  display: flex;
  justify-content: space-between;
}

.main {
  margin-right: 20px;
}

.text {
  font-size: 17px;
  margin-top: 10px;
}

.markdown {
  display: flex;
  justify-content: center;
  align-items: center;
}

.qrcode {
  margin-right: 24px;
}

@media (max-width: 1098px) {
  .button {
    padding: 10px 10px;
    margin: 0 5px 0 5px;
  }
  .social-media-button {
    justify-content: center;
  }
  .profile {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .left-main {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  .qrcode {
    margin-right: 32px;
  }
}

#disqus_thread {
  background: var(--color-disqus-thread);
  border: 8px;
  border-radius: 15px;
  padding: 5px;
}
</style>
