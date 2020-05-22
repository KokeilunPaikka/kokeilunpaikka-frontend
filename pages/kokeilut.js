// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import { MainLayout } from 'components/Layout'
import { HeaderTexts, SubHeader } from 'components/Text'
import { Input } from 'components/Input'
import Select from 'components/Select'
import { Row, Col } from 'components/Layout/Grid'
import { Container } from 'components/common'
import { Button as ButtonBase } from 'components/Button'
import ImageTextCard from 'components/ImageTextCard'
import { getExperiments } from 'store/actions/experiments'
import { getThemes } from 'store/actions/themes'
import Spinner from 'components/Spinner/Spinner'
import { withTranslation, i18n } from 'i18n'
import AuthHoc from 'components/AuthHoc'
import Pagination from 'components/Pagination'
import Helmet from 'react-helmet'

const Button = styled(ButtonBase)`
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  flex: 1 1 100%;
`

const Wrapper = styled.div`
  display: flex;
`

const SearchRow = styled.div`
  > div {
    display: block;
    > div {
      width: 100%;
      max-width: 100%;
      margin-bottom: 15px;
    }
  }

  @media ${props => props.theme.breakpoints.lg} {
    > div {
      display: flex;
      > div {
        max-width: 41.6666%;
      }
    }
  }
`

const Disclaimer = styled.div`
  border-radius: 30px 0 30px 0;
  background-color: #eaedf8;
  width: 100%;
  padding: 20px;
  margin-bottom: -30px;
  margin-top: 20px;
  text-align: center;
  span {
    color: #09195b;
    font-size: 18px;
    letter-spacing: 0;
    line-height: 28px;
  }
`

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

type OwnProps = $ReadOnly<{|
  comingFromOutside: string
|}>

/* eslint-disable react/no-unused-prop-types */
type Props = $ReadOnly<{|
  getThemes: Function,
  getExperiments: Function,
  challenges: Object<{ list: Array<Object>, count: number }>,
  dispatch: Dispatch
|}>
/* eslint-enable react/no-unused-prop-types */

class Experiments extends Component<Props> {
  static async getInitialProps({ store, req }) {
    await store.dispatch(getThemes(req ? req.language : i18n.language))
    await store.dispatch(getExperiments())

    return {
      namespacesRequired: ['common', 'page-titles']
    }
  }

  state = {
    fields: {
      search: null,
      theme_ids: null
    },
    page: 1,
    submitting: true,
    firstLoad: true
  }

  pageSize = 9

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getThemes(i18n.language))
    dispatch(getExperiments({ first_load: true })).then(() => {
      this.setState({ submitting: false })
    })
  }

  handleChange = e => {
    const {
      currentTarget: { name, value }
    } = e

    const { fields } = this.state

    this.setState({
      fields: {
        ...fields,
        [name]: value
      }
    })
  }

  handleSelectChange = e => {
    let newValue = null
    if (e != null) {
      const { value } = e
      newValue = value
    }

    const { fields } = this.state
    this.setState({
      fields: {
        ...fields,
        theme_ids: newValue
      }
    })
  }

  searchExperiments = (page, setFirstLoad = false) => {
    const { getExperiments: getExperimentsAction } = this.props
    const { fields } = this.state
    this.setState({ submitting: true, page })
    if (setFirstLoad) {
      this.setState({ firstLoad: false })
    }
    const filters = {}
    if (fields.search) {
      filters.search = fields.search
    }
    if (fields.theme_ids) {
      filters.theme_ids = fields.theme_ids
    }
    const { firstLoad } = this.state
    filters.page = page
    filters.page_size = this.pageSize
    filters.first_load = firstLoad && !setFirstLoad

    getExperimentsAction(filters).then(() => {
      this.setState({ submitting: false })
    })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.searchExperiments(1)
    }
  }

  render() {
    const {
      experiments: { list: expirementItems, count },
      themes: { curated: themeItems },
      t,
      user: {
        isLogged,
        user: { interested_in_themes: interestedThemes }
      }
    } = this.props

    const { page, submitting, firstLoad } = this.state

    const themeOptions = themeItems.map(item => {
      return { value: item.id, label: item.name }
    })

    let experiments = null
    if (submitting) {
      experiments = <Spinner />
    } else if (expirementItems.length === 0) {
      experiments = <Col style={{ marginTop: 50 }}>{t('no-results')}</Col>
    } else {
      experiments = expirementItems.map(
        ({
          id,
          slug,
          image_url: imageUrl,
          name,
          short_description: description,
          stage: { stage_number: stage },
          is_published: isPublished,
          themes
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
                description={description}
                stage={stage}
                isPublished={isPublished}
                themes={themes}
              />
            </ExperimentCol>
          )
        }
      )
    }

    return (
      <MainLayout>
        <Helmet>
          <title>{t('page-titles:experiments')}</title>
          <meta property="og:title" content={t('page-titles:experiments')} />
        </Helmet>
        <Container>
          <Row>
            <Col>
              <HeaderTexts />
            </Col>
          </Row>
          <Row>
            <Col>
              <SubHeader>{t('browse-experiments')}</SubHeader>
            </Col>
          </Row>
          <SearchRow>
            <Row>
              <Col size={5}>
                <Input
                  name="search"
                  placeholder={t('search-experiment')}
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}
                />
              </Col>
              <Col size={5}>
                <Select
                  name="theme_ids"
                  handleChange={this.handleSelectChange}
                  options={themeOptions}
                  selectedOptions={null}
                  placeholder={t('choose-theme')}
                />
              </Col>
              <Col size={2}>
                <Wrapper>
                  <Button onClick={() => this.searchExperiments(1, true)}>
                    {t('search')}
                  </Button>
                </Wrapper>
              </Col>
            </Row>
          </SearchRow>
          {!submitting &&
          firstLoad &&
          isLogged &&
          interestedThemes &&
          interestedThemes.length ? (
            <Row>
              <Disclaimer>
                <span>{t('common:experiment-search-disclaimer')}</span>
              </Disclaimer>
            </Row>
          ) : null}
          {!submitting &&
          firstLoad &&
          isLogged &&
          interestedThemes &&
          !interestedThemes.length ? (
            <Row>
              <Disclaimer>
                <span>
                  {t('common:experiment-search-disclaimer-no-interests')}
                </span>
              </Disclaimer>
            </Row>
          ) : null}
          {!submitting && firstLoad && !isLogged ? (
            <Row>
              <Disclaimer>
                <span>
                  {t('common:experiment-search-disclaimer-not-logged-in')}
                </span>
              </Disclaimer>
            </Row>
          ) : null}
          <Row>{experiments}</Row>
          <Row>
            {!submitting && expirementItems.length !== 0 ? (
              <Col style={{ width: '100%', display: 'flex' }}>
                <Pagination
                  page={page}
                  pageSize={this.pageSize}
                  count={count}
                  action={this.searchExperiments}
                />
              </Col>
            ) : null}
          </Row>
        </Container>
      </MainLayout>
    )
  }
}

const mapStateToProps = ({ experiments, themes, user }) => ({
  experiments,
  themes,
  user
})

export default connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  {
    getExperiments,
    getThemes
  }
)(withTranslation('common')(AuthHoc(Experiments)))
