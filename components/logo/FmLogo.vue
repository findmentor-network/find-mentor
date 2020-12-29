<template>
  <div class="logo">
    <img class="logo__img" src="@/assets/img/core/logo.svg" :width="width" :height="height" />
    <span v-if="title" class="logo__title"> Find Mentor </span>
  </div>
</template>

<script>
export default {
  name: 'FmLogo',
  props: {
    width: {
      type: Number,
      required: false,
      default: 60,
    },
    height: {
      type: Number,
      required: false,
      default: 60,
    },
    title: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.logo {
  position: relative;
  display: flex;
  align-items: center;
  -webkit-user-select: none;
  -webkit-user-draggable: none;

  &__img {
    object-fit: contain;
  }

  &__title {
    display: inline-block;
    color: var(--color-text-01);
    margin-left: 8px;
    font-size: 22px;
  }
}
</style>
