import styled from 'styled-components/macro'

const HeaderText = styled.h1`
  display: inline-block;
  color: ${props => props.theme.colors.primary};

  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.mint} 0%,
    ${props => props.theme.colors.mint}
  );
  background-position: 100% 95%;
  background-repeat: repeat-x;
  background-size: 2px 17px;
  font-size: 32px;
  line-height: 42px;
  margin: 0;
  padding: 0 5px 0 5px;
  font-weight: 800;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 40px;
    line-height: 54px;
  }

  @media ${props => props.theme.breakpoints.xl} {
    font-size: 60px;
    line-height: 74px;
    margin: 0;
  }
`

export default HeaderText
