<template>
  <component :is="tag" class="app-badge" :style="colorStyle">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'AppBadge',
  props: {
    tag: {
      type: String,
      required: false,
      default: 'span'
    },
    bgColor: {
      type: String,
      required: false,
      default: 'var(--color-ui-06)'
    },
    textColor: {
      type: String,
      required: false,
      default: 'var(--color-text-04)'
    }
  },
  computed: {
    colorStyle () {
      return `border-color: ${this.bgColor}; color: ${this.textColor}`
    }
  }
}
</script>

<style scoped>
.app-badge {
  position: relative;
  display: inline-block;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 4px 12px;
  font-size: 16px;
}
</style>
