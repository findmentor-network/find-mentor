<template>
  <b-nav-item target="_blank" href="https://forms.gle/pQwFZBXEyqBRDU2H9">
    <b-button class="app-register-button" variant="outline-primary"
      >Join Now</b-button
    >
  </b-nav-item>
</template>

<script>
export default {
  name: 'AppRegisterButton',
}
</script>

<style lang="scss" scoped>
.app-register-button {
  position: relative;
  display: inline-block;
  min-width: 140px;
  padding: 8px 16px;
  border: 0;
  border-radius: 32px;
  outline: none;
  background: linear-gradient(90deg, var(--color-ui-03), var(--color-ui-04));
  color: #fff;
  box-shadow: var(--shadow-1);
  font-size: 18px;
  text-decoration: none;
  text-align: center;
}
</style>
