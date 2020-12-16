<template>
  <nuxt-link
    v-if="nuxtLink"
    class="cta-button"
    :to="to"
    :style="buttonStyle"
  >
    <div v-if="$slots.prepend" class="cta-button__prepend">
      <slot name="prepend" />
    </div>
    <span v-if="text.length > 0"> {{ text }} </span>
    <div v-if="$slots.append" class="cta-button__append">
      <slot name="append" />
    </div>
  </nuxt-link>

  <a
    v-else
    class="cta-button"
    :href="to"
    :target="target"
    :style="buttonStyle"
  >
    <div v-if="$slots.prepend" class="cta-button__prepend">
      <slot name="prepend" />
    </div>
    <span v-if="text.length > 0"> {{ text }} </span>
    <div v-if="$slots.append" class="cta-button__append">
      <slot name="append" />
    </div>
  </a>
</template>

<script>
export default {
  name: 'CtaButton',
  props: {
    nuxtLink: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: ''
    },
    target: {
      type: String,
      required: false,
      default: '_blank'
    },
    text: {
      type: String,
      required: false,
      default: ''
    },
    bgColor: {
      type: String,
      required: false,
      default: 'linear-gradient(90deg, var(--color-ui-03), var(--color-ui-04));'
    },
    textColor: {
      type: String,
      required: false,
      default: '#fff'
    }
  },
  computed: {
    buttonStyle () {
      return `background: ${this.bgColor}; color: ${this.textColor};`
    }
  }
}
</script>

<style lang="scss" scoped>
.cta-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  padding: 8px 16px;
  border: 0;
  border-radius: 32px;
  outline: none;
  box-shadow: var(--shadow-1);
  font-size: 18px;
  text-decoration: none;
  text-align: center;
}
</style>
