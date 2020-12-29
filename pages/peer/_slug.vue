<template>
  <div class="page peer-page">
    <div class="d-flex flex-wrap">
      <div class="d-none d-xl-block col-xl-2">
        <div class="vh-100 d-flex align-items-center justify-content-center">
          <PersonNavigationButton
            v-if="navigation.person.prev"
            ref="prevPerson"
            :person="navigation.person.prev"
            direction="left"
          />
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
          <PersonNavigationButton
            v-if="navigation.person.next"
            ref="nextPerson"
            :person="navigation.person.next"
            direction="right"
          />
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

    const [prev, next] = await $content('persons')
      .only(['name', 'slug', 'mentor', 'avatar'])
      .surround(params.slug)
      .fetch()

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
    return {
      title: this.person ? this.person.name : 'Peer',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.person
            ? `${this.person.name} - ${this.person.interests}`
            : 'Peer',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.person ? this.person.name : 'Peer',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.person
            ? `${this.person.name} - ${this.person.interests}`
            : 'Peer',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.person ? this.person.avatar : 'Avatar',
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.person ? this.person.name : 'Peer',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.person ? this.person.name : 'Peer',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.person
            ? `${this.person.name} - ${this.person.interests}`
            : 'Peer',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.person ? this.person.avatar : 'Avatar',
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.person ? this.person.avatar : 'Avatar',
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.person ? this.person.name : 'Peer',
        },
      ],
    }
  },
}
</script>
