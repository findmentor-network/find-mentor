<template>
  <div
    class="profile-person-card"
    :style="profileCardStyleAsPersonType"
    itemscope
    itemtype="https://schema.org/Person"
  >
    <div class="row">
      <div class="col-12 col-lg-3 d-flex justify-content-center">
        <img
          v-if="person.avatar.length > 0"
          :src="person.avatar"
          class="profile-person-card__avatar"
          loading="lazy"
          itemprop="image"
          :alt="person.name"
        />
      </div>
      <div class="col-12 col-lg-9 pl-lg-0">
        <div
          class="profile-person-card-meta flex-column justify-content-center flex-lg-row text-center text-lg-left"
        >
          <div class="profile-person-card-meta__infoBox">
            <div
              v-if="person.name"
              class="profile-person-card-meta__name"
              itemprop="name"
            >
              {{ getCapitalPersonName({ model: person.name }) }}
            </div>
            <app-badge
              :bg-color="
                getPersonTypeColor({ model: $lowerCase(person.mentor) })
              "
              :text-color="
                getPersonTypeColor({ model: $lowerCase(person.mentor) })
              "
            >
              {{ getPersonTypeLabel({ model: $lowerCase(person.mentor) }) }}
            </app-badge>
            <hr />
            <div
              v-if="person.interests.length > 0"
              class="text"
              itemprop="seeks"
            >
              <b>Interests:</b> {{ person.interests }}
            </div>
            <div
              v-if="person.goals.length > 0"
              class="text"
              itemprop="description"
            >
              <b>Goals:</b> {{ person.goals }}
            </div>
          </div>
          <a
            :href="`https://findmentor.network/peer/` + person.slug"
            target="_blank"
            rel="noopener noreferrer"
            class="profile-person-card-meta__qrCode"
            itemprop="url"
          >
            <qrcode
              :value="`https://findmentor.network/peer/` + person.slug"
              :options="{ width: 200 }"
            />
          </a>
        </div>
      </div>
      <div class="col-12 col-lg-9 offset-lg-3 pl-lg-0">
        <div class="profile-person-card-social-media">
          <a
            v-if="person.twitter_handle.length > 0"
            :href="person.twitter_handle"
            target="_blank"
            class="profile-person-card-social-media__button profile-person-card-social-media__button--twitter"
            itemprop="sameAs"
          >
            <font-awesome-icon :icon="['fab', 'twitter']" color="white" />
            Twitter
          </a>
          <a
            v-if="person.github.length > 0"
            :href="person.github"
            target="_blank"
            class="profile-person-card-social-media__button profile-person-card-social-media__button--github"
            itemprop="sameAs"
          >
            <font-awesome-icon :icon="['fab', 'github']" color="white" />
            GitHub
          </a>
          <a
            v-if="person.linkedin.length > 0"
            :href="person.linkedin"
            target="_blank"
            class="profile-person-card-social-media__button profile-person-card-social-media__button--linkedin"
            itemprop="sameAs"
          >
            <font-awesome-icon :icon="['fab', 'linkedin']" color="white" />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPersonTypeLabel,
  getPersonTypeColor,
  getCapitalPersonName,
} from '@/mixins'

export default {
  name: 'ProfilePersonCard',
  mixins: [getPersonTypeLabel, getPersonTypeColor, getCapitalPersonName],
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  computed: {
    profileCardStyleAsPersonType() {
      return `
        border-top: 4px solid ${this.getPersonTypeColor({
          model: this.$lowerCase(this.person.mentor),
        })}
      `
    },
  },
}
</script>

<style lang="scss">
.profile-person-card {
  position: relative;
  display: block;
  width: 100%;
  min-height: 36vh;
  height: auto;
  padding: 24px 16px;
  background-color: var(--color-ui-02);
  box-shadow: var(--shadow-1);

  &__avatar {
    width: 200px;
    height: 200px;
    object-fit: contain;
    border-radius: 100%;
    box-shadow: var(--shadow-1);
  }

  .profile-person-card-meta {
    display: flex;

    &__infoBox {
      position: relative;
      width: 100%;
      margin-bottom: 16px;
    }

    &__name {
      font-size: 32px;
      margin-bottom: 8px;
    }
  }

  .profile-person-card-social-media {
    &__button {
      display: inline-flex;
      align-items: center;
      list-style: none;
      margin-right: 14px;
      padding: 8px 22px;
      border: 0;
      border-radius: 0;
      font-size: 16px;
      background-color: #000;
      color: #fff;
      @include mq($until: desktop) {
        display: flex;
        margin-bottom: 14px;
      }

      svg {
        margin-right: 12px;
        fill: #fff;
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
  }
}
</style>
