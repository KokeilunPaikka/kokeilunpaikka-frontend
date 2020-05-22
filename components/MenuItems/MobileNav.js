// @flow

import styled from 'styled-components'

import React from 'react'

import type { Node } from 'react'

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: ${({ theme }) => theme.colors.backgroundLight};
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  height: 100%;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  overflow: auto;
  width: 100%;
  z-index: 98;

  ul {
    flex: 0;
  }
`

const Menu = ({
  open,
  children,
  ...props
}: {
  open: boolean,
  children: Node
}) => {
  const tabIndex = open ? 0 : -1

  return (
    <StyledMenu open={open} aria-hidden={!open} {...props}>
      {children}
    </StyledMenu>
  )
}

export default Menu
