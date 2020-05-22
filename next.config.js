require('dotenv').config()

const withFonts = require('next-fonts')

module.exports = withFonts({
  publicRuntimeConfig: {
    localeSubpaths:
      typeof process.env.LOCALE_SUBPATHS === 'string'
        ? process.env.LOCALE_SUBPATHS
        : 'none',
    WORDPRESS_URL: process.env.WORDPRESS_URL,
    DJANGO_URL: process.env.DJANGO_URL
  },
  env: {
    WORDPRESS_URL: process.env.WORDPRESS_URL,
    DJANGO_URL: process.env.DJANGO_URL
  }
})
