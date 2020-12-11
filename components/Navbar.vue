<template>
<div>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand to="/">Find Mentor</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav>
         <b-nav-item exact active-class="active" to="/mentees/">
            Mentees
          </b-nav-item>
          <b-nav-item exact active-class="active" to="/mentors/">
            Mentors
          </b-nav-item>
          <b-nav-item
            href="https://forms.gle/pQwFZBXEyqBRDU2H9"
            target="_blank">
            Register
          </b-nav-item>
          <b-nav-item to="/guide/">
            How It Works?
          </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>

</template>

<script>
export default {};
</script>


<style>
.app-navbar .navbar-light .navbar-brand {
  color: var(--color-text-01)
}

.app-navbar .navbar-light .nav-link {
  color: var(--color-text-02)
}

.app-navbar .navbar-light .nav-link:hover {
  color: var(--color-text-03)
}

.app-navbar .navbar-light .nav-link.active {
  color: var(--color-text-01)
}
</style>
