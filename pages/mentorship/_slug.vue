<template>
  <div class="container">
    <h1>{{ doc.goal }}</h1>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params, error }) {
    const [doc] = await $content('activeMentorships').where({ slug: { $eq: params.slug } }).fetch()
    if (!doc) {
      return error({ statusCode: 404, message: 'Not found' })
    }
    return { doc }
  }
}
</script>
