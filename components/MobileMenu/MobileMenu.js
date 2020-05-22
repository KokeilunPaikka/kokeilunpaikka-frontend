// @flow

import { useState, useRef } from 'react'
import styled from 'styled-components/macro'

import Burger from 'components/Burger'

import { Link, useTranslation } from 'i18n'
import NextLink from 'next/link'
import { Container as ContainerBase } from 'components/common'
import { MobileNav, NavMenu, ProfileMenu } from 'components/MenuItems'

import { useOnClickOutside } from 'components/hooks'

import FocusLock from 'react-focus-lock'
import LoginMenu from 'components/MenuItems/LoginMenu'

import { Button as ButtonBase } from 'components/Button'

import { useDispatch } from 'react-redux'
import { logoutUser } from 'store/actions/users'
import { useRouter } from 'next/router'
import { i18n as i18next } from '../../i18n'

const Logo = styled.div`
  flex: 1;
  height: 50px;

  > a {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }

  img {
    max-width: 100%;
  }
`

const Container = styled(ContainerBase)`
  display: flex;
  justify-content: space-between;

  > div {
    flex: 1 0 33%;
  }

  margin: 0 15px 0 15px;
`

const Button = styled(ButtonBase)`
  margin: 5px 0;
`

const LanguageMenu = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-left: 0;
  padding: 0;
`

const LanguageMenuLink = styled.a`
  display: inline-block;
  height: 100%;
  text-decoration: none;
  text-transform: uppercase;
  color: #2d3264;
  font-weight: 900;
  font-size: 16px;
  margin-bottom: 10px;
`

const MobileMenu = ({
  avatar = null,
  items = [],
  isLogged = false
}: {
  avatar: string,
  items: Array<Object>,
  isLogged: boolean
}) => {
  const [open, setOpen] = useState(false)
  const [t] = useTranslation()

  const dispatch = useDispatch()
  const router = useRouter()

  const node = useRef()
  const menuId = 'main-menu'

  useOnClickOutside(node, () => setOpen(false))

  const allLanguages = i18next.options.allLanguages.map(lang => (
    <li key={lang}>
      <NextLink href={`/${lang}`} passHref>
        <LanguageMenuLink>{lang}</LanguageMenuLink>
      </NextLink>
    </li>
  ))

  return (
    <Container>
      {isLogged ? <ProfileMenu avatar={avatar} /> : null}
      <Logo
        style={
          isLogged && avatar ? { textAlign: 'center' } : { textAlign: 'left' }
        }
      >
        <Link href="/">
          <a>
            <img src="/static/logo.png" alt={t('back-to-home')} />
          </a>
        </Link>
      </Logo>
      <div ref={node}>
        <FocusLock disabled={!open}>
          <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
          <MobileNav open={open} setOpen={setOpen} id={menuId}>
            {items && <NavMenu items={items} />}
            <LanguageMenu>{allLanguages}</LanguageMenu>

            <Link href="/reset-password" passHref>
              <Button>{t('password-reset:change-password')}</Button>
            </Link>
            {!isLogged ? (
              <LoginMenu />
            ) : (
              <Button
                onClick={e => {
                  e.preventDefault()
                  dispatch(logoutUser()).then(() => router.push('/'))
                }}
              >
                {t('logout')}
              </Button>
            )}
          </MobileNav>
        </FocusLock>
      </div>
    </Container>
  )
}

export default MobileMenu
