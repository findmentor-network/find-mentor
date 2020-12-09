<template>
  <div>
    <div class="container">
      <h1>
        <a href="https://github.com/cagataycali/find-mentor" target="_blank">
          Feel free to contribute!
        </a>
      </h1>
      <h4>Exactly this project is 0km.</h4>
      <h4>
        Every night & every deploy, the spread sheet will be parsed by GitHub
        actions, then generate this beauty.
      </h4>
      <hr />
      <h2 class="title">Mentors</h2>
      <ul class="persons">
        <MentorCard
          class="person"
          v-for="mentor in mentors"
          :key="mentor.slug"
          :mentor="mentor"
        />
      </ul>
      <hr />
      <h2 class="title">Mentees</h2>
      <ul class="persons">
        <MenteeCard
          class="person"
          v-for="mentee in mentees"
          :key="mentee.slug"
          :mentee="mentee"
        />
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const mentees = await $content("mentees").fetch();
    const mentors = await $content("mentors").fetch();
    return { mentees, mentors };
  }
};
</script>
<style>
* {
  box-sizing: border-box;
}
.persons {
  list-style-type: none;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 0;
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
