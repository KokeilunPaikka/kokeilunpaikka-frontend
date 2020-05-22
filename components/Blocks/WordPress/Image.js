import { Row, Col } from 'components/Layout/Grid'
import ContentContainer from "components/Blocks/WordPress/ContentContainer";

const Image = props => {
  const { content } = props
  return (
    <ContentContainer>
      <Row>
        <Col>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Col>
      </Row>
    </ContentContainer>
  )
}

export default Image
