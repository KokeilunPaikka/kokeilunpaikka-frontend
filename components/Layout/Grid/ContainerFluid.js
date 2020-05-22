import styled from 'styled-components/macro'

const ContainerEl = styled.div`
  margin-right: auto;
  margin-left: auto;
  width: 100%;
`

const ContainerFluid = ({ size, children }) => {
  return <ContainerEl>{children}</ContainerEl>
}

export default ContainerFluid
