
<template>
<div>
  <b-navbar toggleable="lg"  v-bind:type=" $colorMode.value"  v-bind:variant=" $colorMode.value" >
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

<style scoped>

</style>
