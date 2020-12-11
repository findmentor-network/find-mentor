<template>
      <div >
<h3 v-for="mentor in mentorships" >
        {{mentor.goal}}
</h3>
      </div>
</template>

<script>
export default {
  async fetch() {
  this.mentorships = await this.$content('mentorships').fetch()
  },
 data() {
    return{
    mentorships: []
}
}
    
}
</script>

