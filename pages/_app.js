import { Provider } from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'

import { initStore } from 'store/store'

import { ThemeProvider } from 'styled-components/macro'

import { ModalProvider } from 'components/Modal'
import { appWithTranslation, withTranslation } from 'i18n'
import Helmet from 'react-helmet'

import theme from 'components/Theme'

import 'normalize.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'draft-js/dist/Draft.css'

import '../global.scss'
/**
 * @param {object} initialState
 * @param {boolean} options.isServer indicates whether it is a server side or client side
 * @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
 * @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
 * @param {boolean} options.debug User-defined debug mode param
 * @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
 */

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
      namespacesRequired: ['common', 'page-titles']
    }
  }

  render() {
    const {
      Component,
      pageProps,
      store,
      i18n: { language }
    } = this.props

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <Helmet
              titleTemplate="%s | Kokeilunpaikka.fi"
              defaultTitle="Kokeilunpaikka.fi"
            >
              <meta
                name="description"
                content="Kokeilun paikan avulla voit kääriä hihat ja testata ideaasi käytännössä. Voit ideoida kokeilun, hakea rahoitusta ja levittää opit avoimesti kaikkien käyttöön."
              />

              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <meta name="twitter:card" content="summary_large_image" />
              <meta property="og:title" content="Kokeilunpaikka.fi" />
              <meta property="og:image" content="/static/taustakuva-min.jpg" />
              <meta
                property="og:description"
                content="Kokeilun paikan avulla voit kääriä hihat ja testata ideaasi käytännössä. Voit ideoida kokeilun, hakea rahoitusta ja levittää opit avoimesti kaikkien käyttöön."
              />

              <meta property="og:type" content="website" />
              <html lang={language} />
              <meta charSet="utf-8" />
              <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
              <script>{`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-PX9ZMVX');`}</script>

              <noscript>{`<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PX9ZMVX"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>`}</noscript>
            </Helmet>
            <Component {...pageProps} />
          </ModalProvider>
        </ThemeProvider>
      </Provider>
    )
  }
}
export default withRedux(initStore)(
  appWithTranslation(withTranslation(['common'])(MyApp))
)
