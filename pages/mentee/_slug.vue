<template>
  <div>
    <Navbar />
    <person
      :name="doc.name"
      :twitter="doc.twitter_handle"
      :linkedin="doc.linkedin"
      :github="doc.github"
      :picture="doc.picture"
      :interests="doc.interests"
      :goals="doc.goals"
    />
  </div>
</template>

<script>

export default {
  async asyncData ({ $content, params, error }) {
    const [doc] = await $content('mentees').where({ slug: { $eq: params.slug } }).fetch()
    doc.picture = `https://github.com/${doc.github.split('/').pop()}.png?size=200`
    if (!doc) {
      return error({ statusCode: 404, message: 'Not found' })
    }
    return { doc }
  }
}

</script>
