<template lang="pug">
.job-list
  template(v-for="job in jobs")
    JobCard.app-tile.app-tile--hoverable(:job="job")
</template>

<script>
export default {
  props: {
    jobs: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.job-list {
  position: relative;
  width: 100%;

  .job-card {
    height: auto;
    margin-bottom: 32px;
  }
}
</style>
