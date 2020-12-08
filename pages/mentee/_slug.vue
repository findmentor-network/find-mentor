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
    doc.picture = await fetch(`https://api.github.com/users/${doc.github.substring(19)}`).then(res => res.json()).then(data => data.avatar_url)
    if (!doc) {
      return error({ statusCode: 404, message: 'Not found' })
    }
    return { doc }
  }
}

</script>
