// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import { MainLayout } from 'components/Layout'

import { LabelInput } from 'components/Input'
import { Container, Row, Col } from 'components/Layout/Grid'

import { confirmPassword } from 'store/actions/users'

import { FormRow, FormCol } from 'components/Forms'

import { produce } from 'immer'

import AuthHoc from 'components/AuthHoc'

import { withTranslation, i18n } from 'i18n'

import { withRouter } from 'next/router'

import cogoToast from 'cogo-toast'
import { HeaderText as Header } from 'components/Text'
import { Button as ButtonBase } from 'components/Button'

const Background = styled.div`
  background-color: #f6f8ff;
  border-radius: 100px 0 100px 0;
  padding: 36px 18px;

  @media ${props => props.theme.breakpoints.md} {
    padding: 36px 64px;
  }
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Button = styled(ButtonBase)`
  font-size: 16px;

  padding: 8px 65px 7px;

  transition: all 250ms ease-out;
  &:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
      0 0 40px rgba(128, 128, 128, 0.1) inset;
    border-color: #dedede;
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

class UpdateProfile extends Component<Props> {
  state = {
    fields: {
      new_password1: '',
      new_password2: '',
      email: ''
    }
  }

  static async getInitialProps() {
    return {
      namespacesRequired: ['password-reset']
    }
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

  submitPasswordChange = e => {
    e.preventDefault()
    const {
      dispatch,
      t,
      router,
      router: {
        query: { uid, token }
      }
    } = this.props
    const {
      fields: { new_password1: password1, new_password2: password2 }
    } = this.state
    dispatch(confirmPassword(password1, password2, uid, token)).then(resp => {
      if (resp.action) {
        const {
          action: { type }
        } = resp
        if (type === 'RESET_PASSWORD_CONFIRM_FULFILLED') {
          cogoToast.success(t('password-reset:new-password-success-toast'))
          router.push('/')
        }
      }
    })
  }

  render() {
    const {
      userIsAuthenticated,
      isPending,
      error: { messages: errors },
      t,
      router
    } = this.props

    const {
      fields: { new_password1: password1, new_password2: password2 }
    } = this.state

    if (userIsAuthenticated) {
      router.push('/profile')
    }

    return (
      <MainLayout>
        <Container>
          <Row>
            <Col size={8} offset={2}>
              <Background>
                <TitleContainer>
                  <Header>{t('password-reset:new-password')}</Header>
                </TitleContainer>
                <form onSubmit={this.submitPasswordChange}>
                  <FormRow>
                    <FormCol>
                      <LabelInput
                        placeholder={t(
                          'password-reset:new-password1-placeholder'
                        )}
                        label={t('password-reset:new-password1-label')}
                        name="new_password1"
                        required
                        onChange={this.handleChange}
                        errors={errors}
                        value={password1}
                      />
                    </FormCol>
                  </FormRow>
                  <FormRow>
                    <FormCol>
                      <LabelInput
                        placeholder={t(
                          'password-reset:new-password2-placeholder'
                        )}
                        label={t('password-reset:new-password2-label')}
                        name="new_password2"
                        required
                        onChange={this.handleChange}
                        errors={errors}
                        value={password2}
                      />
                    </FormCol>
                  </FormRow>

                  <FormRow>
                    <FormCol align="right">
                      <Button size="medium" type="submit" as="button">
                        {t('password-reset:new-password')}
                      </Button>
                    </FormCol>
                  </FormRow>
                </form>
              </Background>
            </Col>
          </Row>
        </Container>
      </MainLayout>
    )
  }
}

const mapStateToProps = ({ user: { error } }) => ({ error })

export default withTranslation(['password-reset'])(
  withRouter(
    connect<Props, OwnProps, _, _, _, _>(
      mapStateToProps,
      {}
    )(AuthHoc(UpdateProfile))
  )
)
