const NextI18Next = require('next-i18next').default

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'fi',
  // ignoreRoutes: ['/_next/', '/static/'],
  otherLanguages: ['en', 'sv'],
  localeSubpaths: {
    fi: 'fi',
    en: 'en',
    sv: 'sv'
  }
})

module.exports = NextI18NextInstance
