<template>
  <div class="profile-person-card" :style="profileCardStyleAsPersonType" itemscope itemtype="https://schema.org/Person">
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
        <div class="profile-person-card-meta flex-column justify-content-center flex-lg-row text-center text-lg-left">
          <div class="profile-person-card-meta__infoBox">
            <div v-if="person.name" class="profile-person-card-meta__name" itemprop="name">
              {{ getCapitalPersonName({ model: person.name }) }}
            </div>
            <app-badge
              :border-color="getPersonTypeColor({ model: $lowerCase(person.mentor) })"
              :text-color="getPersonTypeColor({ model: $lowerCase(person.mentor) })"
            >
              {{ getPersonTypeLabel({ model: $lowerCase(person.mentor) }) }}
            </app-badge>
            <a v-if="person.isHireable" :href="getHireMailContent">
              <app-badge bg-color="var(--color-ui-04)" text-color="#fff"> HIRE ME ! </app-badge>
            </a>
            <app-badge v-if="pageCount" bg-color="var(--color-ui-04)" text-color="#fff"> Page View: {{ pageCount }} </app-badge>
            <br />
            <template v-if="person.mentor != 'Mentee'">
              <a
                v-if="person.mentorships.length == 0"
                target="_blank"
                class="profile-person-card-social-media__button profile-person-card-social-media__button--askForMentorship"
                itemprop="sameAs"
                :href="askForMentorShipLink"
              >
                <font-awesome-icon :icon="['fas', 'question']" color="color:var(--color-text-04) " />
                Ask for a mentorship project
              </a>
              <a
                v-else
                class="profile-person-card-social-media__button profile-person-card-social-media__button--askForMentorship"
                itemprop="sameAs"
                href="#active-mentorships"
              >
                <font-awesome-icon :icon="['fas', 'list']" color="color:var(--color-text-04) " />
                Check out active mentorships
              </a>
            </template>
            <hr />
            <div v-if="person.interests.length > 0" class="text" itemprop="seeks"><b>Interests:</b> {{ person.interests }}</div>
            <div v-if="person.goals.length > 0" class="text" itemprop="description"><b>Goals:</b> {{ person.goals }}</div>
          </div>
          <div class="profile-person-card-meta__infoBox-right">
            <a
              :href="`https://findmentor.network/peer/` + person.slug"
              target="_blank"
              rel="noopener noreferrer"
              class="profile-person-card-meta__qrCode"
              itemprop="url"
            >
              <qrcode :value="`https://findmentor.network/peer/` + person.slug" :options="{ width: 200 }" />
            </a>
            <a
              class="profile-person-card-meta__twitter"
              :href="
                'https://twitter.com/intent/tweet?text=Hey! Here my find-mentor profile&url=https://findmentor.network/peer/' + person.slug
              "
            >
              <font-awesome-icon class="profile-person-card-meta__twitter-icon" :icon="['fab', 'twitter']" />
              Share at Twitter
            </a>
          </div>
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
            v-if="person.stackoverflow"
            :href="person.stackoverflow"
            target="_blank"
            class="profile-person-card-social-media__button profile-person-card-social-media__button--stackoverflow"
            itemprop="sameAs"
          >
            <font-awesome-icon :icon="['fab', 'stack-overflow']" color="white" />
            StackOverflow
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
import { getPersonTypeLabel, getPersonTypeColor, getCapitalPersonName } from '@/mixins'

export default {
  name: 'ProfilePersonCard',
  mixins: [getPersonTypeLabel, getPersonTypeColor, getCapitalPersonName],
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pageCount: 0,
    }
  },
  computed: {
    askForMentorShipLink() {
      return `${this.person.twitter_handle ? this.person.twitter_handle : this.person.linkedin || this.person.github}`
    },
    getHireMailContent() {
      // We will count every job contact over here. Inject email tracker.
      const subject = `Job Opportunity for ${this.person.name} | findmentor.network hiring`
      const body = `
I came across your profile from https://findmentor.network/${this.person.slug}/
%0D%0A
I've a job opportunity for you.
%0D%0A%0D%0A
Company name:%0D%0A
Remote/Location:%0D%0A
Position:%0D%0A
Description of job:%0D%0A
Qualifications:%0D%0A
%0D%0A%0D%0A%0D%0A
Best,%0D%0A
`
      return `mailto:${this.person.mail}?subject=${subject}&body=${body}`
    },
    profileCardStyleAsPersonType() {
      return `
        border-top: 4px solid ${this.getPersonTypeColor({
          model: this.$lowerCase(this.person.mentor),
        })}
      `
    },
  },
  mounted() {
    this.getPageCount()
  },
  methods: {
    async getPageCount() {
      if (window) {
        const { count } = await window.count()
        this.pageCount = count
      }
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
  .profile-person-card-meta__twitter {
    margin: 25px;
  }
  .profile-person-card-meta__twitter-icon {
    margin-right: 10px;
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
  .profile-person-card-meta__infoBox-right {
    flex-direction: column;
    display: flex;
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
        &:hover {
          transition-timing-function: ease-in-out;
          -ms-transform: scale(1.02); /* IE 9 */
          -webkit-transform: scale(1.02); /* Safari 3-8 */
          transform: scale(1.02);
          transition: 0.5s;
          opacity: 0.8;
        }
      }

      &--github {
        background-color: var(--color-github-00);
        &:hover {
          transition-timing-function: ease-in-out;
          -ms-transform: scale(1.05); /* IE 9 */
          -webkit-transform: scale(1.05); /* Safari 3-8 */
          transform: scale(1.05);
          transition: 0.5s;
          opacity: 0.8;
        }
      }

      &--linkedin {
        background-color: var(--color-linkedin-01);
        &:hover {
          transition-timing-function: ease-in-out;
          -ms-transform: scale(1.05); /* IE 9 */
          -webkit-transform: scale(1.05); /* Safari 3-8 */
          transform: scale(1.05);
          transition: 0.5s;
          opacity: 0.8;
        }
      }

      &--stackoverflow {
        background-color: var(--color-stackoverflow-01);
        &:hover {
          transition-timing-function: ease-in-out;
          -ms-transform: scale(1.05); /* IE 9 */
          -webkit-transform: scale(1.05); /* Safari 3-8 */
          transform: scale(1.05);
          transition: 0.5s;
          opacity: 0.8;
        }
      }

      &--askForMentorship {
        background-color: var(--color-ui-05);
        color: var(--color-text-04);
        margin-top: 10px;
      }
    }
  }
}
</style>
