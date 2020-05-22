// @flow

import { Component } from 'react'
import AuthHoc from 'components/AuthHoc'
import { withTranslation } from 'i18n'
import { Form } from 'components/Forms'
import { Button } from 'components/Button'
import { connect } from 'react-redux'
import { uploadImage } from 'store/actions/image'
import {
  getSingleExperiment,
  partialUpdateExperiment
} from 'store/actions/experiments'
import styled from 'styled-components/macro'

const Error = styled.div`
  color: red;
  margin-top: 10px;
`

class ExperimentImageForm extends Component {
  state = {
    submitting: false,
    fields: {
      file: null
    },
    error: null
  }

  handleFile = e => {
    const { fields } = this.state
    this.setState({
      fields: {
        ...fields,
        file: e.target.files[0]
      }
    })
  }

  submitForm = e => {
    e.preventDefault()
    const { fields } = this.state
    const {
      uploadImage: uploadImageAction,
      closeModal,
      getSingleExperiment: getSingleExperimentAction,
      partialUpdateExperiment: partialUpdateExperimentAction,
      slug,
      t
    } = this.props

    this.setState({ submitting: true })

    const { file } = fields
    if (!file) {
      this.setState({ error: t('common:file-must-be-set') })
      this.setState({ submitting: false })
    } else {
      uploadImageAction(file, file.type, file.name).then(response => {
        if (!response.status) {
          partialUpdateExperimentAction(slug, {
            image_id: response.value.id
          }).then(() => {
            getSingleExperimentAction(slug).then(() => {
              this.setState({ fields: { file: null } })
              this.setState({ submitting: false })
              this.setState({ error: null })
              closeModal()
            })
          })
        }
      })
    }
  }

  render() {
    const { submitting, error } = this.state
    const { t } = this.props

    let disableField = false
    if (submitting) {
      disableField = true
    }
    return (
      <Form onSubmit={this.submitForm}>
        <h3>{t('common:change-image')}</h3>
        <input type="file" name="file" onChange={this.handleFile} />
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

const mapStateToProps = ({ experiments, image }) => ({
  experiments,
  image
})

export default connect(
  mapStateToProps,
  {
    uploadImage,
    getSingleExperiment,
    partialUpdateExperiment
  }
)(withTranslation('common')(AuthHoc(ExperimentImageForm)))
