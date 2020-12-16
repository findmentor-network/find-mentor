<template>
  <div class="app-search-input">
    <b-form-input
      v-model="search.value"
      class="app-search-input__nativeInput"
      :placeholder="search.placeholder"
      @keypress.native.enter="searchPerson"
    />
    <button class="app-search-input__searchButton" :disabled="search.value.length < 1" @click="searchPerson">
      <font-awesome-icon
        :icon="['fas', 'search']"
        color="var(--color-text-02)"
      />
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
      search: {
        value: this.value,
        placeholder: this.placeholder
      }
    }
  },
  created () {
    if (this.$route.params.keyword) {
      this.search.value = this.$route.params.keyword
    } else {
      this.clearKeyword()
    }
  },
  methods: {
    searchPerson () {
      this.$emit('searchTriggered')

      if (this.search.value.length > 0) {
        this.$router.push({
          name: 'search-keyword',
          params: { keyword: this.search.value }
        })
        this.clearKeyword()
      }
    },
    clearKeyword () {
      this.search.value = ''
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
