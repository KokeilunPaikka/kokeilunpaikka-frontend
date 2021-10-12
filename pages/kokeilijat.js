// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import { MainLayout } from 'components/Layout'
import { HeaderTexts, SubHeader } from 'components/Text'
import { Row, Col } from 'components/Layout/Grid'
import { Container } from 'components/common'
import ImageTextCard from 'components/ImageTextCard'
import { getUsers } from 'store/actions/users'
import Spinner from 'components/Spinner/Spinner'
import Select from 'components/Select'
import { withTranslation, i18n } from 'i18n'
import AuthHoc from 'components/AuthHoc'
import PaginationLinks from 'components/Pagination/PaginationLinks'
import { Input } from 'components/Input'
import { Button as ButtonBase } from 'components/Button'
import { getThemes } from 'store/actions/themes'
import { getLookingForOptions } from 'store/actions/experiments'
import Helmet from 'react-helmet'

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

const Wrapper = styled.div`
  display: flex;
`

const Button = styled(ButtonBase)`
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  flex: 1 1 100%;
`

class Experimenters extends Component {
  static async getInitialProps({ store }) {
    await store.dispatch(getUsers())

    return {
      namespacesRequired: ['common', 'page-titles']
    }
  }

  state = {
    page: 1,
    submitting: false,
    fields: {
      search: null,
      theme_id: null,
      looking_for: null,
      offering: null
    }
  }

  pageSize = 99

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getThemes(i18n.language))
    const { getLookingForOptions: getLookingForOptionsAction } = this.props
    getLookingForOptionsAction()
  }

  searchUsers = page => {
    const { getUsers: getUsersAction } = this.props
    const { fields } = this.state
    this.setState({ submitting: true, page })

    const filters = { page, page_size: this.pageSize }
    if (fields.search) {
      filters.search = fields.search
    }
    if (fields.theme_id) {
      filters.theme_id = fields.theme_id
    }
    if (fields.looking_for) {
      filters.looking_for = fields.looking_for
    }
    if (fields.offering) {
      filters.offering = fields.offering
    }

    getUsersAction(filters).then(() => {
      this.setState({ submitting: false })
    })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.searchUsers(1)
    }
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

  handleSelectChange = (e, meta) => {
    const newValue = e?.value ?? null
    const { name } = meta

    const { fields } = this.state
    this.setState({
      fields: {
        ...fields,
        [name]: newValue
      }
    })
  }

  render() {
    const {
      user: { list: userItems, count },
      themes: { curated: themeItems },
      t,
      lookingForOptions
    } = this.props
    // eslint-disable-next-line
    console.log(lookingForOptions)

    const { page, submitting } = this.state

    const themeOptions = themeItems.map(item => {
      return { value: item.id, label: item.name }
    })

    const lookingForSelectOptions = lookingForOptions.map(option => {
      return { value: option.id, label: option.value }
    })

    const paginationLinks = (
      <PaginationLinks
        page={page}
        pageSize={this.pageSize}
        count={count}
        t={t}
        action={this.searchUsers}
      />
    )

    let users = null
    if (submitting) {
      users = <Spinner />
    } else if (userItems.length === 0) {
      users = <Col style={{ marginTop: 25 }}>{t('no-results')}</Col>
    } else {
      users = userItems.map(
        ({ id, full_name: fullName, image_url: imageUrl }) => {
          const href = {
            pathname: `/kokeilija/[id]`,
            query: {
              id
            }
          }
          return (
            <ExperimentCol size={4} key={id} style={{ display: 'flex' }}>
              <ImageTextCard
                href={href}
                as={`/kokeilija/${id}`}
                image={imageUrl || '/static/user-empty.png'}
                title={fullName}
                description=""
              />
            </ExperimentCol>
          )
        }
      )
    }

    return (
      <MainLayout>
        <Helmet>
          <title>{t('page-titles:experimenters')}</title>
          <meta property="og:title" content={t('page-titles:experimenters')} />
        </Helmet>
        <Container>
          <Row>
            <Col>
              <HeaderTexts />
            </Col>
          </Row>
          <Row>
            <Col>
              <SubHeader>{t('browse-experimenters')}</SubHeader>
            </Col>
          </Row>
          <SearchRow>
            <Row>
              <Col size={5}>
                <Input
                  name="search"
                  placeholder={t('search')}
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}
                />
              </Col>
              <Col size={5}>
                <Select
                  name="theme_id"
                  handleChange={this.handleSelectChange}
                  options={themeOptions}
                  selectedOptions={null}
                  placeholder={t('interested-themes')}
                />
              </Col>
              <Col size={5}>
                <Select
                  name="looking_for"
                  handleChange={this.handleSelectChange}
                  options={lookingForSelectOptions}
                  selectedOptions={null}
                  placeholder={t('users-are-looking-for')}
                />
              </Col>
              <Col size={5}>
                <Select
                  name="offering"
                  handleChange={this.handleSelectChange}
                  options={lookingForSelectOptions}
                  selectedOptions={null}
                  placeholder={t('users-are-offering')}
                />
              </Col>
              <Col size={2}>
                <Wrapper>
                  <Button onClick={() => this.searchUsers(1)}>
                    {t('search')}
                  </Button>
                </Wrapper>
              </Col>
            </Row>
          </SearchRow>
          <Row>{users}</Row>
          <Row>
            {!submitting && userItems.length !== 0 ? (
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

const mapStateToProps = ({ user, themes, experiments }) => ({
  user,
  themes,
  lookingForOptions: experiments.options
})

export default connect(
  mapStateToProps,
  {
    getUsers,
    getThemes,
    getLookingForOptions
  }
)(withTranslation(['common', 'page-titles'])(AuthHoc(Experimenters)))
