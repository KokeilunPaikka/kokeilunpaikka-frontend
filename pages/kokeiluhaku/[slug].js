// @flow

import { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import { HeroLayout } from 'components/Layout'
import { Row, Col } from 'components/Layout/Grid'
import { Container } from 'components/common'
import { Button as ButtonBase } from 'components/Button'
import { withRouter } from 'next/router'
import { getSingleChallenge } from 'store/actions/experimentChallenges'

import { parseISO, format, isWithinInterval } from 'date-fns'
import { Link, withTranslation, i18n } from 'i18n'
import AuthHoc from 'components/AuthHoc'
import LeafCta from 'components/Blocks/LeafCtaBlock'
import ImageTextCard from 'components/ImageTextCard'
import TimeLine from 'components/TimeLine/TimeLine'

import Helmet from 'react-helmet'

const Button = styled(ButtonBase)`
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  flex: 1 1 100%;
  background-color: ${props => props.theme.colors.primary};
  margin-bottom: 50px;
`

const TitleContainer = styled.div`
  display: grid;
`

const DateField = styled.p`
  grid-column: 1;
  grid-row: 1;
  color: #ffffff;
  font-size: 20px;
  z-index: 7;
  margin: 73px 0 0 37px;
  font-weight: normal;
`

const Leaf = styled.div`
  height: 275px;
  width: 275px;
  border-radius: 100px 0 100px 0;
  z-index: 6;

  display: block;
  background-color: #73be9b;
  grid-column: 1;
  grid-row: 1;
  align-self: center;
  justify-self: left;
  margin-left: 15px;
  @media ${props => props.theme.breakpoints.xl} {
    margin-left: 0;
  }
`
const Shadow = styled.span`
  text-shadow: 0 0 8px #000000;
  z-index: 5;

  color: #ffffff;
  font-size: 32px;
  grid-column: 1;
  grid-row: 1;
  margin: 0;
  font-weight: 700;

  align-self: center;
  justify-self: left;
  padding-left: 36px;
  margin-top: 40px;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 60px;
  }
`

const Light = styled.h1`
  color: #ffffff;
  font-size: 32px;
  z-index: 7;
  grid-column: 1;
  grid-row: 1;
  font-weight: 700;

  margin: 0;
  align-self: center;
  justify-self: left;
  padding-left: 36px;
  margin-top: 40px;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 60px;
  }
`

const HeroContainer = styled.div`
  background: linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2) ), url('${props =>
    props.src}');
  background-repeat: no-repeat;@media ${props => props.theme.breakpoints.md} {
    font-size: 60px;
  }
  background-attachment: fixed;
  background-size: cover;
  padding: 235px 0 52px;
`

const ExperimentCol = styled(Col)`
  > div {
    margin-top: 50px;
  }

  @media ${props => props.theme.breakpoints.md} {
    flex-basis: 50%;
    max-width: 50%;
  }

  @media ${props => props.theme.breakpoints.xl} {
    flex-basis: ${props => (props.size / 12) * 100}%;
    max-width: ${props => (props.size / 12) * 100}%;
  }
`

const Title = styled.h2`
  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.mint} 0%,
    ${props => props.theme.colors.mint}
  );
  color: ${props => props.theme.colors.primary};
  background-position: 100% 95%;
  background-repeat: repeat-x;
  background-size: 2px 17px;
  font-size: 32px;
  line-height: 54px;
  margin: 50px 0 0 0;
  padding: 0 5px 0 5px;
  font-weight: 800;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 40px;
  }
`

const TimeLineRow = styled(Row)`
  &.odd {
    justify-content: flex-end;

    .content {
      order: 2;
    }

    .border {
      justify-content: flex-end;
    }
  }

  .border {
    display: none;
    @media ${props => props.theme.breakpoints.md} {
      display: flex;
      align-items: flex-end;
    }
  }
`

const TimeLineBlock = styled.div`
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 50px;
  padding-top: 15px;

  > div {
    > div:last-child {
      .border {
        display: none;
      }
    }
  }

  > div {
    max-width: 740px;
    margin: 0 auto;
  }
`

const Border = styled.div`
  border-top: 2px dashed #aeaeae;
  border-right: 2px dashed #aeaeae;
  height: 90px;
  border-radius: 0 40px 0 0;
  width: 100px;
  position: relative;
  left: -25px;

  &.odd {
    border-radius: 40px 0 0 0;
    border-top: 2px dashed #aeaeae;
    border-left: 2px dashed #aeaeae;
    border-right: 0;
    right: -25px;
    left: auto;
  }
`

const TimeLineTitle = styled.h2`
  font-size: 32px;
  color: ${props => props.theme.colors.primary};

  @media ${props => props.theme.breakpoints.md} {
    font-size: 40px;
  }
`

type OwnProps = $ReadOnly<{|
  t: Function,
  i18n: Object
|}>

type Props = $ReadOnly<{|
  ...OwnProps,
  currentChallenge: Array<{
    name: string,
    starts_at: string,
    ends_at: string,
    image_url: string,
    description: string,
    lead_text: string,
    experiments: Array<Object>,
    timeline_entries: Array<Any>
  }>,
  dispatch: Dispatch // eslint-disable-line
|}>

class SingleChallenge extends Component<Props> {
  static async getInitialProps({ store, query, req }) {
    const { slug } = query
    await store.dispatch(
      getSingleChallenge(slug, req ? req.language : i18n.language)
    )

    return {
      namespacesRequired: ['common', 'page-titles']
    }
  }

  render() {
    const {
      currentChallenge: {
        id,
        name,
        starts_at: startsAt,
        ends_at: endsAt,
        image_url: imageUrl,
        description,
        lead_text: leadText,
        experiments,
        timeline_entries: timelineEntries
      },
      t,
      i18n // eslint-disable-line
    } = this.props

    const localStartAt = format(parseISO(startsAt), 'dd.M.yyyy')
    const localendsAt = format(parseISO(endsAt), 'dd.M.yyyy')
    const dateRange = `${localStartAt} - ${localendsAt}`

    const isActive = isWithinInterval(new Date(), {
      start: parseISO(startsAt),
      end: parseISO(endsAt)
    })

    const acceptedExperimentElements = experiments
      .filter(({ is_approved: isApproved }) => isApproved)
      .map(
        ({
          slug,
          image_url: experimentImageUrl,
          name: experimentName,
          short_description: experimentDescription,
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
            <ExperimentCol key={name} size={4} style={{ display: 'flex' }}>
              <ImageTextCard
                image={experimentImageUrl}
                title={experimentName}
                stage={stage}
                description={experimentDescription}
                href={url}
                as={as}
                isPublished={isPublished}
              />
            </ExperimentCol>
          )
        }
      )

    const unAcceptedExperimentElements = experiments
      .filter(({ is_approved: isApproved }) => !isApproved)
      .map(
        ({
          slug,
          image_url: experimentImageUrl,
          name: experimentName,
          short_description: experimentDescription,
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
            <ExperimentCol key={name} size={4} style={{ display: 'flex' }}>
              <ImageTextCard
                image={experimentImageUrl}
                title={experimentName}
                stage={stage}
                description={experimentDescription}
                href={url}
                as={as}
                isPublished={isPublished}
              />
            </ExperimentCol>
          )
        }
      )

    const timeEntries = timelineEntries.map((timeline, index) => {
      let clazz = 'dark'
      if (index % 3 === 0) {
        clazz = 'light'
      } else if (index % 3 === 1) {
        clazz = 'normal'
      }

      let rowClazz = 'even'
      if (index % 2 === 1) {
        rowClazz = 'odd'
      }

      return (
        <TimeLineRow className={rowClazz}>
          <Col className="content" size={6} style={{ maxWidth: '50%' }}>
            <TimeLine
              className={clazz}
              content={timeline.content}
              date={timeline.date}
              language={i18n.language}
            />
          </Col>
          <Col className="border" size={6}>
            <Border className={rowClazz} />
          </Col>
        </TimeLineRow>
      )
    })

    return (
      <HeroLayout>
        <Helmet>
          <title>{name}</title>
          <meta property="og:image" content={imageUrl} />
          <meta property="og:title" content={name} />
          <meta property="og:description" content={leadText} />
        </Helmet>
        <HeroContainer src={imageUrl}>
          <Container>
            <TitleContainer>
              <Leaf />
              <DateField>{dateRange}</DateField>
              <Shadow>{name}</Shadow>
              <Light>{name}</Light>
            </TitleContainer>
          </Container>
        </HeroContainer>
        <div style={{ backgroundColor: '#F6F8FF', textAlign: 'center' }}>
          <Container>
            <Row>
              <Col size={10} offset={1}>
                <p
                  style={{
                    fontSize: '24px',
                    margin: '65px auto',

                    color: '#2D3264'
                  }}
                >
                  {leadText}
                </p>
                {isActive && (
                  <Link
                    href={`/uusi-kokeilu?experiment_challenge=${id}`}
                    passHref
                  >
                    <Button>{t('start-experiment')}</Button>
                  </Link>
                )}
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Row>
            <Col size={8} offset={2}>
              <div
                style={{ marginTop: 50, marginBottom: 50 }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </Col>
          </Row>
          {timeEntries && timeEntries.length > 0 ? (
            <TimeLineBlock>
              <Row>
                <Col>
                  <TimeLineTitle>{t('timeline')}</TimeLineTitle>
                </Col>
              </Row>
              <div>{timeEntries}</div>
            </TimeLineBlock>
          ) : null}
          {isActive && (
            <Row>
              <Col style={{ width: '100%' }}>
                <LeafCta
                  title={t('are-you-interested')}
                  subtitle={t('go-for-it')}
                />
              </Col>
            </Row>
          )}

          {acceptedExperimentElements.length > 0 ? (
            <div>
              <Row>
                <Col>
                  <Title>{t('chosen-experiments')}</Title>
                </Col>
              </Row>
              <Row>{acceptedExperimentElements}</Row>
            </div>
          ) : null}
          {unAcceptedExperimentElements.length > 0 ? (
            <div>
              <Row>
                <Col>
                  <Title>{t('participated-experiments')}</Title>
                </Col>
              </Row>
              <Row>{unAcceptedExperimentElements}</Row>
            </div>
          ) : null}
        </Container>
      </HeroLayout>
    )
  }
}

const mapStateToProps = (
  { challenges },
  {
    router: {
      query: { slug }
    }
  }
) => {
  return {
    challenges,
    currentChallenge: challenges.byId[slug]
  }
}

export default withTranslation(['common', 'page-titles'])(
  withRouter(
    connect<Props, OwnProps, _, _, _, _>(
      mapStateToProps,
      {
        getSingleChallenge
      }
    )(AuthHoc(SingleChallenge))
  )
)
