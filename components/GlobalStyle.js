import { createGlobalStyle } from 'styled-components/macro'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Avenir LT Std';
    src: url('/static/fonts/AvenirLTStd-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: fallback;
}

@font-face {
    font-family: 'Avenir LT Std';
    src: url('/static/fonts/AvenirLTStd-Roman.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: fallback;
}

@font-face {
    font-family: 'Avenir LT Std';
    src: url('/static/fonts/AvenirLTStd-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: fallback;
}

@font-face {
    font-family: 'Avenir LT Std';
    src: url('/static/fonts/AvenirLTStd-Black.woff') format('woff');
    font-weight: 900;
    font-style: normal;
    font-display: fallback;
}

@font-face {
    font-family: 'Avenir LT Std';
    src: url('/static/fonts/AvenirLTStd-MediumOblique.woff') format('woff');
    font-weight: 500;
    font-style: italic;
    font-display: fallback;
}

@font-face {
    font-family: 'Avenir LT Std';
    src: url('/static/fonts/AvenirLTStd-Oblique.woff') format('woff');
    font-weight: normal;
    font-style: italic;
    font-display: fallback;
}

@font-face {
    font-family: 'Avenir LT Std';
    src: url('/static/fonts/AvenirLTStd-BlackOblique.woff') format('woff');
    font-weight: 900;
    font-style: italic;
    font-display: fallback;
}

@font-face {
    font-family: 'Avenir LT Std';
    src: url('/static/fonts/AvenirLTStd-Heavy.woff') format('woff');
    font-weight: 800;
    font-style: normal;
    font-display: fallback;
}

@font-face {
    font-family: 'Avenir LT Std';
    src: url('/static/fonts/AvenirLTStd-BookOblique.woff') format('woff');
    font-weight: normal;
    font-style: italic;
    font-display: fallback;
}

@font-face {
    font-family: 'Avenir LT Std';
    src: url('/static/fonts/AvenirLTStd-HeavyOblique.woff') format('woff');
    font-weight: 800;
    font-style: italic;
    font-display: fallback;
}

@font-face {
    font-family: 'Avenir LT Std';
    src: url('/static/fonts/AvenirLTStd-Book.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: fallback;
}

@font-face {
    font-family: 'Avenir LT Std';
    src: url('/static/fonts/AvenirLTStd-LightOblique.woff') format('woff');
    font-weight: 300;
    font-style: italic;
    font-display: fallback;
}
`

export default GlobalStyle
