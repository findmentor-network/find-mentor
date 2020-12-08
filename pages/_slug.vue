<template>
  <div class="container">
    <Navbar />
    {{ doc.name }}
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
