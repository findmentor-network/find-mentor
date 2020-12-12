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
          Active Mentorships </b-nav-item>
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
      <b-navbar-nav class="ml-auto" right>
        <b-navbar-form id="search-n-register">
          <app-search-input />
          <app-register-button />
	</b-navbar-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.app-header {
  height: var(--header-height);
}
#nav-collapse {
  background: inherit;
  z-index: 1001;
}
#search-n-register {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-gap: 10px;
}
@media only screen and (max-width: 768px) {
  #nav-collapse {
    padding: 30px;
    transform: scale(1.1) translateY(15px);
  }
  #search-n-register {
    flex-direction: column;
  }
}
</style>
