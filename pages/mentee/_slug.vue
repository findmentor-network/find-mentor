<template>
  <div>
    <Navbar />
<<<<<<< HEAD
    <div class="container">
      <ul>
        <li>Mentee: {{ doc.name }}</li>
        <li v-if="doc.twitter_handle && doc.twitter_handle.length">
          <a :href="doc.twitter_handle">Twitter</a>
        </li>
        <li v-if="doc.github && doc.github.length">
          <a :href="doc.github">GitHub</a>
        </li>
        <li v-if="doc.linkedin && doc.linkedin.length">
          <a :href="doc.linkedin">LinkedIn</a>
        </li>
        <li v-if="doc.interests && doc.interests.length">
          Interests: {{ doc.interests }}
        </li>
        <li v-if="doc.goals && doc.goals.length">
          Goals: {{ doc.goals }}
        </li>
      </ul>
    </div>
=======
    <person
      :name="doc.name"
      :twitter="doc.twitter_handle"
      :linkedin="doc.linkedin"
      :github="doc.github"
      :avatar="doc.avatar"
      :interests="doc.interests"
      :goals="doc.goals"
    />
>>>>>>> 1c8cb229b51d5f55f2bba007895b913af62ab780
  </div>
</template>

<script>

export default {
  async asyncData ({ $content, params, error }) {
    const [doc] = await $content('mentees').where({ slug: { $eq: params.slug } }).fetch()
    doc.avatar = doc.github ? `https://github.com/${doc.github.split('/').pop()}.png?size=200` : `https://ui-avatars.com/api/?name=${doc.name}`
    if (!doc) {
      return error({ statusCode: 404, message: 'Not found' })
    }
    return { doc }
  }
}

</script>
