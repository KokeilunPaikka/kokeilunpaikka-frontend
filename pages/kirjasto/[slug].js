// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import { MainLayout } from 'components/Layout'
import { HeaderText, SubHeader } from 'components/Text'
import { Row, Col } from 'components/Layout/Grid'
import { Container } from 'components/common'
import ImageTextCard from 'components/ImageTextCard'
import Spinner from 'components/Spinner/Spinner'
import { withTranslation, i18n } from 'i18n'
import AuthHoc from 'components/AuthHoc'
import PaginationLinks from 'components/Pagination/PaginationLinks'
import { getLibraryItem } from 'store/actions/library'
import { withRouter } from 'next/router'

const ExperimentCol = styled(Col)`
  @media ${props => props.theme.breakpoints.md} {
    flex-basis: 50%;
    max-width: 50%;
  }

  @media ${props => props.theme.breakpoints.lg} {
    flex-basis: ${props => (props.size / 12) * 100}%;
    max-width: ${props => (props.size / 12) * 100}%;
    margin-left: ${props => (props.offset / 12) * 100}%;
  }
`

class LibraryItem extends Component {
  static async getInitialProps({ store, query, req }) {
    const { slug } = query
    await store.dispatch(
      getLibraryItem(slug, req ? req.language : i18n.language)
    )

    return {
      namespacesRequired: ['common', 'page-titles']
    }
  }

  render() {
    const {
      currentItem: { name, experiments, description },
      t
    } = this.props

    let items = null
    if (experiments.length === 0) {
      items = <Col style={{ marginTop: 25 }}>{t('no-results')}</Col>
    } else {
      items = experiments.map(
        ({
          id,
          slug,
          name,
          image_url: imageUrl,
          short_description: leadText,
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
            <ExperimentCol size={4} key={id} style={{ display: 'flex' }}>
              <ImageTextCard
                href={url}
                as={as}
                image={imageUrl}
                title={name}
                description={leadText}
                isPublished={isPublished}
              />
            </ExperimentCol>
          )
        }
      )
    }

    return (
      <MainLayout>
        <Container>
          <Row>
            <Col>
              <HeaderText>{name}</HeaderText>
            </Col>
          </Row>
          <Row>
            <Col>
              <SubHeader>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </SubHeader>
            </Col>
          </Row>
          <Row>{items}</Row>
        </Container>
      </MainLayout>
    )
  }
}

const mapStateToProps = (
  { library },
  {
    router: {
      query: { slug }
    }
  }
) => ({
  library,
  currentItem: library.byId[slug]
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      getLibraryItem
    }
  )(withTranslation(['common', 'page-titles'])(AuthHoc(LibraryItem)))
)
