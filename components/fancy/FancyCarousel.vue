<template>
     <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://pbs.twimg.com/media/EpHoZZ7W8AEBB6X?format=jpg&name=medium"></b-carousel-slide>

     
      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide caption="Fancy Mode" img-blank img-alt="Blank image">
        <p>
          This mode developed for just FUN.
        </p>
        <p>
          Join US & keep the learning with FUN.
        </p>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>