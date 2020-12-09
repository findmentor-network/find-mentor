<template>
  <div>
    <div class="container">
      <header>
        <h1 class="contrib">
          <a href="https://github.com/cagataycali/find-mentor" target="_blank">
            Feel free to contribute!
          </a>
        </h1>
        <p class="information">
          Every night & every deploy, the spread sheet will be parsed by GitHub
          actions, then generate this beauty.
        </p>
      </header>
      <hr>
      <h2 class="title">
        Mentors
      </h2>
      <ul class="persons">
        <MentorCard
          v-for="mentor in mentors"
          :key="mentor.slug"
          class="person"
          :mentor="mentor"
        />
      </ul>
      <hr>
      <h2 class="title">
        Mentees
      </h2>
      <ul class="persons">
        <MenteeCard
          v-for="mentee in mentees"
          :key="mentee.slug"
          class="person"
          :mentee="mentee"
        />
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const mentees = await $content('mentees').fetch()
    const mentors = await $content('mentors').fetch()
    return { mentees, mentors }
  }
}
</script>
<style>
* {
  box-sizing: border-box;
}
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 80px 0px;
}
.contrib {
  text-decoration: underline;
  text-decoration-color: dodgerblue;
}
.information {
  padding: 10px;
  font-size: 16px;
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
