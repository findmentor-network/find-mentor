<template>
  <div class="person-list" :class="`person-list--${strictType}`">
    <template v-if="persons.length > 0">
      <PersonCard
        v-for="person in persons"
        :key="person.slug"
        :person="person"
        @click.native="$router.push(`/peer/${person.slug}`)"
      />
    </template>
    <template v-else>
      <span class="d-block text-center my-4">No results...</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'PersonList',
  props: {
    persons: {
      type: Array,
      required: false,
      default: null,
    },
    strictType: {
      type: String,
      required: false,
      default: 'mixed',
    },
  },
}
</script>

<style lang="scss">
.person-list {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 18px;
  grid-row-gap: 0px;

  @include mq($until: wide) {
    grid-template-columns: repeat(3, 1fr);
  }
  @include mq($until: desktop) {
    grid-template-columns: repeat(2, 1fr);
  }
  @include mq($until: tablet) {
    grid-template-columns: repeat(1, 1fr);
  }
  .person-card {
    height: 360px;
    margin-bottom: 32px;
    cursor: pointer;
  }
  &--mentors {
    .person-card {
      border-top-color: var(--color-ui-03) !important;
      .name {
        color: var(--color-ui-03) !important;
      }
    }
  }
  &--mentees {
    .person-card {
      border-top-color: var(--color-ui-04) !important;
      .name {
        color: var(--color-ui-04) !important;
      }
    }
  }
}
</style>
