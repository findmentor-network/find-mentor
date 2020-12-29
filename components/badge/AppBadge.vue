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
      default: 'span',
    },
    bgColor: {
      type: String,
      required: false,
      default: 'transparent',
    },
    borderColor: {
      type: String,
      required: false,
      default: 'transparent',
    },
    textColor: {
      type: String,
      required: false,
      default: 'var(--color-text-04)',
    },
  },
  computed: {
    colorStyle() {
      return `background-color: ${this.bgColor}; border-color: ${this.borderColor}; color: ${this.textColor}`
    },
  },
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
  border-radius: 0;
}
</style>
