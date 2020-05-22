// @flow

import { type Node } from 'react'

// import the library
import { library, config } from '@fortawesome/fontawesome-svg-core'

import {
  faChevronUp,
  faChevronDown,
  faChevronRight,
  faLongArrowAltRight,
  faSearch,
  faTools,
  faLaughWink,
  faDollarSign,
  faPencilAlt,
  faPlus,
  faCaretDown,
  faCaretUp,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'
import { faFrownOpen, faComments } from '@fortawesome/free-regular-svg-icons'

import { Header, Footer } from './Sections'

config.autoAddCss = false

library.add(
  faSearch,
  faChevronUp,
  faChevronDown,
  faLaughWink,
  faTools,
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedin,
  faChevronRight,
  faLongArrowAltRight,
  faDollarSign,
  faPencilAlt,
  faPlus,
  faFrownOpen,
  faComments,
  faCaretDown,
  faCaretUp,
  faEnvelope
)

const MainLayout = ({ children }: { children: Node }) => {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '155px' }}>{children}</div>
      <Footer />
    </>
  )
}
const HeroLayout = ({ children }: { children: Node }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

const PageLayout = ({ children }: { children: Node }) => {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '80px' }}>{children}</div>
      <Footer />
    </>
  )
}

export { MainLayout, HeroLayout, PageLayout }
