// @flow

import { Component } from 'react'
import AuthHoc from 'components/AuthHoc'
import { withTranslation } from 'i18n'
import { Form } from 'components/Forms'
import { Button } from 'components/Button'
import { connect } from 'react-redux'
import {
  getSingleExperiment,
  partialUpdateExperiment
} from 'store/actions/experiments'
import { LabelInput } from 'components/Input'

class ExperimentTitleForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitting: false,
      name: props.name
    }
  }

  submitForm = e => {
    e.preventDefault()
    const { name } = this.state
    const {
      closeModal,
      getSingleExperiment: getSingleExperimentAction,
      partialUpdateExperiment: partialUpdateExperimentAction,
      slug
    } = this.props

    this.setState({ submitting: true })

    partialUpdateExperimentAction(slug, { name }).then(() => {
      getSingleExperimentAction(slug).then(() => {
        this.setState({ submitting: false })
        closeModal()
      })
    })
  }

  render() {
    const { submitting, name } = this.state
    const { t } = this.props
    let disableField = false
    if (submitting) {
      disableField = true
    }
    return (
      <Form onSubmit={this.submitForm}>
        <LabelInput
          label={t('common:edit-experiment-title')}
          value={name}
          onChange={e => this.setState({ name: e.target.value })}
          placeholder={t('register-experiment:experiment-title-placeholder')}
        />
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

const mapStateToProps = ({ experiments, image }) => ({
  experiments,
  image
})

export default connect(
  mapStateToProps,
  {
    getSingleExperiment,
    partialUpdateExperiment
  }
)(withTranslation('common')(AuthHoc(ExperimentTitleForm)))
