// @flow

import { Component } from 'react'
import AuthHoc from 'components/AuthHoc'
import { withTranslation, useTranslation } from 'i18n'
import { Form } from 'components/Forms'
import { Button } from 'components/Button'
import { connect } from 'react-redux'
import { uploadImage } from 'store/actions/image'
import {
  getSingleExperiment,
  partialUpdateExperiment
} from 'store/actions/experiments'
import { getUsers } from 'store/actions/users'

import Select from 'react-select'
import styled from 'styled-components/macro'

const Error = styled.div`
  color: red;
  margin-top: 10px;
`

class ExperimentResponsibleForm extends Component {
  state = {
    submitting: true,
    responsibles: [],
    error: null
  }

  componentDidMount() {
    const { getUsers: getUsersAction, defaultResponsibles } = this.props
    getUsersAction({ page_size: 99999999, simplified: true }).then(() => {
      this.setState({ submitting: false, responsibles: defaultResponsibles })
    })
  }

  submitForm = e => {
    e.preventDefault()
    const { responsibles } = this.state
    const {
      closeModal,
      getSingleExperiment: getSingleExperimentAction,
      partialUpdateExperiment: partialUpdateExperimentAction,
      slug,
      t
    } = this.props

    this.setState({ submitting: true })

    if (!responsibles) {
      this.setState({
        error: t('common:responsibles-must-be-set'),
        submitting: false
      })
    } else {
      const ids = []
      responsibles.forEach(responsible => {
        ids.push(responsible.value)
      })

      partialUpdateExperimentAction(slug, {
        responsible_user_ids: ids
      }).then(() => {
        getSingleExperimentAction(slug).then(() => {
          this.setState({ responsibles: [], submitting: false, error: null })
          closeModal()
        })
      })
    }
  }

  changeSelect = (value, { name }) => {
    this.setState({ [name]: value })
  }

  render() {
    const { submitting, error, responsibles } = this.state
    const { t, user, defaultResponsibles } = this.props

    let disableField = false
    if (submitting) {
      disableField = true
    }

    let options = null
    if (user.list) {
      options = user.list.map(({ id: value, full_name: label }) => {
        return {
          label,
          value
        }
      })
    }

    return (
      <Form onSubmit={this.submitForm}>
        <h3>{t('common:change-responsibles')}</h3>
        {options ? (
          <Select
            placeholder={t('common:select-responsibles')}
            name="responsibles"
            onChange={this.changeSelect}
            options={options}
            isMulti
            isSearchable
            isClearable={false}
            value={responsibles}
          />
        ) : null}
        <Error>{error}</Error>
        <Button
          style={{ marginTop: 20 }}
          size="medium"
          type="submit"
          as="button"
          disabled={disableField}
        >
          {t('common:save')}
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = ({ experiments, user, image }) => ({
  experiments,
  user,
  image
})

export default connect(
  mapStateToProps,
  {
    uploadImage,
    getSingleExperiment,
    partialUpdateExperiment,
    getUsers
  }
)(withTranslation('common')(AuthHoc(ExperimentResponsibleForm)))
