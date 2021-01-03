<template>
  <div class="ma-card">
    <span class="title">{{ mentorship.slug.toUpperCase() }}</span>
    <span class="description">{{ mentorship.goal }}</span>
    <br />
    <span>
      ➡️ Visit
      <a :href="mentorship.mentor">Mentor profile</a> and
      <a :href="mentorship.project_adress">Project repo</a>
    </span>
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
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 850px;
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  background-color: var(--color-ui-02);
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
.ma-card .description {
  font-size: 1rem;
  color: var(--color-text-03);
  text-decoration: none;
}
</style>
