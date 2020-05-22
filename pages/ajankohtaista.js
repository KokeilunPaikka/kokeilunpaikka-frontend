// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import { MainLayout } from 'components/Layout'
import { Container } from 'components/common'
import { getArticles } from 'store/actions/blog'
import { HeaderTexts } from 'components/Text'
import { Col, Row } from 'components/Layout/Grid'
import { format } from 'date-fns'
import Icon from 'components/Icon/Icon'
import Spinner from 'components/Spinner/Spinner'
import { withTranslation, Link, i18n } from 'i18n'
import AuthHoc from 'components/AuthHoc'
import Pagination from 'components/Pagination'
import Helmet from 'react-helmet'

const ArticleDate = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.primary};
  font-weight: 300;
`

const Title = styled.h2`
  font-size: 24px;
  color: ${props => props.theme.colors.primary};
`
const ReadMore = styled.div`
  color: ${props => props.theme.colors.primary};
`

const ArticleCol = styled(Col)`
  @media ${props => props.theme.breakpoints.md} {
    flex-basis: 50%;
    max-width: 50%;
  }

  @media ${props => props.theme.breakpoints.xl} {
    flex-basis: ${props => (props.size / 12) * 100}%;
    max-width: ${props => (props.size / 12) * 100}%;
  }
`

type OwnProps = $ReadOnly<{|
  comingFromOutside: string
|}>

type Props = $ReadOnly<{|
  getArticles: Function,
  i18n: Object,
  dispatch: Dispatch // eslint-disable-line
|}>

class Blog extends Component<Props> {
  static async getInitialProps(ctx) {
    const { store, req } = ctx

    await store.dispatch(
      getArticles({
        page: 1,
        lang: req ? req.language : i18n.language
      })
    )
    return {
      namespacesRequired: ['common', 'page-titles']
    }
  }

  state = {
    page: 1,
    submitting: false
  }

  pageSize = 9

  getArticles = page => {
    const { getArticles: getArticlesAction, i18n } = this.props // eslint-disable-line
    this.setState({ submitting: true, page })

    getArticlesAction({
      page,
      per_page: this.pageSize,
      lang: i18n.language
    }).then(() => {
      this.setState({ submitting: false })
    })
  }

  render() {
    const {
      blog: { items, pagination },
      t
    } = this.props

    const { page, submitting } = this.state

    let articles = null
    if (submitting) {
      articles = <Spinner />
    } else if (items.length === 0) {
      articles = <Col style={{ marginTop: 25 }}>{t('no-results')}</Col>
    } else {
      articles = items.map(article => {
        let imageUrl = '/static/blog-default-image.jpg'
        /* eslint-disable no-underscore-dangle */
        if (
          article._embedded['wp:featuredmedia'] &&
          article._embedded['wp:featuredmedia']['0'].media_details &&
          article._embedded['wp:featuredmedia']['0'].media_details.sizes
        ) {
          imageUrl =
            article._embedded['wp:featuredmedia']['0'].media_details.sizes
              .thumbnail.source_url
        }
        /* eslint-enable no-underscore-dangle */
        return (
          <ArticleCol key={article.id} size="4" style={{ marginTop: 50 }}>
            <Link
              href={{
                pathname: '/artikkeli/[slug]',
                query: {
                  slug: article.slug
                }
              }}
              as={`/artikkeli/${article.slug}`}
            >
              <a style={{ textDecoration: 'none' }}>
                <img src={imageUrl} alt={article.title.rendered} />
                <ArticleDate>
                  {format(new Date(article.date_gmt), 'dd.MM.yyyy')}
                </ArticleDate>
                <Title>{article.title.rendered}</Title>
                <ReadMore>
                  {t('read-more')}
                  <Icon
                    icon={['fa', 'chevron-right']}
                    fixedWidth
                    size="1x"
                    width="16"
                  />
                </ReadMore>
              </a>
            </Link>
          </ArticleCol>
        )
      })
    }

    return (
      <MainLayout>
        <Helmet>
          <title>{t('page-titles:news')}</title>
          <meta property="og:title" content={t('page-titles:news')} />
        </Helmet>
        <Container>
          <Row>
            <Col>
              <HeaderTexts />
            </Col>
          </Row>
          <Row>{articles}</Row>
          <Row>
            {!submitting && items.length !== 0 ? (
              <Col style={{ width: '100%', display: 'flex' }}>
                <Pagination
                  page={page}
                  pageSize={this.pageSize}
                  count={pagination['X-WP-Total']}
                  action={this.getArticles}
                />
              </Col>
            ) : null}
          </Row>
        </Container>
      </MainLayout>
    )
  }
}

const mapStateToProps = ({ blog }) => ({
  blog
})

export default connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  {
    getArticles
  }
)(withTranslation(['common', 'page-titles'])(AuthHoc(Blog)))
