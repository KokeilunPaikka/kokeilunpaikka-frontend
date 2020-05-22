import { breakpoints } from 'components/MediaQuery'

const theme = {
  colors: {
    primary: '#2D3264',
    text: '#4A4A4A',
    mint: '#9CD2C8',
    backgroundLight: '#f6f6f6'
  },
  breakpoints: {
    sm: `(min-width: ${breakpoints.sm})`,
    md: `(min-width: ${breakpoints.md})`,
    lg: `(min-width: ${breakpoints.lg})`,
    xl: `(min-width: ${breakpoints.xl})`
  }
}

export default theme
