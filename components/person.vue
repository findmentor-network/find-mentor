<template>
  <div>
    <div class="container">
      <ul class="profile">
        <li v-if="avatar.length">
          <img :src="avatar" class="avatar" :alt="name">
        </li>
        <li v-if="name" class="name">
          {{ name }}
        </li>
        <li v-if="twitter.length" class="links">
          <a :href="twitter" target="_blank">
            <button class="button twitter">
              <font-awesome-icon :icon="['fab', 'twitter']" color="white"/>
              Twitter
            </button>
          </a>
        </li>
        <li v-if="github.length" class="links">
          <a :href="github" target="_blank">
            <button class="button github">
              <font-awesome-icon :icon="['fab', 'github']" color="white"/>
              GitHub</button>
          </a>
        </li>
        <li v-if="linkedin.length" class="links">
          <a :href="linkedin" target="_blank">
            <button class="button linkedin">
              <font-awesome-icon :icon="['fab', 'linkedin']" color="white"/>
              LinkedIn</button>
          </a>
        </li>
        <li v-if="interests && interests.length" class="text">
          Interests: {{ interests }}
        </li>
        <li v-if="goals && goals.length" class="text">
          Goals: {{ goals }}
        </li>
        <li class="text">
          <a
            :href="
              `https://findmentor.network/` + (mentor
                ? 'mentor/'
                : 'mentee/') + slug
            "
            target="_blank"
            rel="noopener noreferrer"
          >
            <qrcode
              :value="
                `https://findmentor.network/` + (mentor
                  ? 'mentor/'
                  : 'mentee/') + slug
              "
              :options="{ width: 200 }"
            />
          </a>
        </li>
        <a class="twitter-timeline" :v-if="twitter.length" data-width="50%" :href="twitter +'?ref_src=twsrc%5Etfw'">Tweets
          by
          {{ name }}</a>
          <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slug: {
      type: String,
      default: ''
    },
    mentor: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    twitter: {
      type: String,
      default: ''
    },
    github: {
      type: String,
      default: ''
    },
    linkedin: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    interests: {
      type: String,
      default: ''
    },
    goals: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.profile {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 250px;
  height: 250px;
  border-radius: 50%;
}
.text {
  font-size: 17px;
  margin-top: 10px;
}
</style>
