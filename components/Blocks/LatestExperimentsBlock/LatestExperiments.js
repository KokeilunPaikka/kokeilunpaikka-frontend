// @flow
import { Container } from 'components/common'
import { Row, Col } from 'components/Layout/Grid'
import styled from 'styled-components/macro'
import ImageTextCard from 'components/ImageTextCard'

const ExperimentCol = styled(Col)`
  > div {
    margin-top: 30px;
  }

  @media ${props => props.theme.breakpoints.md} {
    flex-basis: 50%;
    max-width: 50%;
  }

  @media ${props => props.theme.breakpoints.xl} {
    flex-basis: ${props => (props.size / 12) * 100}%;
    max-width: ${props => (props.size / 12) * 100}%;

    > div {
      margin-top: 0;
    }
  }
`

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
`
const LatestExperiments = ({
  list,
  title
}: {
  list: Array<{
    slug: string,
    name: string,
    short_description: string,
    imageUrl: string,
    stage: { stage_number: number }
  }>,
  title: String
}) => {
  const experiments = list
    .filter(({ is_published: isPublished }) => isPublished)
    .map(
      ({
        id,
        slug,
        name,
        short_description: desc,
        image_url: imageUrl,
        stage: { stage_number: stage },
        is_published: isPublished
      }) => {
        const urlPart = `/kokeilu${isPublished ? '' : '-draft'}`

        const url = {
          pathname: `${urlPart}/[slug]`,
          query: {
            slug
          }
        }

        const as = `${urlPart}/${slug}`

        return (
          <ExperimentCol key={id} size={4} style={{ display: 'flex' }}>
            <ImageTextCard
              href={url}
              as={as}
              title={name}
              description={desc}
              image={imageUrl}
              stage={stage}
              isPublished={isPublished}
            />
          </ExperimentCol>
        )
      }
    )

  return (
    <Container>
      <Row>
        <Col>
          <Title>{title}</Title>
        </Col>
      </Row>
      <Row>{experiments}</Row>
    </Container>
  )
}

export default LatestExperiments
