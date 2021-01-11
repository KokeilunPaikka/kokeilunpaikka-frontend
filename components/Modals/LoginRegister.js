// @flow

import React, { useState } from 'react'
import styled from 'styled-components/macro'

import { HeaderText } from 'components/Text'
import { LabelInput } from 'components/Input'
import { ContainerFluid, Row, Col } from 'components/Layout/Grid'

import { Button as ButtonBase } from 'components/Button'

import { useDispatch, useSelector } from 'react-redux'
import { loginUser, getDetails } from 'store/actions/users'

import { Link, useTranslation } from 'i18n'

import { GeneralError } from 'components/Errors'

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

const Wrapper = styled.div`
  max-width: 555px;
`

const RegisterLink = styled.a`
  font-weight: bold;

  color: ${props => props.theme.colors.primary};
  text-decoration: none;

  margin-top: 20px;
  display: block;
`

const Form = styled.form`
  ${Row} {
    margin-top: 20px;
  }
`

const LoginRegister = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const [t] = useTranslation()

  const {
    error: { messages: errors }
  } = useSelector(({ user }) => user)

  const logIn = e => {
    e.preventDefault()
    dispatch(loginUser({ email, password })).then(() => {
      dispatch(getDetails())
    })
  }

  return (
    <Wrapper>
      <HeaderText>{t('login')}</HeaderText>

      <Form onSubmit={logIn}>
        <ContainerFluid>
          <Row>
            <Col size={12}>
              <LabelInput
                type="email"
                label={t('email')}
                placeholder={t('email')}
                onChange={e => setEmail(e.currentTarget.value)}
                errors={errors}
                name="email"
              />
            </Col>
          </Row>
          <Row>
            <Col size={12}>
              <LabelInput
                type="password"
                label={t('password')}
                placeholder={t('password')}
                onChange={e => setPassword(e.currentTarget.value)}
                errors={errors}
                name="password"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Button type="Submit" as="button">
                {t('login')}
              </Button>
            </Col>
          </Row>
        </ContainerFluid>
        <Row>
          <Col size={12}>
            <GeneralError errors={errors} />
          </Col>
        </Row>
      </Form>

      <Row>
        <Col>
          <Link href="/register" passHref>
            <RegisterLink>{t('register')}</RegisterLink>
          </Link>
          <Link href="/reset-password" passHref>
            <RegisterLink>{t('password-reset:forgot-password')}</RegisterLink>
          </Link>
        </Col>
      </Row>
    </Wrapper>
  )
}

export { LoginRegister } // eslint-disable-line
