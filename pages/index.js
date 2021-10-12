// @flow

import React, { Component } from 'react'
import { HeroLayout } from 'components/Layout'
import {
  Hero,
  AnimatedSteps,
  Stats,
  IconBlock,
  CtaBlock
} from 'components/Blocks'

import AuthHoc from 'components/AuthHoc'
import { withTranslation, Link } from 'i18n'
import { getExperiments, getStatistics } from 'store/actions/experiments'
import { getConfiguration } from 'store/actions/configs'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Row, Col } from 'components/Layout/Grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from 'components/common'
import styled from 'styled-components/macro'
import LatestExperiments from 'components/Blocks/LatestExperimentsBlock'
import Helmet from 'react-helmet'

const BigLink = styled.a`
  color: ${props => props.theme.colors.primary};
  font-size: 24px;
  font-weight: bold;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 40px;
  }

  &:hover {
    cursor: pointer;
  }
`

class Index extends Component<Props> {
  static async getInitialProps({ store }) {
    await store.dispatch(getStatistics())
    await store.dispatch(getConfiguration())
    await store.dispatch(
      getExperiments({ page_size: 3, ordering: '-published_at' })
    )

    return {
      namespacesRequired: ['common', 'page-titles']
    }
  }

  componentDidUpdate() {
    const { router, isLogged } = this.props
    const search = new URLSearchParams(window.location.search)
    if (isLogged && search.get('login-to-profile')) {
      router.push('/profile')
    }
    if (isLogged && search.get('login-to-profile-edit')) {
      router.push('/update-profile?step=2')
    }
  }

  render() {
    const {
      t,
      experiments: { statistics, list },
      configs: { config },
      texts: { texts }
    } = this.props

    const featuredExperiments =
      config &&
      config.featured_experiments &&
      config.featured_experiments.length
        ? config.featured_experiments
        : list
    const newExperimentsTitle = (
      texts.find(txt => txt.text_type === 'experiment-browsing') || {}
    ).text_value
    return (
      <HeroLayout>
        <Helmet>
          <title>{t('page-titles:home')}</title>
          <meta property="og:title" content={t('page-titles:home')} />
        </Helmet>
        <Hero
          opacity={(config || {}).front_page_image_opacity || 1.0}
          headerImage={
            (config || {}).front_page_image || '/static/taustakuva-min.jpg'
          }
        />
        <AnimatedSteps />
        <IconBlock />
        <CtaBlock />
        <Stats statistics={statistics} />
        <LatestExperiments
          title={newExperimentsTitle}
          list={featuredExperiments}
        />
        <Container>
          <Row>
            <Col style={{ width: '100%', textAlign: 'right', marginTop: 50 }}>
              <Link href="/p/kokeilutarinoita">
                <BigLink>
                  {t('experiment-stories')}{' '}
                  <FontAwesomeIcon icon="long-arrow-alt-right" />
                </BigLink>
              </Link>
            </Col>
          </Row>
        </Container>
      </HeroLayout>
    )
  }
}

const mapStateToProps = ({ experiments, configs, texts, user }) => ({
  experiments,
  configs,
  texts,
  isLogged: user.isLogged
})

export default withTranslation(['common', 'page-titles'])(
  withRouter(
    connect(
      mapStateToProps,
      {
        getStatistics,
        getExperiments
      }
    )(AuthHoc(Index))
  )
)
