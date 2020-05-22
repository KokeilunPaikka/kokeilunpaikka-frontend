// @flow
import styled from 'styled-components/macro'

const Row = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  flex-wrap: wrap;

  @media ${props => props.theme.breakpoints.xl} {
    margin-right: -15px;
    margin-left: -15px;
  }
`

export default Row
