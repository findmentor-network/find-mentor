<template>
  <b-form-input v-model="search.value" class="app-search-input" :variant="$colorMode.value" :placeholder="search.placeholder" @keypress.native.enter="searchPerson" />
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
      default: 'Search in findmentor.network'
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
      if (this.search.value.length > 0) {
        this.$router.push({ name: 'search-keyword', params: { keyword: this.search.value } })
        this.clearKeyword()
      }
    },
    clearKeyword () {
      this.search.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.app-search-input {
  position: relative;
  background-color: var(--color-field-02);
  border: 0;
  border-radius: 0;
  box-shadow: none;
  outline: none;
}
</style>
