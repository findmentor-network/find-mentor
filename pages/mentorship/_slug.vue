<template>
  <div>
    <ul>
      <li>{{ doc.slug }}</li>
      <li>{{ doc.goal }}</li>
      <li>{{ doc.mentor }}</li>
      <li>{{ doc.project_adress }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params, error }) {
    const [doc] = await $content('mentorships')
      .where({ slug: { $eq: params.slug } })
      .fetch()
    if (!doc) {
      return error({ statusCode: 404, message: 'Not found' })
    }
    return { doc }
  }
}
</script>
