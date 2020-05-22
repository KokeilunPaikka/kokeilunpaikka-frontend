// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import { MainLayout } from 'components/Layout'
import { HeaderTexts, SubHeader } from 'components/Text'
import { Row, Col } from 'components/Layout/Grid'
import { Container } from 'components/common'
import ImageTextCard from 'components/ImageTextCard'
import Spinner from 'components/Spinner/Spinner'
import { withTranslation, i18n } from 'i18n'
import AuthHoc from 'components/AuthHoc'
import PaginationLinks from 'components/Pagination/PaginationLinks'
import { getLibraryItems } from 'store/actions/library'

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

class LibraryItems extends Component {
  static async getInitialProps({ store, req }) {
    await store.dispatch(
      getLibraryItems(
        {
          page_size: 9
        },
        req ? req.language : i18n.language
      )
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

  searchItems = page => {
    const { getLibraryItems: getLibraryItemsAction } = this.props
    this.setState({ submitting: true, page })

    getLibraryItemsAction(
      {
        page,
        page_size: this.pageSize
      },
      i18n.language
    ).then(() => {
      this.setState({ submitting: false })
    })
  }

  render() {
    const {
      library: { list: libraryItems, count },
      t
    } = this.props

    const { page, submitting } = this.state

    const paginationLinks = (
      <PaginationLinks
        page={page}
        pageSize={this.pageSize}
        count={count}
        t={t}
        action={this.searchItems}
      />
    )

    let users = null
    if (submitting) {
      users = <Spinner />
    } else if (libraryItems.length === 0) {
      users = <Col style={{ marginTop: 25 }}>{t('no-results')}</Col>
    } else {
      users = libraryItems.map(
        ({
          id,
          slug,
          name,
          image_url: imageUrl,
          lead_text: leadText,
          is_published: isPublished
        }) => {
          const href = {
            pathname: `/kirjasto/[slug]`,
            query: {
              slug
            }
          }
          return (
            <ExperimentCol size={4} key={id} style={{ display: 'flex' }}>
              <ImageTextCard
                href={href}
                as={`kirjasto/${slug}`}
                image={imageUrl}
                title={name}
                description={leadText}
                linkText={t('see-category')}
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
              <HeaderTexts />
            </Col>
          </Row>
          <Row>
            <Col>
              <SubHeader>{t('browse-library')}</SubHeader>
            </Col>
          </Row>
          <Row>{users}</Row>
          <Row>
            {!submitting && libraryItems.length !== 0 ? (
              <Col style={{ width: '100%', display: 'flex' }}>
                {paginationLinks}
              </Col>
            ) : null}
          </Row>
        </Container>
      </MainLayout>
    )
  }
}

const mapStateToProps = ({ library }) => ({
  library
})

export default connect(
  mapStateToProps,
  {
    getLibraryItems
  }
)(withTranslation(['common', 'page-titles'])(AuthHoc(LibraryItems)))
