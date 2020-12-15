<template>
  <p align="center">
    <a
      v-for="c in contribs"
      :key="c.url"
      class="contr-a"
      :href="c.fmn_url || c.html_url"
      target="_blank"
    >
      <img :style="`width: ${size || '10%'}`" class="contr-image" :src="c.avatar_url" />
    </a>
  </p>
</template>

<script>
export default {
  name: 'ContribList',
  props: ['contribs', 'size']
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
