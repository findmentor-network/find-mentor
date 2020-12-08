<template>
  <div>
    <Navbar />
    <person
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
<<<<<<< HEAD
    const [doc] = await $content('mentors')
      .where({ slug: { $eq: params.slug } })
      .fetch()
=======
    const [doc] = await $content('mentors').where({ slug: { $eq: params.slug } }).fetch()
    doc.avatar = doc.github ? `https://github.com/${doc.github.split('/').pop()}.png?size=200` : `https://ui-avatars.com/api/?name=${doc.name}`
>>>>>>> 1c8cb229b51d5f55f2bba007895b913af62ab780
    if (!doc) {
      return error({ statusCode: 404, message: 'Not found' })
    }
    return { doc }
  }
}
</script>
