// @flow

import styled from 'styled-components/macro'
import { lighten, darken } from 'polished'

const Button = styled.a`
  border-radius: 24px;
  background-color: ${props => props.theme.colors.primary}};
  padding: 9px 24px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  appearance: none;
  user-select: none;
  border-style: none;

  outline: 0;

  &:hover {
    background-color: ${props => lighten(0.1, props.theme.colors.primary)};
    box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.37);
  }

  &:disabled {
    background-color: ${props => darken(0.2, props.theme.colors.text)};
  }

  :active {
    background-color: ${props => lighten(0.14, props.theme.colors.primary)};
    transform: translateY(1px);
  }

  :focus {
    outline: 0;
  }
`

export default Button
