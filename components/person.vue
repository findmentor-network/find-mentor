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
          <a :href="twitter">
            <button class="button twitter">Twitter</button>
          </a>
        </li>
        <li v-if="github.length" class="links">
          <a :href="github">
            <button class="button github">GitHub</button>
          </a>
        </li>
        <li v-if="linkedin.length" class="links">
          <a :href="linkedin">
            <button class="button linkedin">LinkedIn</button>
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
