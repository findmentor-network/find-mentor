<template>
  <div class="container">
    <h1><a href="https://github.com/cagataycali/find-mentor" target="_blank">Feel free to contribute!</a></h1>
    <h2>Exactly this project is 0km.</h2>
    <h3>Every night & every deploy, the spread sheet will be parsed by GitHub actions, then generate this beauty.</h3>
    <ul>
      <li v-for="mentee in mentees" :key="mentee.slug">
        <NuxtLink :to="mentee.slug">
          {{ mentee.name }}
        </NuxtLink>
      </li>
    </ul>
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
