// @flow

import styled from 'styled-components/macro'

const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  width: 100%;

  @media ${props => props.theme.breakpoints.xl} {
    width: 1140px;
  }
`

const ContainerFluid = styled.div`
  margin-right: auto;
  margin-left: auto;
  width: 100%;
`

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

const Col: { offset?: number, size: number } = styled.div`
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

export { Col, Row, Container, ContainerFluid }
