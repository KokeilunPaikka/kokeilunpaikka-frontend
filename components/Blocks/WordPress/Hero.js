import { Row, Col } from 'components/Layout/Grid'
import styled from 'styled-components/macro'

const Title = styled.h1`
  color: white;
  font-size: 32px;
  font-weight: 600;
  width: 1140px;
  text-align: center;
  margin: 0 auto;
  text-shadow: 1px 1px 2px #000000;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 60px;
  }
`

const Hero = props => {
  const { image, title } = props

  return (
    <Row
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url("${image}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        height: 600,
        margin: 0,
        width: '100%'
      }}
    >
      <Col style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <Title>{title}</Title>
      </Col>
    </Row>
  )
}

export default Hero
