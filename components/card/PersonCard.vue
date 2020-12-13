<template>
  <div
    v-if="person"
    :class="`person-card ${getPersonTypeClass({
      model: $lowerCase(person.mentor),
    })} col-12 col-md-6 col-lg-4 col-xl-3`"
    itemscope
    itemtype="https://schema.org/Person"
  >
    <div class="social-media">
      <div v-if="person.twitter_handle.length" class="twitter">
        <a
          :href="person.twitter_handle"
          target="_blank"
          :title="`${person.name} twitter`"
          itemprop="sameAs"
        >
          <font-awesome-icon
            class="social-media-icon"
            :icon="['fab', 'twitter']"
            color="white"
          />
        </a>
      </div>
      <div v-if="person.github.length" class="github">
        <a
          :href="person.github"
          target="_blank"
          :title="`${person.name} github`"
          itemprop="sameAs"
        >
          <font-awesome-icon
            class="social-media-icon"
            :icon="['fab', 'github']"
            color="white"
          />
        </a>
      </div>
      <div v-if="person.linkedin.length" class="linkedin">
        <a
          :href="person.linkedin"
          target="_blank"
          :title="`${person.name} linkedin`"
          itemprop="sameAs"
        >
          <font-awesome-icon
            class="social-media-icon"
            :icon="['fab', 'linkedin']"
            color="white"
          />
        </a>
      </div>
    </div>

    <NuxtLink :to="`/peer/${person.slug}`" itemprop="url">
      <div class="person-card-info">
        <!-- Profile Photo -->
        <div class="profile-photo">
          <img
            v-if="person.github.length"
            :src="getProfilePicture(person.github)"
            alt="mentee-profile-picture"
            itemprop="image"
            loading="lazy"
          />
          <div v-if="!person.github.length" class="non-image" />
        </div>

        <!-- Name -->
        <v-clamp class="name" autoresize :max-lines="1">
          {{ getCapitalPersonName({ model: person.name }) }}
        </v-clamp>

        <!-- Interests -->
        <v-clamp class="interests" autoresize :max-lines="3" itemprop="seeks">
          {{ person.displayInterests }}
        </v-clamp>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import VClamp from 'vue-clamp'
import { getPersonTypeClass, getCapitalPersonName } from '@/mixins'

export default {
  name: 'Card',
  components: {
    VClamp,
  },
  mixins: [getPersonTypeClass, getCapitalPersonName],
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getProfilePicture(githubLink) {
      const regex = /github.com\/([\w\d-]+)(.+)?/
      const response = githubLink.match(regex)
      if (!response) {
        return ''
      }
      return `https://avatars.githubusercontent.com/${response[1]}`
    },
  },
}
</script>

<style lang="scss">
.person-card {
  $module: &;
  display: block;
  margin-left: -4%;
  padding: 36px 12px;
  background-color: var(--color-ui-02);
  border-radius: 0;
  border: 0;
  box-shadow: var(--shadow-1);
  overflow: hidden;

  &.mentor {
    border-top: 4px solid var(--color-ui-03);
  }

  &.mentee {
    border-top: 4px solid var(--color-ui-04);
  }

  &.both {
    border-top: 4px solid var(--color-ui-05);
  }

  .social-media {
    display: flex;
    justify-content: center;
    margin: 0 0 26px 0;
  }

  .twitter,
  .github,
  .linkedin {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    margin: 0 8px;
    border-radius: 100%;
  }

  .social-media-icon {
    width: 16px;
    height: 16px;
  }

  .twitter {
    background-color: #22acf3;
  }

  .github {
    background-color: #282e36;
  }

  .linkedin {
    background-color: #0e76a8;
  }

  .profile-photo {
    margin: 0 0 10px 0;
  }

  .person-card-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    .profile-photo img {
      border-radius: 100%;
      width: 120px;
      height: 120px;
      border: 2px solid var(--color-ui-02);
    }

    .non-image {
      display: block;
      margin: 0 auto;
      border-radius: 100%;
      width: 120px;
      height: 120px;
      border: 2px solid var(--color-ui-02);
      background-image: url(https://findmentor.network/dummy.png);
      background-repeat: no-repeat, repeat;
      background-position: center;
      background-size: cover;
    }

    .name {
      color: var(--color-text-01);
      font-size: 18px;
      font-weight: 600;
    }

    .interests {
      margin: 0 auto;
      color: var(--color-text-02);
      word-break: break-word;
      text-align: center;
    }
  }

  &.mentor {
    .person-card-info {
      .name {
        color: var(--color-ui-03);
      }
    }
  }

  &.mentee {
    .person-card-info {
      .name {
        color: var(--color-ui-04);
      }
    }
  }

  &.both {
    .person-card-info {
      .name {
        color: var(--color-ui-05);
      }
    }
  }
}
</style>
