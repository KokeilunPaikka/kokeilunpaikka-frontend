import styled from 'styled-components/macro'

const ContainerEl = styled.div`
  margin-right: auto;
  margin-left: auto;
  width: 100%;

  @media ${props => props.theme.breakpoints.xl} {
    width: 1140px;
  }
`

const Container = ({ size, children }) => {
  return <ContainerEl>{children}</ContainerEl>
}

export default Container
