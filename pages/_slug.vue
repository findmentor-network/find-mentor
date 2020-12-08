<template>
  <div class="container">
    <Navbar />
    {{ doc.name }}
    <ul>
      <li>{{ doc.name }}</li>
      <li v-if="doc.twitter_handle.length">
        <a :href="doc.twitter_handle">Twitter</a>
      </li>
      <li v-if="doc.github.length">
        <a :href="doc.github">Github</a>
      </li>
      <li v-if="doc.linkedin.length">
        <a :href="doc.linkedin">Linkedin</a>
      </li>
      <li v-if="doc.interests.length">
        Interests: {{ doc.interests }}
      </li>
      <li v-if="doc.goals.length">
        Goals: {{ doc.goals }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {

  async asyncData ({ $content, params, error }) {
    const [doc] = await $content('mentees').where({ slug: { $eq: params.slug } }).fetch()
    if (!doc) {
      return error({ statusCode: 404, message: 'Not found' })
    }
    return { doc }
  }
}

</script>
