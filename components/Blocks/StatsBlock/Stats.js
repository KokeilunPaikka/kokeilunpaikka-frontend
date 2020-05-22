// @flow
import { useSelector } from 'react-redux'
import { Container } from 'components/common'
import { Row, Col } from 'components/Layout/Grid'
import styled from 'styled-components/macro'
import { useTranslation } from 'i18n'

const Wrapper = styled.div`
  background-color: #96d2eb;
  padding: 95px;
  margin: 67px 0;
  text-align: center;
`
const StatTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 70px;
  margin: 0;
`
const StatText = styled.p`
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
`

const Stats = ({
  statistics
}: {
  statistics: {
    visible_experiments_count: string | number,
    users_with_experiments_count: string | number,
    experiment_success_rating_average: string | number
  }
}) => {
  const [t] = useTranslation()
  const { config } = useSelector(state => state.configs)

  const elements = []

  // Manually added static stats
  const stats = {
    ...statistics,
    funded_experiments:
      config && config.funded_experiments_amount
        ? config.funded_experiments_amount
        : 118
  }

  const {
    visible_experiments_count: experimentsCount,
    funded_experiments: fundedExperiments,
    active_users_count: activeUsersCount
  } = stats

  const elementSize = 4

  if (experimentsCount) {
    elements.push(
      <Col size={elementSize} key="experiments">
        <StatTitle>{experimentsCount}</StatTitle>
        <StatText>{t('experiments')}</StatText>
      </Col>
    )
  }
  if (activeUsersCount) {
    elements.push(
      <Col size={elementSize} key="user-count">
        <StatTitle>{activeUsersCount}</StatTitle>
        <StatText>{t('experiment-users')}</StatText>
      </Col>
    )
  }
  if (fundedExperiments) {
    elements.push(
      <Col size={elementSize} key="rating-average">
        <StatTitle>{fundedExperiments}</StatTitle>
        <StatText>{t('experiments-funded')}</StatText>
      </Col>
    )
  }

  return (
    <Wrapper>
      <Container>
        <Row>{elements}</Row>
      </Container>
    </Wrapper>
  )
}

export default Stats
