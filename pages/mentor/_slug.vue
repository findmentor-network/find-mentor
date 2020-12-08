<template>
  <div>
    <Person
      :name="doc.name"
      :twitter="doc.twitter_handle"
      :linkedin="doc.linkedin"
      :github="doc.github"
      :avatar="doc.avatar"
    />
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params, error }) {
    const [doc] = await $content('mentors')
      .where({ slug: { $eq: params.slug } })
      .fetch()
    if (!doc) {
      return error({ statusCode: 404, message: 'Not found' })
    }
    return { doc }
  }
}
</script>
