// @flow

import { Component } from 'react'
import styled from 'styled-components/macro'
import { Container as ContainerBase } from 'components/common'

import { getMenu } from 'store/actions/menus'
import { getEditableTexts } from 'store/actions/texts'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Modal from 'react-modal'

import { Link as MultilingualLink, withTranslation, i18n } from 'i18n'

import { Default, Mobile } from 'components/MediaQuery'

import {
  NavMenu,
  LanguageMenu,
  ProfileMenu,
  LoginMenu
} from 'components/MenuItems'

import MobileMenu from 'components/MobileMenu'

const HeaderContainer = styled.header`
  //max-height: 46px;
  //height: 46px;
  width: 100%;
  background-color: rgba(255, 255, 255, ${props => props.opacity});
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 4px 0 rgba(0, 0, 0, 0.12),
    0 1px 5px 0 rgba(0, 0, 0, 0.2);
  padding: 14px 0;
  position: absolute;
`

const Container = styled(ContainerBase)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;

  @media ${props => props.theme.breakpoints.xl} {
    padding: 0;
  }
`
const Logo = styled.div`
  height: 50px;

  > a {
    height: 100%;
    width: 100%;
    display: inline-block;
  }

  img {
    height: 100%;
    max-width: 100%;
  }
`

type OwnProps = $ReadOnly<{|
  comingFromOutside: string
|}>

type Props = $ReadOnly<{|
  ...OwnProps,
  comingFromConnect: string,
  dispatch: Dispatch
|}>

type I18nProps = $ReadOnly<{|
  i18n: Object<{ language: string }>
|}>

type ComponentProps = $ReadOnly<{|
  ...Props,
  ...I18nProps
|}>

class Header extends Component<ComponentProps> {
  componentDidMount() {
    const {
      getMenu: getMenuAction,
      getEditableTexts: getEditableTextsAction
    } = this.props

    getMenuAction(`header-menu-${i18n.language}`)
    getEditableTextsAction()

    Modal.setAppElement('#__next')
  }

  getInitialProps = async ({ req }) => {
    const currentLanguage = req ? req.language : i18n.language
    return { currentLanguage, namespacesRequired: ['common', 'password-reset'] }
  }

  render() {
    const {
      menus: { menus },
      user: {
        isLogged,
        user: { image_url: profileImage }
      },
      config: { top_menu_opacity: menuOpacity },
      t
    } = this.props

    const navItems =
      `header-menu-${i18n.language}` in menus
        ? menus[`header-menu-${i18n.language}`]
        : null

    const avatar = profileImage || '/static/user-empty.png'

    return (
      <HeaderContainer id="header-container" opacity={menuOpacity}>
        <Mobile>
          <MobileMenu isLogged={isLogged} avatar={avatar} items={navItems} />
        </Mobile>
        <Default>
          <Container>
            <Logo>
              <MultilingualLink href="/">
                <a>
                  <img src="/static/logo.png" alt={t('back-to-home')} />
                </a>
              </MultilingualLink>
            </Logo>

            {navItems && <NavMenu items={navItems} />}

            {isLogged ? <ProfileMenu avatar={avatar} /> : <LoginMenu />}
            <LanguageMenu />
          </Container>
        </Default>
      </HeaderContainer>
    )
  }
}

const mapStateToProps = ({ menus, user, configs }) => ({
  menus,
  user,
  config: configs.config
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMenu,
      getEditableTexts
    },
    dispatch
  )

export default connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation<I18nProps>(['common', 'password-reset'])(Header))
