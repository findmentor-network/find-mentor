<template>
  <div class="nuxt-layout default-layout">
    <AppPreloader />
    <AppHeader />
    <div class="router-view-wrapper">
      <Nuxt />
    </div>
    <AppFooter />
    <DarkModeToggleButton />
  </div>
</template>

<style lang="scss">
.default-layout {
  position: relative;
}
</style>
