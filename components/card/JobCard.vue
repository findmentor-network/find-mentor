<template lang="pug">
.job-card
  // Summary
  .job-card-summary.d-flex.flex-wrap.cursor-pointer(@click="toggleDetail(job)")
    .col.col-12.col-lg-2.d-flex
      img.job-card__logo(:src="job.logo" draggable="false" :alt="job.company")
    .col.col-12.col-lg-10
      .job-card__body
        strong.job-card__title {{ job.company }}
        .job-card__position.d-flex.justify-content-center.justify-content-lg-start.align-items-center
          font-awesome-icon.mr-2(color="var(--color-text-02)" :icon="['fas', 'briefcase']")
          span {{ job.position }}
        .job-card__tags
          template(v-for="tag in job.tags")
            b-badge.mr-2.mb-1(:variant="$colorMode.value") {{ tag }}
        .d-block.d-lg-flex.justify-content-center.justify-content-lg-end.align-items-center
          .job-card__remote.mr-lg-4.mb-2.mb-lg-0
            font-awesome-icon.mr-2(color="var(--color-text-03)" :icon="['fas', 'paper-plane']")
            span
              strong Remote: &nbsp;
              span {{ job.remote }}
          .job-card__date
            font-awesome-icon.mr-2(color="var(--color-text-03)" :icon="['fas', 'clock']")
            span {{ dateConvertDMY(job.date) }}

  // Detail
  .job-card-detail(v-show="isVisibleDetail")
    .job-card__closeButton(@click="closeDetail")
      font-awesome-icon(color="var(--color-text-03)" :icon="['fas', 'times']")
    .col.col-12.d-flex.justify-center
      img.job-card__logo(:src="job.logo" draggable="false" :alt="job.company")
    .col.col-12.col-lg-12
      .job-card__body
        strong.job-card__title {{ job.company }}
        .job-card__position.d-flex.justify-content-center.align-items-center
          font-awesome-icon.mr-2(color="var(--color-text-02)" :icon="['fas', 'briefcase']")
          span {{ job.position }}
        p.job-card__description
        .job-card__markdown(v-html="markdown")
        .job-card__tags
          template(v-for="tag in job.tags")
            b-badge.mr-2(:variant="$colorMode.value") {{ tag }}
        .job-card__remote
          font-awesome-icon.mr-2(color="var(--color-text-03)" :icon="['fas', 'paper-plane']")
          span
            strong Remote: &nbsp;
            span {{ job.remote }}
        .job-card__apply(@click="sendJobApplyEvent")
          cta-button.job-card__applyButton(text="APPLY" bg-color="var(--color-ui-05)" :to="job.address" :nuxt-link="false")
        .d-flex.justify-content-center
          .job-card__date.d-flex.align-items-center
            font-awesome-icon.mr-2(color="var(--color-text-03)" :icon="['fas', 'clock']")
            span {{ dateConvertDMY(job.date) }}
</template>

<script>
import VClamp from 'vue-clamp'
import Markdown from '@nuxt/markdown'
const md = new Markdown({ toc: true, sanitize: true })

export default {
  components: {
    VClamp,
  },
  props: {
    job: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isVisibleDetail: false,
      markdown: '',
    }
  },
  created() {
    this.renderMarkdown()
  },
  methods: {
    sendJobApplyEvent() {
      send({ ...this.job, type: 'click', event: 'jobApply' })
    },
    dateConvertDMY(date) {
      return date.split(' ')[0]
    },
    toggleDetail(job) {
      this.isVisibleDetail = !this.isVisibleDetail

      if (this.isVisibleDetail) {
        document.title = `${job.company || ''} - ${job.position || ''}`
        send({ ...this.job, type: 'seen', event: 'jobDetail' })
      } else {
        this.setBaseDocumentTitle()
      }
    },
    closeDetail() {
      this.isVisibleDetail = false
      this.setBaseDocumentTitle()
    },
    setBaseDocumentTitle() {
      document.title = `${process.env.app.title}`
    },
    async renderMarkdown() {
      const { html } = await md.toMarkup(this.job.description)
      this.markdown = html
    },
  },
}
</script>

<style lang="scss">
.job-card {
  $module: '.job-card';

  position: relative;

  &__logo {
    display: block;
    width: 100%;
    height: 70px;
    margin: 0 auto;
    padding: 0 0.6rem;
    background-color: #fff;
    object-fit: contain;

    @include mq($until: desktop) {
      max-width: 120px;
    }
  }

  &__body {
    position: relative;
  }

  &__title {
    display: block;
    color: var(--color-text-01);
    font-size: 22px;
  }

  &__position {
    color: var(--color-text-02);
    font-size: 18px;
  }

  &__markdown {
    text-align: left;
  }

  &__description {
    display: block;
    margin: 0.8rem 0;
    color: var(--color-text-03);
    font-size: 16px;
  }

  &__tags {
    max-width: 75%;
  }

  &__closeButton {
    position: absolute;
    width: 50px;
    height: 50px;
    border: 0;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-ui-01);
    cursor: pointer;
    z-index: 2;
  }

  &-summary {
    position: relative;
    padding: 2rem 2.4rem 2rem 2rem;
    user-select: none;

    @include mq($until: desktop) {
      text-align: center;
    }

    #{$module} {
      &__body {
        @include mq($until: desktop) {
          margin-top: 2rem;
        }
      }

      &__tags {
        margin-top: 1rem;

        @include mq($until: desktop) {
          width: 100%;
          max-width: unset;
        }
      }
    }
  }

  &-detail {
    position: relative;
    margin-top: 2rem;
    padding: 2rem;
    border-top: 1px solid var(--color-border-02);
    text-align: center;

    #{$module} {
      &__logo {
        max-width: 160px;
      }

      &__body {
        padding-top: 2rem;
      }

      &__position {
        margin-bottom: 2rem;
      }

      &__tags {
        width: 100%;
        max-width: unset;
        margin-bottom: 1rem;
      }

      &__remote {
        margin-bottom: 4rem;
      }

      &__apply {
        margin-bottom: 2rem;
      }

      &__closeButton {
        top: 1rem;
        right: 2rem;
      }
    }
  }
}
</style>
