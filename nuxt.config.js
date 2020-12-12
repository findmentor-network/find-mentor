// RSS2 Create function for the Feed Module
const create = async (feed, args) => {
  const [name, description] = args
  const niceName = name.charAt(0).toLocaleUpperCase() + name.slice(1)

  feed.options = {
    title: niceName + ' - Find Mentor',
    link: `https://findmentor.network/peer/${name}/feed.xml`,
    description
  }

  const { $content } = require('@nuxt/content')
  const items = await $content('persons').fetch()

  items.forEach((item) => {
    const itemObject = {
      title: item.name,
      link: `https://findmentor.network/peer/${item.slug}`,
      description: item.interests
    }

    if (item.goals) {
      itemObject.content = item.goals
    }

    feed.addItem(itemObject)
  })

  return feed
}

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Find Mentor',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'RSS Feed for findmentor.network Mentors',
        href: '/feed.xml'
      },
      { rel: 'alternate', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/style/css/general.css', '~/assets/style/css/color.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~plugins/ga.js', mode: 'client' },
    { src: '~plugins/qr.js' },
    { src: '~plugins/fa.js' },
    { src: '~plugins/vue-infinite-loading.js', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    '@nuxtjs/color-mode'
  ],

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#d2691e',
    height: '0.5em',
    continuous: true
  },

  generate: {
    dir: 'docs',
    fallback: '404.html' // SPA
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://github.com/nuxt-community/feed-module
    '@nuxtjs/feed',
    // https://content.nuxtjs.org/integrations#nuxtjssitemap
    '@nuxtjs/sitemap',
    // https://github.com/nuxt-community/robots-module
    '@nuxtjs/robots',
    // https://github.com/RadKod/nuxt-change-case
    'nuxt-change-case'
  ],

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    apiPrefix: 'api'
  },

  // Feed module configuration (https://content.nuxtjs.org/integrations/)
  feed: [
    {
      path: '/feed.xml',
      create,
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
      data: ['persons', 'Find a mentee or mentor.']
    }
  ],

  // Sitemap module configuration (https://content.nuxtjs.org/integrations/)
  sitemap: {
    hostname: 'https://findmentor.network',
    path: '/sitemap.xml',
    cacheTime: 1000 * 60 * 60 * 2,
    trailingSlash: true,
    gzip: true,
    routes: async () => {
      const routes = []
      const { $content } = require('@nuxt/content')

      const persons = await $content('persons').fetch()

      persons.forEach(person => routes.push(`peer/${person.slug}`))

      return routes
    }
  },

  // Robots module configuration (https://github.com/nuxt-community/robots-module/)
  robots: {
    UserAgent: '*',
    Disallow: ''
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      compact: true
    }
  }
}
