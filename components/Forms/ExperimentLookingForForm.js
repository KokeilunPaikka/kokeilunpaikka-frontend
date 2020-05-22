// @flow

import { Component } from 'react'
import AuthHoc from 'components/AuthHoc'
import { withTranslation } from 'i18n'
import { Form } from 'components/Forms'
import { Button } from 'components/Button'
import { connect } from 'react-redux'
import {
  getSingleExperiment,
  partialUpdateExperiment,
  getLookingForOptions
} from 'store/actions/experiments'
import { Checkbox } from 'components/Input'

class ExperimentLookingForForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitting: false,
      lookingFor: props.lookingFor
    }
  }

  componentDidMount() {
    const { getLookingForOptions: getLookingForOptionsAction } = this.props
    getLookingForOptionsAction()
  }

  submitForm = e => {
    e.preventDefault()
    const { lookingFor } = this.state
    const {
      closeModal,
      getSingleExperiment: getSingleExperimentAction,
      partialUpdateExperiment: partialUpdateExperimentAction,
      slug
    } = this.props

    this.setState({ submitting: true })

    partialUpdateExperimentAction(slug, {
      looking_for_ids: lookingFor.map(l => l.id)
    }).then(() => {
      getSingleExperimentAction(slug).then(() => {
        this.setState({ submitting: false })
        closeModal()
      })
    })
  }

  handleCheckbox = (e, obj) => {
    if (e.target.checked) {
      const { lookingFor } = this.state
      const newLookingFor = [...lookingFor, obj]
      this.setState({ lookingFor: newLookingFor })
    } else {
      const { lookingFor } = this.state
      const newLookingFor = lookingFor.filter(l => l.id !== obj.id)
      this.setState({ lookingFor: newLookingFor })
    }
  }

  render() {
    const { submitting, lookingFor } = this.state
    const { t, lookingForOptions } = this.props
    let disableField = false
    if (submitting) {
      disableField = true
    }
    return (
      <Form onSubmit={this.submitForm}>
        {lookingForOptions.map(obj => (
          <Checkbox
            key={obj.value}
            value={obj.id}
            label={obj.value}
            onChange={e => this.handleCheckbox(e, obj)}
            name="options"
            checked={lookingFor.some(e => e.id === obj.id)}
          />
        ))}
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
  image,
  lookingForOptions: experiments.options
})

export default connect(
  mapStateToProps,
  {
    getSingleExperiment,
    partialUpdateExperiment,
    getLookingForOptions
  }
)(withTranslation('common')(AuthHoc(ExperimentLookingForForm)))
