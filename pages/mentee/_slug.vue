<template>
  <div>
    <Person
      :slug="doc.slug"
      :mentor="false"
      :name="doc.name"
      :twitter="doc.twitter_handle"
      :linkedin="doc.linkedin"
      :github="doc.github"
      :avatar="doc.avatar"
      :interests="doc.interests"
      :goals="doc.goals"
    />
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
