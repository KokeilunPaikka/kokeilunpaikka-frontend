// @flow

import type Node from 'react'
import MediaQuery, { useMediaQuery } from 'react-responsive'

const breakpoints = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px'
}

const Responsive = ({
  size,
  children
}: {
  size: string,
  children: Node
}): Node => (
  <MediaQuery minDeviceWidth={breakpoints[size]}>{children}</MediaQuery>
)

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

export { breakpoints, Responsive, Desktop, Tablet, Mobile, Default }
