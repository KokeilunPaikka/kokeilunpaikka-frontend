// @flow

import { Link, withTranslation } from 'i18n'
import styled from 'styled-components/macro'
import { Container as ContainerBase } from 'components/common'
import { Row, Col } from 'components/Layout/Grid'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { getMenu } from 'store/actions/menus'
import { connect } from 'react-redux'
import FooterMenu from 'components/Layout/Sections/FooterMenu'
import { Button as ButtonBase } from 'components/Button'
import { Icon } from 'components/Icon'

const Container = styled(ContainerBase)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0;
`

const SubscribeForm = styled.form`
  width: 100%;
  position: relative;

  @media ${props => props.theme.breakpoints.lg} {
    display: flex;
    justify-content: flex-end;
  }

  input {
    left: 0;
    position: relative;
    width: 100%;
    margin-top: 25px;

    @media ${props => props.theme.breakpoints.lg} {
      left: 30px;
      width: auto;
      margin-top: 0;
    }
  }

  button {
    width: 100%;
    margin-top: 10px;
    @media ${props => props.theme.breakpoints.lg} {
      width: auto;
      margin-top: 0;
    }
  }
`

const LogoRow = styled.div`
  width: 100%;
  padding: 15px 15px 15px;

  > div > div {
    display: flex;
    justify-content: center;

    align-items: center;
    flex-direction: column;

    a {
      //  margin-top: 25px;
      padding: 10px;

      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
    }

    @media ${props => props.theme.breakpoints.md} {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
    }
  }
`

const FooterCol = styled(Col)`
  width: 100%;
  @media ${props => props.theme.breakpoints.md} {
    width: 25%;
  }
`

class Footer extends Component {
  componentDidMount() {
    const { getMenu: getMenuAction, i18n } = this.props
    getMenuAction(`footer-menu-1-${i18n.language}`)
    getMenuAction(`footer-menu-2-${i18n.language}`)
  }

  render() {
    const {
      menus: { menus },
      texts: { texts },
      i18n,
      t
    } = this.props

    const date = new Date()

    return (
      <div
        style={{
          backgroundColor: '#F6F8FF',
          padding: '46px 0',
          marginTop: '50px'
        }}
      >
        <Container
          style={{
            flexDirection: 'column'
          }}
        >
          <Row style={{ width: '100%' }}>
            <FooterCol size={3}>
              {`footer-menu-1-${i18n.language}` in menus ? (
                <FooterMenu items={menus[`footer-menu-1-${i18n.language}`]} />
              ) : null}
            </FooterCol>
            <Col size={3}>
              {`footer-menu-2-${i18n.language}` in menus ? (
                <FooterMenu items={menus[`footer-menu-2-${i18n.language}`]} />
              ) : null}
            </Col>
            <Col
              size={6}
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://facebook.com/kokeilunpaikka"
                >
                  <Icon
                    icon={['fab', 'facebook-f']}
                    fixedWidth
                    size="2x"
                    width="16"
                    style={{ color: '#2D3264' }}
                  />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://instagram.com/kokeilunpaikka"
                >
                  <Icon
                    icon={['fab', 'instagram']}
                    fixedWidth
                    size="2x"
                    width="16"
                    style={{ color: '#2D3264', marginLeft: 20 }}
                  />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/kokeilunpaikka"
                >
                  <Icon
                    icon={['fab', 'twitter']}
                    fixedWidth
                    size="2x"
                    width="16"
                    style={{ color: '#2D3264', marginLeft: 20 }}
                  />
                </a>
              </div>
              <div
                style={{
                  marginTop: 25,
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <SubscribeForm
                  method="post"
                  action="https://kokeilunpaikka.motiva.fi/account"
                >
                  <input
                    style={{
                      padding: 10,
                      borderRadius: 25,
                      border: 0,
                      minWidth: 200,
                      paddingLeft: 25,
                      paddingRight: 50,
                      position: 'relative',
                      outline: 0
                    }}
                    name="email"
                    placeholder={t('email')}
                    type="text"
                  />
                  <ButtonBase
                    type="submit"
                    as="button"
                    style={{ zIndex: 55, position: 'relative' }}
                  >
                    {t('subscribe-newsletter')}
                  </ButtonBase>
                </SubscribeForm>
              </div>
            </Col>
          </Row>

          <LogoRow>
            <Row>
              <Col size={12}>
                <Link href="/">
                  <a>
                    <img
                      alt="Kokeilun paikka"
                      src="/static/kokeilunpaikka.png"
                    />
                  </a>
                </Link>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.motiva.fi/"
                >
                  <img alt="Motiva" src="/static/motiva.svg" />
                </a>
              </Col>
            </Row>
          </LogoRow>
          <Row style={{ width: '100%' }}>
            <Col style={{ width: '100%' }}>
              <div
                style={{
                  borderTop: '1px solid #2D3264',
                  width: '100%',
                  paddingTop: 10,
                  textAlign: 'right',
                  fontSize: 14,
                  color: '#2D3264'
                }}
              />
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col size={10}>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#2d3264'
                }}
              >
                {
                  (
                    texts.find(txt => txt.text_type === 'footer-paragraph') ||
                    {}
                  ).text_value
                }
              </p>
            </Col>
            <Col
              size={2}
              style={{
                textAlign: 'right',
                fontSize: 14,
                color: '#2D3264'
              }}
            >
              &copy;{date.getFullYear()} Kokeilun paikka
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({ menus, texts }) => ({
  menus,
  texts
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMenu
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(Footer))
