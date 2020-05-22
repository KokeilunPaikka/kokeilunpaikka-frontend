// @flow

import { useState } from 'react'
import styled from 'styled-components/macro'

// import { Link, useTranslation } from 'i18n'

import { i18n as i18next } from 'i18n'

import Link from 'next/link'

import { Icon } from 'components/Icon'

const LanguageSelector = styled.ul`
  list-style-type: none;
  position: relative;

  font-weight: 800;
  margin: 0;
  padding: 0;
  margin-left: 35px;

  color: ${props => props.theme.colors.primary};

  font-size: 18px;

  i {
    margin-left: 10px;
  }

  span {
    padding-left: 10px;
  }

  a {
    text-transform: uppercase;
    text-decoration: none;
    padding: 10px 20px;
    display: block;
  }

  ul {
    display: ${props => (props.open ? 'block' : 'none')};
    position: absolute;
    left: 0;
    margin-top: 15px;

    border-radius: 0 28px 0 28px;
    background-color: #ffffff;
    box-shadow: 3px 3px 4px 0 rgba(0, 0, 0, 0.34);

    padding: 16px;
  }

  li {
    list-style-type: none;
    text-transform: uppercase;
    cursor: pointer;
  }
`

const LanguageMenu = () => {
  const [menu, setMenu] = useState(false)

  const otherLanguages = i18next.options.allLanguages
    .filter(lang => lang !== i18next.language)
    .map(lang => (
      <li key={lang}>
        <Link href={`/${lang}`} passHref>
          <a>{lang}</a>
        </Link>
      </li>
    ))

  return (
    <LanguageSelector open={menu} onClick={() => setMenu(!menu)}>
      <li>
        {i18next.language}
        <span>
          <Icon icon={`chevron-${menu ? 'up' : 'down'}`} />
        </span>
        {otherLanguages && <ul>{otherLanguages}</ul>}
      </li>
    </LanguageSelector>
  )
}

export default LanguageMenu
