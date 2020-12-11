<template>
  <div class="ma-card">
    <span class="title">{{ mentorship.slug.toUpperCase() }}</span>
    <span class="desc">{{ mentorship.goal }}</span>
  </div>
</template>

<script>
export default {
  props: {
    mentorship: {
      type: Object,
      default: []
    }
  },
  
};
</script>

<style scoped>

.ma-card {
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-top:1rem
 
}
.ma-card span{
    text-decoration: none;
}
.ma-card span:hover{
    text-decoration: none;
}
.ma-card .title{
    font-size:1.5rem;
    color: black;
    font-weight: 600;
    text-decoration: none;
    margin-bottom: 1rem;
    
}
.ma-card .desc{
    font-size:1rem;
    color: rgba(0, 0, 0, .6);
    font-weight: 600;
    text-decoration: none;
}
</style>
