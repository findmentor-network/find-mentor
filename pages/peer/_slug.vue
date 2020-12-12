<template>
  <div>
    <Person
      :type="personType"
      :slug="doc.slug"
      :name="doc.name"
      :twitter="doc.twitter_handle"
      :linkedin="doc.linkedin"
      :github="doc.github"
      :avatar="doc.avatar"
      :interests="doc.interests"
      :goals="doc.goals"
      :mentorships="doc.mentorships"
    />
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params, error }) {
    const [doc] = await $content('persons')
      .where({ slug: { $eq: params.slug } })
      .fetch()
    if (!doc) {
      return error({ statusCode: 404, message: 'Not found' })
    }
    return { doc }
  },
  computed: {
    personType () {
      return this.$lowerCase(this.doc.mentor)
    }
  },
  head () {
    return {
      title: this.doc.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.doc.name} - ${this.doc.interests}`
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.doc.name
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `${this.doc.name} - ${this.doc.interests}`
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.doc.avatar
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.doc.name
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.doc.name
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `${this.doc.name} - ${this.doc.interests}`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.doc.avatar
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.doc.avatar
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.doc.name
        }
      ],
      script: [
        { src: '/disqus.js' },
        { src: '//findmentor.disqus.com/count.js', id: 'dsq-count-scr' }
      ]
    }
  }
}
</script>
