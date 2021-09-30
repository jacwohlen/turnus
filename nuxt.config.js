export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'turnus',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    [
      '@nuxtjs/vuetify',
      {
        theme: {
          themes: {
            light: {
              primary: '#ff0000',
              secondary: '#424242',
              accent: '#82B1FF',
              error: '#FF5252',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FFC107',
            },
          },
        },
      },
    ],
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DATABASE_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
        },
        services: {
          auth: {
            initialize: {
              onAuthStateChangedAction: 'users/onAuthStateChanged',
              emulatorPort:
                process.env.NODE_ENV === 'development' ? 9099 : undefined,
              emulatorHost: 'localhost',
            },
          },
          database: {
            emulatorPort:
              process.env.NODE_ENV === 'development' ? 9000 : undefined,
            emulatorHost: 'localhost',
          },
        },
      },
    ],
  ],

  router: {
    middleware: ['router-auth'],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
