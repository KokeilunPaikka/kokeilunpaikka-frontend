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
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=UA-62427359-5"
              />
              <script>{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-62427359-5');
           `}</script>
              <script>
                {`(function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:1789226,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `}
              </script>
              <script>
                {`!function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '380055253379423');
              fbq('track', 'PageView');
              `}
              </script>

              <noscript>{`
                <img
                  height="1"
                  width="1"
                  src="https://www.facebook.com/tr?id=380055253379423&ev=PageView &noscript=1"
                />
              `}</noscript>
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
