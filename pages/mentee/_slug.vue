<template>
  <div>
    <Navbar />
    <div class="container">
      <ul>
        <li>Mentee: {{ doc.name }}</li>
        <li v-if="doc.twitter_handle && doc.twitter_handle.length">
          <a :href="fixProtocol(doc.twitter_handle)">Twitter</a>
        </li>
        <li v-if="doc.github && doc.github.length">
          <a :href="fixProtocol(doc.github)">Github</a>
        </li>
        <li v-if="doc.linkedin && doc.linkedin.length">
          <a :href="fixProtocol(doc.linkedin)">Linkedin</a>
        </li>
        <li v-if="doc.interests && doc.interests.length">
          Interests: {{ doc.interests }}
        </li>
        <li v-if="doc.goals && doc.goals.length">
          Goals: {{ doc.goals }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    fixProtocol (url) {
      return url ? 'https://' + url.replace(/https?:\/\//gi, '') : 'javascript:void(0)'
    }
  },
  async asyncData ({ $content, params, error }) {
    const [doc] = await $content('mentees').where({ slug: { $eq: params.slug } }).fetch()
    if (!doc) {
      return error({ statusCode: 404, message: 'Not found' })
    }
    return { doc }
  }
}

</script>
