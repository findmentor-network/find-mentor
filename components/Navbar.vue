<template>
  <div>
    <b-navbar>
      <b-navbar-nav>
        <b-nav-item href="/" left>
          Find Mentor
        </b-nav-item>

        <b-nav-item-dropdown text="Mentors" right>
          <b-dropdown-item href="../#mentees">
              Mentees
          </b-dropdown-item>

          
          <b-dropdown-item href="../#mentors">
              Mentors
          </b-dropdown-item>
          <b-nav-item 
          href="https://docs.google.com/forms/d/e/1FAIpQLSc3uWpEeBUCXMoGAJ5qm31p9URBppxXT5L4RJFrTOJee9TFjQ/viewform?usp=send_form" left>
        Register
      </b-nav-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
