// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MainLayout } from 'components/Layout'
import { HeaderTexts, SubHeader } from 'components/Text'
import { Row, Col } from 'components/Layout/Grid'
import { Container } from 'components/common'
import ImageTextCard from 'components/ImageTextCard'
import { getChallenges } from 'store/actions/experimentChallenges'
import { withTranslation, i18n } from 'i18n'
import AuthHoc from 'components/AuthHoc'
import Pagination from 'components/Pagination'
import Spinner from 'components/Spinner/Spinner'
import styled from 'styled-components/macro'
import Helmet from 'react-helmet'

const ChallengeCol = styled(Col)`
  display: flex;

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

type OwnProps = $ReadOnly<{|
  comingFromOutside: string
|}>

/* eslint-disable react/no-unused-prop-types */
type Props = $ReadOnly<{|
  ...OwnProps,
  getChallenges: Function,
  challenges: Object<{ list: Array<Object>, count: number }>,
  dispatch: Dispatch
|}>
/* eslint-enable react/no-unused-prop-types */

class ExperimentChallenges extends Component<Props> {
  static async getInitialProps({ store, req }) {
    await store.dispatch(
      getChallenges({ page_size: 9 }, req ? req.language : i18n.language)
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

  getChallenges = page => {
    const { getChallenges: getChallengesAction } = this.props
    this.setState({ submitting: true, page })

    const filters = {
      page,
      page_size: this.pageSize
    }

    getChallengesAction(filters, i18n.language).then(() => {
      this.setState({ submitting: false })
    })
  }

  render() {
    const {
      experimentChallenges,
      experimentChallengesCount: count,
      t,
      texts
    } = this.props

    const { page, submitting } = this.state

    const challenges = submitting ? (
      <Spinner />
    ) : (
      experimentChallenges.map(
        ({
          id,
          slug,
          name,
          lead_text: description,
          image_url: imageUrl,
          is_published: isPublished
        }) => {
          const href = {
            pathname: `/kokeiluhaku/[slug]`,
            query: {
              slug
            }
          }
          return (
            <ChallengeCol size={4} key={id}>
              <ImageTextCard
                href={href}
                as={`/kokeiluhaku/${slug}`}
                title={name}
                description={description}
                image={imageUrl}
                isPublished={isPublished}
              />
            </ChallengeCol>
          )
        }
      )
    )

    const link = 'https://kokeilunpaikka.motiva.fi/account'
    const experimentSearchHeader = (
      texts.find(txt => txt.text_type === 'experiment-search-header') || {}
    ).text_value
    return (
      <MainLayout>
        <Helmet>
          <title>{t('page-titles:experiment-searches')}</title>
          <meta
            property="og:title"
            content={t('page-titles:experiment-searches')}
          />
        </Helmet>
        <Container>
          <Row>
            <Col>
              <HeaderTexts />
            </Col>
          </Row>
          <Row>
            <Col>
              <SubHeader style={{ whiteSpace: 'pre-wrap' }}>
                {experimentSearchHeader && (
                  <>
                    {experimentSearchHeader.split('{{ ')[0]}
                    <a href={link}>
                      {experimentSearchHeader.split('{{ ')[1].split(' }}')[0]}
                    </a>
                    {experimentSearchHeader.split('{{ ')[1].split(' }}')[1]}
                  </>
                )}
              </SubHeader>
            </Col>
          </Row>
          <Row>{challenges}</Row>
          <Row>
            {!submitting && experimentChallenges ? (
              <Col style={{ width: '100%', display: 'flex' }}>
                <Pagination
                  page={page}
                  pageSize={this.pageSize}
                  count={count}
                  action={this.getChallenges}
                />
              </Col>
            ) : null}
          </Row>
        </Container>
      </MainLayout>
    )
  }
}

const mapStateToProps = ({ challenges: { list, count }, texts }) => ({
  texts: texts.texts,
  experimentChallenges: list
    .slice()
    .sort(({ is_active: x }, { is_active: y }) => {
      return Number(y) - Number(x)
    }),
  experimentChallengesCount: count
})

export default connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  {
    getChallenges
  }
)(withTranslation(['common', 'page-titles'])(AuthHoc(ExperimentChallenges)))
