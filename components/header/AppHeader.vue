<template>
  <b-navbar
    class="app-header"
    toggleable="lg"
    :type="$colorMode.value"
    :variant="$colorMode.value"
  >
    <b-navbar-brand to="/">Find Mentor</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <app-register-button />
        <b-nav-item to="/guide/" active>How It Works?</b-nav-item>
        <b-nav-item exact active-class="active" to="/mentorships/"
          >Active Mentorships</b-nav-item
        >
        <b-nav-item exact to="/mentees/">Mentees</b-nav-item>
        <b-nav-item exact to="/mentors/">Mentors</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" right>
        <app-search-input />
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.navbar-nav {
  align-items: center;
}
</style>
