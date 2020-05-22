// @flow

import { useState, useEffect } from 'react'
import { Button } from 'components/Button'
import { StyledModal, LoginRegister } from 'components/Modals'
import styled from 'styled-components/macro'

import { useTranslation } from 'i18n'

const DropDownContainer = styled.div`
  position: relative;
`

const LoginModal = styled(StyledModal)`
  &__content {
    @media ${props => props.theme.breakpoints.md} {
      //min-width: inherit;
      min-width: 25vw;
    }
  }
`
const LoginMenu = () => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const search = new URLSearchParams(window.location.search)
    if (search.get('login-to-profile')) {
      setOpen(true)
    }
  }, [])
  const { t } = useTranslation()

  return (
    <DropDownContainer>
      <Button onClick={() => setOpen(true)}>{t('login-register')}</Button>
      <LoginModal isOpen={open} onRequestClose={() => setOpen(false)}>
        <LoginRegister />
      </LoginModal>
    </DropDownContainer>
  )
}

export default LoginMenu
