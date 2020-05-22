// @flow

import Modal from 'react-modal'
import styled, { keyframes } from 'styled-components/macro'

import { CloseButton } from 'components/Button'

const ReactModalAdapter = ({ className, children, ...props }) => {
  const contentClassName = `${className}__content`
  const overlayClassName = `${className}__overlay`

  const { onRequestClose } = props
  return (
    <Modal
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      {...props}
    >
      {children}

      <CloseButton onClick={onRequestClose} />
    </Modal>
  )
}

const fadeIn = keyframes`from { opacity: 0; }`

const StyledModal = styled(ReactModalAdapter)`
  &__overlay {
    animation: ${fadeIn} 200ms ease-out;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.3);
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__content {
    border: 1px solid #ccc;
    background: #f6f8ff;
    -webkit-overflow-scrolling: touch;
    border-radius: 100px 0 100px 0;
    outline: none;
    padding: 60px 15px;

    max-height: 90vh;
    min-width: 80%;

    //overflow: none;
    overflow-x: hidden;

    @media ${props => props.theme.breakpoints.md} {
      padding: 50px;
      min-width: 50%;
    }

    position: relative;
  }
`

export default StyledModal
