// @flow

import React from 'react'
import styled from 'styled-components/macro'

export const StyledBurger = styled.button`
  position: absolute;
  right: 0;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 3rem;
  height: 3rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1000;
  outline: 0;

  span {
    width: 45px;
    height: 0.35rem;
    background: ${({ theme: { colors }, open }) =>
      open ? colors.primary : colors.primary};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) =>
        open ? 'translateX(-20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`
const Container = styled.div`
  position: relative;
  flex: 0;
`

const Burger = ({
  open,
  setOpen,
  ...props
}: {
  open: boolean,
  setOpen: Function
}) => {
  return (
    <Container>
      <StyledBurger
        aria-label="Toggle menu"
        aria-expanded={open}
        open={open}
        onClick={() => {
          setOpen(!open)
          if (open) {
            document.body.classList.remove('relative-menu')
          } else {
            document.body.classList.add('relative-menu')
          }
        }}
        {...props}
      >
        <span />
        <span />
        <span />
      </StyledBurger>
    </Container>
  )
}

export default Burger
