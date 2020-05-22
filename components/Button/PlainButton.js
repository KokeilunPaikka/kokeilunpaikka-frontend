// @flow

import styled from 'styled-components/macro'

const Button = styled.button.attrs(() => ({
  type: 'button'
}))`
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  appearance: none;
  user-select: none;
  border-style: none;
  border: 0;
  background: none;
  box-shadow: none;
  border-radius: 0px;
  outline: 0;

  :focus {
    background: none;
    outline: none;
    border: none;
  }
  :hover {
    background: none;
    border: none;
    outline: none;
    box-shadow: none;
  }

  :disabled {
    color: gray;
  }

  :active {
    transform: translateY(1px);
  }
`

export default Button
