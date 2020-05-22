// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import { MainLayout } from 'components/Layout'

import { LabelInput } from 'components/Input'
import { Container, Row, Col } from 'components/Layout/Grid'

import { Button as ButtonBase } from 'components/Button'
import { HeaderText } from 'components/Text'

import { createUser, clearRegisterThanks, loginUser } from 'store/actions/users'
import { Form, FormRow, FormCol } from 'components/Forms'
import { produce } from 'immer'
import { withTranslation, Link } from 'i18n'
import AuthHoc from 'components/AuthHoc'

import Helmet from 'react-helmet'

const Button = styled(ButtonBase)`
  font-size: 16px;

  padding: 8px 65px 7px;
  margin-left: 0 !important;
  margin-top: 5px !important;

  transition: all 250ms ease-out;
  &:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
      0 0 40px rgba(128, 128, 128, 0.1) inset;
    border-color: #dedede;
  }
`

const Background = styled.div`
  background-color: #f6f8ff;
  border-radius: 100px 0 100px 0;
  padding: 36px 18px;

  @media ${props => props.theme.breakpoints.lg} {
    padding: 36px 64px;
  }

  p {
    padding: 20px 0;
  }

  a {
    margin: 0 30px;
    :first-child {
      color: #787878;
      margin-left: 0;
    }
    :last-child {
      margin-right: 0;
    }
  }
`

const Header = styled(HeaderText)`
  font-size: 32px;
  line-height: 52px;
  margin: 0;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 40px;
    line-height: 42px;
  }
`

const RegisterRow = styled(Row)`
  > div {
    @media ${props => props.theme.breakpoints.lg} {
      max-width: 740px;
      margin: 0 auto;
    }
  }
`

const FormRow2 = styled(FormRow)`
  flex-direction: column;

  > div {
    &:last-child,
    &:first-child {
      margin: 0;
    }

    &:last-child {
      margin-top: 10px;
    }
  }

  @media ${props => props.theme.breakpoints.md} {
    flex-direction: row;

    > div {
      &:last-child {
        margin: 0 0 0 10px;
      }
      &:first-child {
      }
    }
  }
`

type OwnProps = $ReadOnly<{|
  comingFromOutside: string
|}>

type Props = $ReadOnly<{|
  ...OwnProps
|}>

class Register extends Component<Props> {
  state = {
    fields: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  componentWillUnmount() {
    const { clearRegisterThanks: clearRegisterThanksAction } = this.props
    clearRegisterThanksAction()
  }

  handleChange = e => {
    const {
      currentTarget: { name, value }
    } = e

    this.setState(
      produce(draft => {
        draft.fields[name] = value
      })
    )
  }

  submitForm = e => {
    e.preventDefault()
    const { fields } = this.state
    const {
      createUser: createUserAction,
      loginUser: loginUserAction
    } = this.props
    createUserAction(fields).then(resp => {
      if (!resp.status) {
        const {
          fields: { email, password }
        } = this.state
        loginUserAction({ email, password })
      }
    })
  }

  render() {
    const {
      user: {
        justRegistered,
        error: { messages: errors }
      },
      t
    } = this.props

    const registerForm = (
      <>
        <Header>{t('register')}</Header>
        <Form onSubmit={this.submitForm}>
          <FormRow2>
            <FormCol>
              <LabelInput
                placeholder={t('firstname')}
                label={t('firstname')}
                name="firstName"
                onChange={this.handleChange}
                errors={errors}
                required
              />
            </FormCol>
            <FormCol>
              <LabelInput
                placeholder={t('lastname')}
                name="lastName"
                label={t('lastname')}
                onChange={this.handleChange}
                required
                errors={errors}
              />
            </FormCol>
          </FormRow2>
          <FormRow>
            <FormCol>
              <LabelInput
                label={t('email')}
                placeholder={t('email')}
                name="email"
                type="email"
                onChange={this.handleChange}
                required
                errors={errors}
              />
            </FormCol>
          </FormRow>
          <FormRow>
            <FormCol>
              <LabelInput
                label={t('password')}
                type="password"
                placeholder={t('password')}
                name="password"
                onChange={this.handleChange}
                required
                errors={errors}
              />
            </FormCol>
          </FormRow>
          <FormRow>
            <FormCol>
              <Button size="medium" type="submit" as="button">
                {t('register')}
              </Button>
            </FormCol>
          </FormRow>
        </Form>
      </>
    )

    const registerThanks = (
      <>
        <Header>{t('thank-you-registering')}</Header>
        <p>{t('you-can-start-using')}</p>
        <div>
          <Link href="/">
            <a>{t('not-now-will-update-later')}</a>
          </Link>
          <Link href="/update-profile">
            <Button>{t('update-profile')}</Button>
          </Link>
        </div>
      </>
    )

    return (
      <MainLayout>
        <Helmet>
          <title>{t('page-titles:register')}</title>
          <meta property="og:title" content={t('page-titles:register')} />
        </Helmet>
        <Container>
          <RegisterRow>
            <Col size={12}>
              <Background>
                {justRegistered ? registerThanks : registerForm}
              </Background>
            </Col>
          </RegisterRow>
        </Container>
      </MainLayout>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user
})

export default connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  {
    createUser,
    clearRegisterThanks,
    loginUser
  }
)(withTranslation(['common', 'page-titles'])(AuthHoc(Register)))
