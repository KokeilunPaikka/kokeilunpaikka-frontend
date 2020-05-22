import { Row, Col } from 'components/Layout/Grid'
import ContentContainer from "components/Blocks/WordPress/ContentContainer";

const Youtube = props => {
  const { url } = props
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)

  let youtubeId = null
  if (match && match[2].length === 11) {
    youtubeId = match[2]
  } else {
    return null
  }

  return (
    <ContentContainer>
      <Row>
        <Col style={{ width: '100%' }}>
          <div
            className="video"
            style={{
              position: 'relative',
              paddingBottom: '56.25%' /* 16:9 */,
              paddingTop: 25,
              height: 0
            }}
          >
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
              src={`https://www.youtube.com/embed/${youtubeId}`}
              frameBorder="0"
            />
          </div>
        </Col>
      </Row>
    </ContentContainer>
  )
}

export default Youtube
