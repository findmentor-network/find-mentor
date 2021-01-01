<template>
  <div class="page peer-page">
    <div class="d-flex flex-wrap">
      <div class="d-none d-xl-block col-xl-2">
        <div class="vh-100 d-flex align-items-center justify-content-center">
          <PersonNavigationButton v-if="navigation.person.prev" ref="prevPerson" :person="navigation.person.prev" direction="left" />
        </div>
      </div>
      <div class="col-xl-8">
        <template v-if="$fetchState.pending">
          <span class="d-block text-center my-4">Loading..</span>
        </template>
        <template v-if="$fetchState.error">
          <span class="text-error">Fetch Error..</span>
        </template>
        <template v-else>
          <PersonDetail v-if="person" :person="person" />
        </template>
      </div>
      <div class="d-none d-xl-block col-xl-2">
        <div class="vh-100 d-flex align-items-center justify-content-center">
          <PersonNavigationButton v-if="navigation.person.next" ref="nextPerson" :person="navigation.person.next" direction="right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    const { $content, params, error } = this.$nuxt.context

    const [person] = await $content('persons')
      .where({ slug: { $eq: params.slug } })
      .fetch()

    if (!person) {
      return error({ statusCode: 404, message: 'Not found' })
    }

    this.person = person

    const [prev, next] = await $content('persons').only(['name', 'slug', 'mentor', 'avatar']).surround(params.slug).fetch()

    this.navigation.person.prev = prev
    this.navigation.person.next = next
  },
  data() {
    return {
      person: null,
      navigation: {
        person: {
          prev: null,
          next: null,
        },
      },
    }
  },
  head() {
    if (!this.person) {
      return
    }
    const { name, mentor, interests, avatar } = this.person
    const title = `${name} | ${mentor === 'Both' ? 'Mentor & Mentee' : mentor}`
    const description = `${name} - ${interests}`
    const icon = 'https://findmentor.network/icon.png'
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: avatar,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: title,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: avatar,
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: avatar,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: title,
        },
      ],
    }
  },
}
</script>
