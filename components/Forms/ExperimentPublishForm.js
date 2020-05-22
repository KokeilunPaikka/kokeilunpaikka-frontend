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
import Router from 'next/router'

class ExperimentPublishForm extends Component {
  state = {
    submitting: false
  }

  submitForm = e => {
    e.preventDefault()
    const { publish } = this.props
    const {
      closeModal,
      getSingleExperiment: getSingleExperimentAction,
      partialUpdateExperiment: partialUpdateExperimentAction,
      slug
    } = this.props

    this.setState({ submitting: true })

    partialUpdateExperimentAction(slug, {
      is_published: publish
    }).then(() => {
      getSingleExperimentAction(slug).then(() => {
        this.setState({ submitting: false })
        closeModal()

        const paths = window.location.pathname.split('/')
        const path = paths[paths.length - 1]
        if (publish) {
          const url = `/kokeilu/${path}`
          Router.push(url)
        } else {
          const url = `/kokeilu-draft/${path}`
          Router.push(url)
        }
      })
    })
  }

  render() {
    const { submitting } = this.state
    const { t, publish } = this.props

    let disableField = false
    if (submitting) {
      disableField = true
    }
    return (
      <Form onSubmit={this.submitForm}>
        <h3>
          {publish
            ? t('common:publish-experiment-question')
            : t('common:hide-experiment')}
        </h3>
        {publish && <p>{t('common:publish-experiment-disclaimer')}</p>}
        <Button
          style={{ marginTop: 20 }}
          size="medium"
          type="submit"
          as="button"
          disabled={disableField}
        >
          {publish ? t('common:publish') : t('common:hide')}
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
)(withTranslation('common')(AuthHoc(ExperimentPublishForm)))
