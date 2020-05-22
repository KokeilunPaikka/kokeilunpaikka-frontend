// @flow
import { Node } from 'react'
import styled from 'styled-components/macro'

const Column = styled.div`
  box-sizing: border-box;
  flex: 0 0 auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;

  @media ${props => props.theme.breakpoints.md} {
    flex-basis: ${props => (props.size / 12) * 100}%;
    max-width: ${props => (props.size / 12) * 100}%;
    margin-left: ${props => (props.offset / 12) * 100}%;
    width: auto;
    max-width: 100%;
  }
`

const Col = ({
  className,
  size,
  offset,
  children,
  style
}: {
  size: Number,
  offset?: Number,
  children: Node,
  style: Array<Object>
}) => {
  return (
    <Column className={className} style={style} size={size} offset={offset}>
      {children}
    </Column>
  )
}

Col.defaultProps = {
  offset: 0
}

export default Col
