<template>
  <div class="d-flex flex-wrap justify-content-center">
    <a v-for="c in contribs" :key="c.url" class="contr-a" :href="c.fmn_url || c.html_url" target="_blank">
      <img :style="`width: ${avatarSize}`" class="contr-image" :src="c.avatar_url" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'ContribList',
  props: {
    contribs: { type: Array, required: true },
    avatarSize: { type: String, default: '40px' },
  },
}
</script>

<style scoped>
.contr-image {
  padding: 2px;
  border-radius: 100%;
  opacity: 0.5;
}
.contr-image:hover {
  opacity: 1;
  transition: 0.7s;
}
.contr-a:hover {
  color: white;
}
</style>
