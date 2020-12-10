<template>
  <div>
    <div class="container">
      <ul class="profile" itemscope itemtype="https://schema.org/Person">
        <div class="left-main">
          <li v-if="avatar.length" loading="lazy">
            <img :src="avatar" class="avatar" itemprop="image" :alt="name" />
          </li>
          <div class="main">
            <li v-if="name" class="name" itemprop="name">
              {{ name }}
            </li>
            <hr>
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
            <div class="social-media-button">
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
        <hr>
      </h2>
      <div v-html="markdown" />
      <hr>
      <h2>
        Gave Feedback
      </h2>
      <div id="disqus_thread" />
      <hr>
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
    }
  },
  data() {
    return {
      markdown: ""
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
    }
  }
};
</script>

<style>
.profile {
  list-style: none;
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  padding-bottom: 14px;
}

.avatar,
.name,
.links {
  margin-top: 15px;
}

.name {
  font-size: 27px;
}

.button {
  padding: 10px 30px;
  border: 2px solid transparent;
  border-radius: 4px;
  color: white;
  margin-right: 30px;
}

.social-media-button {
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  border-radius: 50%;
  margin-right: 30px;
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

.profile {
  justify-content: space-between;
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
  background: #161616;
  border: 8px;
  border-radius: 15px;
  padding: 5px;
}
</style>
