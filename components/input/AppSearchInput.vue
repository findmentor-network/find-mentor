<template>
  <div class="app-search-input">
    <b-form-input
      v-model="input.value"
      class="app-search-input__nativeInput"
      :placeholder="input.placeholder"
      @keypress.native.enter="search"
    />
    <button class="app-search-input__searchButton" :disabled="input.value && input.value.length < 1" @click="search">
      <font-awesome-icon :icon="['fas', 'search']" color="var(--color-text-02)" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppSearchInput',
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Search in network'
    }
  },
  data () {
    return {
      input: {
        value: this.value,
        placeholder: this.placeholder
      }
    }
  },
  methods: {
    search () {
      if (this.input.value && this.input.value.length > 0) {
        this.$emit('searchTriggered', this.input.value)
        this.clearKeyword()
      }
    },
    clearKeyword () {
      this.input.value = ''
    }
  }
}
</script>

<style lang="scss">
.app-search-input {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;

  &__nativeInput {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding-right: 32px;
    background-color: var(--color-ui-02) !important;
    color: var(--color-text-02) !important;
    border: 0;
    border-radius: var(--border-radius-base);
    outline: 0;
    box-shadow: none !important;
    text-overflow: ellipsis;
  }

  .form-control {
    font-size: 0.8rem;
  }

  &__searchButton {
    display: inline-block;
    width: 32px;
    background-color: transparent;
    border: 0;
    border-radius: var(--border-radius-base);
    outline: 0;
    box-shadow: none;
    @include center(false, true);
    right: 0;
    z-index: 2;

    &[disabled] {
      opacity: 0.4;
    }
  }
}
</style>
