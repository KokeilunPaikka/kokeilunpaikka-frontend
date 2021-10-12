// @flow
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { StyledModal } from 'components/Modals'
import styled from 'styled-components/macro'

const ThemeIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.colors.mint};
  cursor: pointer;
  font-size: 20px;
  margin-left: 3px;
`

const Tooltip = ({ text, title = '' }: { text: string, title?: string }) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <ThemeIcon onClick={() => setOpen(true)} icon={faQuestionCircle} />
      <StyledModal isOpen={open} onRequestClose={() => setOpen(false)}>
        <h3>{title}</h3>
        {text}
      </StyledModal>
    </>
  )
}

Tooltip.defaultProps = {
  title: ''
}

export default Tooltip
