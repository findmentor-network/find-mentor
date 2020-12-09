<template>
  <div class="container">
    <h1>Mentors</h1>
    <input v-model="filter" class="filter" placeholder="Filter Mentors">
    <ul class="persons">
      <Card
        v-for="(mentor, index) in filteredMentors"
        :key="index"
        class="person"
        :person="mentor"
        person-type="mentor"
      />
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const mentors = await $content('persons').where({ mentor: { $in: ['Mentor', 'İkisi de'] } }).fetch()
    return { mentors }
  },
  data () {
    return {
      filter: null
    }
  },
  computed: {
    filteredMentors () {
      if (this.filter) {
        return this.mentors.filter((mentor) => {
          return this.filter
            .toLowerCase()
            .split(' ')
            .every(v => mentor.name.toLowerCase().includes(v))
        })
      } else {
        return this.mentors
      }
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.filter {
  width: 40%;
  font-size: 14px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
  margin-left: 35px;
}

.persons {
  list-style-type: none;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 0;
}

.mentor-item {
  width: 248px;
  height: 320px;
  background-color: #17aa90;
  border-radius: 20px;
  transition: box-shadow 0.3s;
  border: 1px solid #ccc;
  overflow: hidden;
}

.mentor-item:hover {
  box-shadow: 16px 16px 16px rgba(11, 11, 11, 0.2);
}

.person {
  width: 250px;
  height: 250px;
  text-align: center;
  margin: 30px 7.5px 0 7.5px;
}
.name {
  font-size: 26px;
}

.interestContent {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
