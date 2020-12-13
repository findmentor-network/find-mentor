<template>
  <div class="search-box">
    <b-form-input
      v-model="search.value"
      size="sm"
      class="mr-sm-2 search-input"
      :variant="$colorMode.value"
      :placeholder="search.placeholder"
      @keypress.native.enter="searchPerson"
    ></b-form-input>
    <b-button size="sm" class="my-2 my-sm-0" @click="searchPerson"
      >Search</b-button
    >
  </div>
</template>

<script>
export default {
  name: 'AppSearchInput',
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Search in network',
    },
  },
  data() {
    return {
      search: {
        value: this.value,
        placeholder: this.placeholder,
      },
    }
  },
  created() {
    if (this.$route.params.keyword) {
      this.search.value = this.$route.params.keyword
    } else {
      this.clearKeyword()
    }
  },
  methods: {
    searchPerson() {
      if (this.search.value.length > 0) {
        this.$router.push({
          name: 'search-keyword',
          params: { keyword: this.search.value },
        })
        this.clearKeyword()
      }
    },
    clearKeyword() {
      this.search.value = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.search-box {
  display: flex;
  align-items: center;
}
.search-input {
  box-shadow: none;
  outline: none;
  border: 0;
  border-radius: 0;
  background-color: var(--color-field-02);
}
</style>
