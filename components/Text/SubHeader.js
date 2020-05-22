import styled from 'styled-components/macro'

const SubHeader = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 18px;
  line-height: 31px;
  font-weight: 400;

  @media ${props => props.theme.breakpoints.lg} {
    font-size: 24px;
  }
`

export default SubHeader
