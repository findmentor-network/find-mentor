<template>
  <div class="container">
    <h1>Mentees</h1>
    <input v-model="filter" class="filter" placeholder="Filter Mentees" />
    <ul class="persons">
      <MenteeCard
        v-for="(mentee, index) in filteredMentees"
        :key="index"
        class="person"
        :mentee="mentee"
      />
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const mentees = await $content("mentees").fetch();
    return { mentees };
  },
  data() {
    return {
      filter: null
    };
  },
  computed: {
    filteredMentees() {
      if (this.filter) {
        return this.mentees.filter(mentee => {
          return this.filter
            .toLowerCase()
            .split(" ")
            .every(v => mentee.name.toLowerCase().includes(v));
        });
      } else {
        return this.mentees;
      }
    }
  }
};
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

.item {
  width: 248px;
  height: 320px;
  background-color: #17aa90;
  border-radius: 20px;
  transition: box-shadow 0.3s;
  border: 1px solid #ccc;
  overflow: hidden;
}

.item:hover {
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
