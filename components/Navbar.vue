<template>
  <div>
    <b-navbar>
      <b-navbar-nav>
        <b-navbar-brand to="/" left>
          Find Mentor
        </b-navbar-brand>
        <b-nav-item exact active-class="active" to="/mentees/">
          Mentees
        </b-nav-item>
        <b-nav-item exact active-class="active" to="/mentors/">
          Mentors
        </b-nav-item>
        <b-nav-item
          href="https://forms.gle/pQwFZBXEyqBRDU2H9"
          target="_blank"
        >
          Register
        </b-nav-item>
        <b-nav-item
          to="/guide/"
        >
          How It Works?
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.actve {
  color: red
}
</style>
