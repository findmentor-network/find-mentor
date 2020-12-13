<template>
  <div class="ma-card">
    <span class="title">{{ mentorship.slug.toUpperCase() }}</span>
    <span class="desc">{{ mentorship.goal }}</span>
  </div>
</template>

<script>
/* eslint-disable vue/require-valid-default-prop */
export default {
  props: {
    mentorship: {
      type: Object,
      default: [],
    },
  },
}
</script>

<style scoped>
.ma-card {
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: var(--color-ui-02);
  margin-top: 1rem;
}
.ma-card span {
  text-decoration: none;
}
.ma-card span:hover {
  text-decoration: none;
}
.ma-card .title {
  font-size: 1.5rem;
  color: var(--color-text-01);
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 1rem;
}
.ma-card .desc {
  font-size: 1rem;
  color: var(--color-text-03);
  font-weight: 600;
  text-decoration: none;
}
</style>
