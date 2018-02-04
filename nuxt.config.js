module.exports = {
  // Options
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3010'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'famupad-frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  CSS
  */
  css: [
    {src: '~assets/scss/index.scss', lang: 'scss'}
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    {src: '~plugins/globalComponents', ssr: false},
    {src: '~plugins/clientInit', ssr: false}
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
