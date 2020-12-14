<template>
  <img
    src="@/assets/img/core/spinner.svg"
    class="app-spinner"
    :width="width"
    :height="height"
  />
</template>

<script>
export default {
  name: 'AppSpinner',
  props: {
    width: {
      type: Number,
      required: false,
      default: 40,
    },
    height: {
      type: Number,
      required: false,
      default: 40,
    },
  },
}
</script>

<style lang="scss" scoped>
.app-spinner {
  position: relative;
  object-fit: contain;
}
</style>
