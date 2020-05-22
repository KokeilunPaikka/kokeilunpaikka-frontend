import { Col, Row } from 'components/Layout/Grid'
import { Component } from 'react'
import { Form, FormCol, FormRow } from 'components/Forms'
import { Button } from 'components/Button'
import {
  createCommentPost,
  getSingleExperiment
} from 'store/actions/experiments'

import { uploadImage } from 'store/actions/image'
import { connect } from 'react-redux'
import { LabelInput } from 'components/Input'
import { withTranslation } from 'i18n'
import dynamic from 'next/dynamic'

const CommentEditor = dynamic(
  () => import('components/Comment/CommentEditor'),
  {
    ssr: false
  }
)

class CreateCommentPostModal extends Component {
  state = {
    submitting: false,
    fields: {
      content: '',
      title: '',
      files: [],
      file1: null,
      file2: null,
      file3: null,
      file4: null,
      file5: null
    },
    errors: {}
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

  handleFile = e => {
    const { fields } = this.state
    const allFiles = fields.files
    allFiles.push(e.target.files[0])
    this.setState({
      fields: {
        ...fields,
        files: allFiles
      }
    })
  }

  submitForm = e => {
    e.preventDefault()
    const { fields } = this.state
    const {
      experimentSlug,
      createCommentPost: createCommentPostAction,
      getSingleExperiment: getSingleExperimentAction,
      uploadImage: uploadImageAction,
      closeModal
    } = this.props
    this.setState({ submitting: true })

    const imageIds = []
    const { files } = fields
    const promises = []
    files.forEach(file => {
      promises.push(
        uploadImageAction(file, file.type, file.name).then(response => {
          if (!response.status) {
            imageIds.push(response.value.id)
          }
        })
      )
    })

    Promise.all(promises).then(() => {
      const finalFields = {
        title: fields.title,
        content: fields.content.replace(/(?:\r\n|\r|\n)/g, '<br>')
      }

      if (imageIds) {
        finalFields.image_ids = imageIds
      }

      createCommentPostAction(experimentSlug, finalFields).then(response => {
        if (response.status) {
          this.setState({ submitting: false })
          this.setState({ errors: response.messages })
        } else {
          getSingleExperimentAction(experimentSlug).then(() => {
            this.setState({ fields: { content: '', title: '' } })
            this.setState({ submitting: false })
            closeModal()
          })
        }
      })
    })
  }

  render() {
    const {
      user: { isLogged },
      t
    } = this.props
    const { submitting, errors } = this.state

    let form = null
    if (isLogged) {
      let disableField = false
      if (submitting) {
        disableField = true
      }
      form = (
        <Form onSubmit={this.submitForm}>
          <FormRow>
            <FormCol>
              <LabelInput
                label={t('comment:title')}
                type="text"
                name="title"
                placeholder={t('comment:title-field-placeholder')}
                onChange={this.handleChange}
                errors={errors}
              />
            </FormCol>
          </FormRow>
          <FormRow>
            <FormCol>
              <CommentEditor name="content" onChange={this.handleChange} />
            </FormCol>
          </FormRow>
          <FormRow
            style={{
              marginTop: 0
            }}
          >
            <FormCol
              style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <Button
                size="medium"
                type="submit"
                as="button"
                disabled={disableField}
              >
                {t('comment:submit-comment')}
              </Button>
            </FormCol>
          </FormRow>
        </Form>
      )
    }

    return (
      <div>
        <Row>
          <Col size={12}>{form}</Col>
        </Row>
      </div>
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
    createCommentPost,
    getSingleExperiment
  }
)(withTranslation(['common', 'comment'])(CreateCommentPostModal))
