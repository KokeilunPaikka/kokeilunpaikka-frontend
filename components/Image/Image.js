// @flow

import styled from 'styled-components/macro'

const Image = styled.img`
 /* border-radius: 100px 0 100px 0;
  width: 100%;

  object-fit: cover;*/

  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 100px 0 100px 0;
}
`

const Container = styled.div`
  position: relative;
  padding-top: 100%;
`

const RoundedImage = props => (
  <Container>
    {/* eslint-disable-next-line */}
    <Image {...props} />
  </Container>
)

export default RoundedImage
