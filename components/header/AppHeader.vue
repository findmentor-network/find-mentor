<template>
  <b-navbar
    class="app-header"
    toggleable="lg"
    :type="$colorMode.value"
    :variant="$colorMode.value"
  >
    <b-navbar-brand to="/">
      Find Mentor
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item exact active-class="active" to="/mentorships/">
          Active Mentorships
        </b-nav-item>
        <b-nav-item exact to="/mentees/">
          Mentees
        </b-nav-item>
        <b-nav-item exact to="/mentors/">
          Mentors
        </b-nav-item>
        <b-nav-item to="/guide/">
          How It Works?
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <div class="col-md-4 col-lg-2">
      <app-search-input />
    </div>
    <app-register-button />
  </b-navbar>
</template>

<script>
export default {}
</script>

<style lang="scss">
.app-header {
  height: var(--header-height);
}
</style>
