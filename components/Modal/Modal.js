import React, { useRef, useContext, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled, { keyframes } from 'styled-components'

import { CloseButton } from 'components/Button'

const Context = React.createContext()

export function ModalProvider({ children }) {
  const modalRef = useRef()
  const [context, setContext] = useState()

  // make sure re-render is triggered after initial
  // render so that modalRef exists
  useEffect(() => {
    setContext(modalRef.current)
  }, [])

  return (
    <div>
      <Context.Provider value={context}>{children}</Context.Provider>
      <div ref={modalRef} />
    </div>
  )
}

export function Modal({ onClose, children, ...props }) {
  const modalNode = useContext(Context)

  return modalNode
    ? ReactDOM.createPortal(
        <Overlay>
          <Dialog {...props}>
            {children}
            <CloseButton onClick={onClose} />
          </Dialog>
        </Overlay>,

        modalNode
      )
    : null
}

const fadeIn = keyframes`from { opacity: 0; }`

const Overlay = styled.div`
  animation: ${fadeIn} 200ms ease-out;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
`

const Dialog = styled.div`
  background: white;
  border-radius: 100px 0 100px 0;

  padding: 80px;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`
