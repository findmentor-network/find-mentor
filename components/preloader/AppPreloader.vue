<template>
  <div v-if="appPreloader.isLoading" id="app-preloader" ref="appPreloader" class="app-preloader">
    <div class="app-preloader__container">
      <FmLogo class="app-preloader__logo animate__animated animate__pulse animate__infinite" :title="false" />
      <p class="app-preloader__message d-block mb-4">Loading...</p>
      <p class="app-preloader__message">The best way to build mentor &amp; mentee network</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['appPreloader']),
    // Detect Edge Browser
    detectedEdge() {
      return navigator.userAgent.includes('Edge')
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.appPreloader.isAttached) {
        this.$store.commit('appPreloader/HIDE_APP_PRELOADER')
        // For IE Edge fix
        if (this.detectedEdge) {
          this.$refs.classList.add('detach-app-preloader')
        }
      }
    })
  },
}
</script>

<style lang="scss">
.app-preloader {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: var(--color-ui-02);
  overflow: hidden;
  z-index: 9999;

  &__container {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    text-align: center;
  }

  &__logo {
    margin-bottom: 26px;
  }

  &__message {
    color: var(--color-text-05);
    font-size: 18px;
  }
}

// IE Edge Fix
@keyframes hideAppPreloader {
  from {
    visibility: visible;
  }
  to {
    visibility: hidden;
  }
}

@include only_edge(
  '.detach-app-preloader',
  (
    display: none,
  )
);

@include only_edge(
  '.app-preloader',
  (
    animation: hideAppPreloader 400ms forwards,
    animation-iteration-count: 1,
    animation-delay: 3s,
  )
);
</style>
