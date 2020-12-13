<template>
  <div class="dark-mode-toggle-button">
    <button
      v-if="$colorMode.value === 'light'"
      @click="$colorMode.preference = 'dark'"
    >
      🌚
    </button>
    <button v-else @click="$colorMode.preference = 'light'">☀️</button>
  </div>
</template>

<script>
export default {
  name: 'DarkModeToggleButton',
}
</script>

<style lang="scss">
.dark-mode-toggle-button {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 992;

  button {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    outline: 0;
    border-radius: 100%;
    background-color: var(--color-ui-02);
    box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
    -webkit-user-select: none;
    -webkit-user-drag: none;
  }
}
</style>
