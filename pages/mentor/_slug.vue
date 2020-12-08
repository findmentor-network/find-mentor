<template>
  <div>
    <Navbar />
    <div class="container">
      <ul>
        <li>Mentor: {{ doc.name }}</li>
        <li v-if="doc.twitter_handle.length">
          <a :href="isValidURL.twitter_handle">Twitter</a>
        </li>
        <li v-if="doc.github.length">
          <a :href="isValidURL.github">Github</a>
        </li>
        <li v-if="doc.linkedin.length">
          <a :href="isValidURL.linkedin">Linkedin</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isValidURL() {
      if (this.doc) {
        !this.doc.github.startsWith("http")
          ? (this.doc.github = `https://${this.doc.github}`)
          : this.doc.github;
        !this.doc.twitter_handle.startsWith("http")
          ? (this.doc.twitter_handle = `https://${this.doc.twitter_handle}`)
          : this.doc.twitter_handle;
        !this.doc.linkedin.startsWith("http")
          ? (this.doc.linkedin = `https://${this.doc.linkedin}`)
          : this.doc.linkedin;
      }
      return this.doc;
    },
  },
  async asyncData({ $content, params, error }) {
    const [doc] = await $content("mentors")
      .where({ slug: { $eq: params.slug } })
      .fetch();
    if (!doc) {
      return error({ statusCode: 404, message: "Not found" });
    }
    return { doc };
  },
};
</script>
