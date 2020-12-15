<template>
  <div
    v-if="person"
    :class="`app-tile app-tile--hoverable person-card ${getPersonTypeClass({
      model: $lowerCase(person.mentor),
    })}`"
    itemscope
    itemtype="https://schema.org/Person"
  >
    <div class="social-media">
      <a
        v-if="person.twitter_handle.length > 0"
        class="social-media__button social-media__button--twitter"
        :href="person.twitter_handle"
        target="_blank"
        :title="`${person.name} twitter`"
        itemprop="sameAs"
      >
        <font-awesome-icon
          class="social-media__icon"
          :icon="['fab', 'twitter']"
          color="white"
        />
      </a>
      <a
        v-if="person.github.length > 0"
        class="social-media__button social-media__button--github"
        :href="person.github"
        target="_blank"
        :title="`${person.name} github`"
        itemprop="sameAs"
      >
        <font-awesome-icon
          class="social-media__icon"
          :icon="['fab', 'github']"
          color="white"
        />
      </a>
      <a
        v-if="person.linkedin.length > 0"
        class="social-media__button social-media__button--linkedin"
        :href="person.linkedin"
        target="_blank"
        :title="`${person.name} linkedin`"
        itemprop="sameAs"
      >
        <font-awesome-icon
          class="social-media__icon"
          :icon="['fab', 'linkedin']"
          color="white"
        />
      </a>
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
  padding: 18px 12px;

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

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      margin: 0 8px;
      border-radius: 100%;
      transition: 0.1s transform;

      &:hover {
        transform: scale(1.2);
      }

      &--twitter {
        background-color: var(--color-twitter-01);
      }

      &--github {
        background-color: var(--color-github-01);
      }

      &--linkedin {
        background-color: var(--color-linkedin-01);
      }
    }

    &__icon {
      width: 16px;
      height: 16px;
    }
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
