<template>
  <b-navbar
    :class="`header app-header ${revealClass}`"
    toggleable="lg"
    :type="$colorMode.value"
    :variant="$colorMode.value"
  >
    <b-navbar-brand to="/">
      Find Mentor
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" v-model="isCollapsed" is-nav>
      <b-navbar-nav class="align-items-center">
        <cta-button class="mr-2" text="Join Now" to="https://forms.gle/pQwFZBXEyqBRDU2H9" />

        <b-nav-item to="/guide/" active-class="active">
          How It Works?
        </b-nav-item>
        <b-nav-item exact active-class="active" to="/mentorships/">
          Active Mentorships
        </b-nav-item>
        <b-nav-item exact to="/mentees/" active-class="active">
          Mentees
        </b-nav-item>
        <b-nav-item exact to="/mentors/" active-class="active">
          Mentors
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="col col-12 col-md-4 col-lg-3 col-xl-2">
        <app-search-input class="ml-md-2" @searchTriggered="isCollapsed = false" />
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" right>
        <cta-button
          class="mr-2"
          text="Discord"
          to="https://discord.gg/H9Vg8pYZAF"
          bg-color="var(--color-discord-01)"
        >
          <font-awesome-icon
            slot="prepend"
            class="mr-2 mt-1"
            :icon="['fab', 'discord']"
            color="#fff"
          />
        </cta-button>
        <cta-button
          class="mr-2"
          text="Github"
          to="https://github.com/cagataycali/find-mentor"
          bg-color="var(--color-github-01)"
        >
          <font-awesome-icon
            slot="prepend"
            class="mr-2 mt-1"
            :icon="['fab', 'github']"
            color="#fff"
          />
        </cta-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { revealHeader } from '@/mixins'

export default {
  mixins: [revealHeader],
  data () {
    return {
      isCollapsed: false
    }
  }
}
</script>

<style lang="scss">
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  z-index: var(--z-index-header);

  .app-search-input {
    height: 40px;
  }
}
</style>
