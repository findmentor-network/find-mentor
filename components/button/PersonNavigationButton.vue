<template>
  <nuxt-link
    v-if="person"
    :to="`/peer/${person.slug}`"
    class="person-navigation-button"
    :class="`person-navigation-button--${direction}`"
    role="button"
  >
    <font-awesome-icon
      class="person-navigation-button__icon"
      :icon="`arrow-${direction}`"
      color="var(--color-text-02)"
    />
    <img class="person-navigation-button__avatar" :src="person.avatar">
    <v-clamp
      class="person-navigation-button__name"
      tag="strong"
      autoresize
      :max-lines="1"
    >
      {{ getCapitalPersonName({ model: person.name }) }}
    </v-clamp>
    <app-badge
      class="person-navigation-button__personType"
      :bg-color="getPersonTypeColor({ model: person.mentor })"
      :text-color="getPersonTypeColor({ model: person.mentor })"
    >
      {{ getPersonTypeLabel({ model: person.mentor }) }}
    </app-badge>
  </nuxt-link>
</template>

<script>
import VClamp from 'vue-clamp'
import {
  getPersonTypeLabel,
  getPersonTypeColor,
  getCapitalPersonName
} from '@/mixins'

export default {
  name: 'PersonNavigationButton',
  components: {
    VClamp
  },
  mixins: [getPersonTypeLabel, getPersonTypeColor, getCapitalPersonName],
  props: {
    person: {
      type: Object,
      required: false,
      default: null
    },
    direction: {
      type: String,
      required: false,
      default: 'left'
    }
  },
  computed: {
    flexDirectionClass () {
      let className = null
      if (this.direction === 'left') {
        className = 'flex-row'
      } else {
        className = 'flex-row-reverse'
      }

      return className
    }
  }
}
</script>

<style lang="scss">
.person-navigation-button {
  $module: &;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__icon {
    margin-bottom: 16px;
  }

  &__avatar {
    width: 32px;
    height: 32px;
    margin-bottom: 8px;
    border-radius: 100%;
    object-fit: contain;
    box-shadow: var(--shadow-1);
  }

  &__name {
    color: var(--color-text-02);
    font-size: 14px;
    margin-bottom: 6px;
  }

  &__personType {
    font-size: 10px !important;
    padding: 2px 6px !important;
  }
}
</style>
