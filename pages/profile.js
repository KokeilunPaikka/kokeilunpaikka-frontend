// @flow

import { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import { MainLayout } from 'components/Layout'
import { HeaderText } from 'components/Text'
import { Row, Col } from 'components/Layout/Grid'
import { Container } from 'components/common'

import { RoundedImage } from 'components/Image'
import AuthHoc from 'components/AuthHoc'
import { withTranslation, Link } from 'i18n'
import ImageTextCard from 'components/ImageTextCard'
import { Icon } from 'components/Icon'
import { getStatusOptions } from 'store/actions/users'

import { Button as ButtonBase } from 'components/Button'

import Helmet from 'react-helmet'

const Background = styled.div`
  border-radius: 100px 0 100px 0;
  background-color: #f6f8ff;
`

const Name = styled(HeaderText)`
  margin: 15px 0 10px;
  background-position: 100% 75%;
`

const ExperimentCol = styled(Col)`
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

const Tag = styled.div`
  background: ${props => props.theme.colors.mint};
  color: white;
  font-size: 12px;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 15px;
`

const ThemeTitle = styled.p`
  margin: 0 5px 10px 5px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`

const ContentCol = styled(Col)`
  @media ${props => props.theme.breakpoints.md} {
    padding-right: 50px;
  }

  > h1 {
    font-size: 32px;

    @media ${props => props.theme.breakpoints.md} {
      font-size: 40px;
    }
  }
`

const ContactTitle = styled.div`
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`

const Themes = styled.div`
  padding: 25px 15px 25px;
  @media ${props => props.theme.breakpoints.md} {
    padding: 0 30px 25px;
  }
`

const Status = styled.div`
  padding: 25px 15px 25px;
  @media ${props => props.theme.breakpoints.md} {
    padding: 0 30px 25px;
  }
  span {
    display: inline-block;
    background: ${props => props.theme.colors.primary};
    color: white;
    font-size: 12px;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 15px;
  }
`

const Contact = styled.div`
  margin: 25px 0 50px;
  display: flex;
  align-items: center;
`

const ImageCol = styled(Col)`
  padding: 0;
  img {
    @media ${props => props.theme.breakpoints.md} {
      height: auto;
      padding: 0 15px;
    }
  }
`

const HugeButton = styled(ButtonBase)`
  padding: 10px 150px;
  font-size: 20px;
  margin: 0px 0 50px;
`

type OwnProps = $ReadOnly<{|
  comingFromOutside: string
|}>

type Props = $ReadOnly<{|
  ...OwnProps,
  currentUser: {
    full_name: string,
    experiments: {
      id: number,
      slug: string,
      image_url: string,
      name: string,
      short_description: string,
      stage: { stage_number: number }
    },
    image_url: string,
    description: string,
    facebook_url: string,
    instagram_url: string,
    linkedin_url: string,
    twitter_url: string,
    interested_in_themes: { name: string }
  }
|}>

class UserProfile extends Component<Props> {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common', 'page-titles']
    }
  }

  componentDidMount() {
    const { getStatusOptions: getStatusOptionsAction } = this.props
    getStatusOptionsAction()
  }

  render() {
    const {
      currentUser,
      currentUser: {
        full_name: fullName,
        experiments,
        image_url: profileImg,
        description: userDescription,
        facebook_url: facebookUrl,
        instagram_url: instagramUrl,
        linkedin_url: linkedinUrl,
        twitter_url: twitterUrl,
        interested_in_themes: interestedInThemes,
        status,
        looking_for: lookingFor,
        offering
      },
      user: { statusOptions },
      t
    } = this.props

    if (
      !currentUser ||
      (Object.entries(currentUser).length === 0 &&
        currentUser.constructor === Object)
    )
      return null

    const userExperiments = experiments.map(
      ({
        slug,
        image_url: imageUrl,
        name,
        short_description: description,
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
          <ExperimentCol key={slug} size={4} style={{ display: 'flex' }}>
            <ImageTextCard
              key={slug}
              href={url}
              as={as}
              image={imageUrl}
              title={name}
              description={description}
              stage={stage}
              isPublished={isPublished}
            />
          </ExperimentCol>
        )
      }
    )

    const interestedThemes = interestedInThemes.map(({ name }) => (
      <Tag key={name}>{name}</Tag>
    ))

    let contact = null
    if (instagramUrl || facebookUrl || twitterUrl || linkedinUrl) {
      contact = (
        <Contact>
          <ContactTitle>{t('contact')}</ContactTitle>
          {facebookUrl ? (
            <a target="_blank" rel="noopener noreferrer" href={facebookUrl}>
              <Icon
                icon={['fab', 'facebook-f']}
                fixedWidth
                size="2x"
                width="16"
                style={{ color: '#2D3264', marginLeft: 10 }}
              />
            </a>
          ) : null}
          {twitterUrl ? (
            <a target="_blank" rel="noopener noreferrer" href={twitterUrl}>
              <Icon
                icon={['fab', 'twitter']}
                fixedWidth
                size="2x"
                width="16"
                style={{ color: '#2D3264', marginLeft: 10 }}
              />
            </a>
          ) : null}
          {linkedinUrl ? (
            <a target="_blank" rel="noopener noreferrer" href={linkedinUrl}>
              <Icon
                icon={['fab', 'linkedin']}
                fixedWidth
                size="2x"
                width="16"
                style={{ color: '#2D3264', marginLeft: 10 }}
              />
            </a>
          ) : null}
          {instagramUrl ? (
            <a target="_blank" rel="noopener noreferrer" href={instagramUrl}>
              <Icon
                icon={['fab', 'instagram']}
                fixedWidth
                size="2x"
                width="16"
                style={{ color: '#2D3264', marginLeft: 10 }}
              />
            </a>
          ) : null}
        </Contact>
      )
    }

    const img = profileImg || '/static/user-empty.png'
    const statusString =
      (statusOptions.find(s => status && s.id === status.id) || {}).value || ' '
    return (
      <MainLayout>
        <Helmet>
          <title>{t('page-titles:profile')}</title>
          <meta property="og:title" content={t('page-titles:profile')} />
        </Helmet>
        <Container>
          <Row>
            <ContentCol size={8} offset={4}>
              <Link href="/update-profile" passHref>
                <HugeButton>{t('edit-profile')}</HugeButton>
              </Link>
            </ContentCol>
          </Row>
          <Background>
            <Row>
              <ImageCol size={4}>
                {img ? (
                  <RoundedImage src={img} alt={fullName} />
                ) : (
                  <div style={{ height: 50 }} />
                )}
                {status ? (
                  <Status>
                    <ThemeTitle>
                      {t('update-profile:person-status-label')}
                    </ThemeTitle>
                    <span>
                      {`${statusString[0].toUpperCase()}${statusString.slice(
                        1
                      )}`}
                    </span>
                  </Status>
                ) : null}
                {interestedInThemes.length > 0 ? (
                  <Themes>
                    <ThemeTitle>{t('interested-themes')}</ThemeTitle>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {interestedThemes}
                    </div>
                  </Themes>
                ) : null}
                {lookingFor.length > 0 ? (
                  <Themes>
                    <ThemeTitle>
                      {t('update-profile:person-looking-for-label')}
                    </ThemeTitle>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {lookingFor.map(l => (
                        <Tag key={l.id}>{l.value}</Tag>
                      ))}
                    </div>
                  </Themes>
                ) : null}
                {offering.length > 0 ? (
                  <Themes>
                    <ThemeTitle>
                      {t('update-profile:person-offering-label')}
                    </ThemeTitle>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {offering.map(o => (
                        <Tag key={o.id}>{o.offering_value || o.value}</Tag>
                      ))}
                    </div>
                  </Themes>
                ) : null}
              </ImageCol>
              <ContentCol size={8}>
                <Name>{fullName}</Name>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: '18px',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {userDescription}
                </div>
                {contact}
              </ContentCol>
            </Row>
          </Background>
          {experiments.length > 0 ? (
            <Row>
              <Col>
                <Title>{t('own-experiments')}</Title>
              </Col>
            </Row>
          ) : null}
          <Row>{userExperiments}</Row>
        </Container>
      </MainLayout>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    currentUser: user.user,
    user
  }
}

export default withTranslation(['common', 'page-titles', 'update-profile'])(
  AuthHoc(
    connect<Props, OwnProps, _, _, _, _>(
      mapStateToProps,
      {
        getStatusOptions
      }
    )(AuthHoc(UserProfile))
  )
)
