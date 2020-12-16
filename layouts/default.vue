<template>
  <div class="nuxt-layout default-layout">
    <AppHeader />
    <div class="router-view-wrapper">
      <Nuxt />
    </div>
    <DarkModeToggleButton />
  </div>
</template>

<style lang="scss">
.default-layout {
  position: relative;
}
</style>
