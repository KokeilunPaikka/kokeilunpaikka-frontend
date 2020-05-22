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
import { LabelTextarea } from 'components/Input'

class ExperimentDescriptionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitting: false,
      description: props.description
    }
  }

  submitForm = e => {
    e.preventDefault()
    const { description } = this.state
    const {
      closeModal,
      getSingleExperiment: getSingleExperimentAction,
      partialUpdateExperiment: partialUpdateExperimentAction,
      slug
    } = this.props

    this.setState({ submitting: true })

    partialUpdateExperimentAction(slug, { description }).then(() => {
      getSingleExperimentAction(slug).then(() => {
        this.setState({ submitting: false })
        closeModal()
      })
    })
  }

  render() {
    const { submitting, description } = this.state
    const { t } = this.props
    let disableField = false
    if (submitting) {
      disableField = true
    }
    return (
      <Form onSubmit={this.submitForm}>
        <LabelTextarea
          label={t('common:edit-experiment-description')}
          value={description}
          onChange={e => this.setState({ description: e.target.value })}
          placeholder={t(
            'register-experiment:experiment-description-placeholder'
          )}
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
)(withTranslation('common')(AuthHoc(ExperimentDescriptionForm)))
