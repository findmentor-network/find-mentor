<template>
  <div>
    <Navbar />
    <person
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
    doc.avatar = doc.github ? `https://github.com/${doc.github.split('/').pop()}.png?size=200` : `https://ui-avatars.com/api/?name=${doc.name}`
    if (!doc) {
      return error({ statusCode: 404, message: 'Not found' })
    }
    return { doc }
  }
}

</script>
