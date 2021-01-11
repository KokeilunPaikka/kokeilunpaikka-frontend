// @flow

import { Component } from 'react'
import AuthHoc from 'components/AuthHoc'
import { withTranslation } from 'i18n'
import { Form } from 'components/Forms'
import { Button } from 'components/Button'
import { connect } from 'react-redux'
import { getSingleExperiment, answerQuestions } from 'store/actions/experiments'
import { LabelTextarea } from 'components/Input'

class ExperimentQuestion extends Component {
  state = {
    submitting: false,
    value: '',
    errors: []
  }

  componentDidMount() {
    const { questionAnswer } = this.props
    this.setState({ value: questionAnswer })
  }

  submitForm = e => {
    e.preventDefault()
    const { value } = this.state
    const {
      closeModal,
      getSingleExperiment: getSingleExperimentAction,
      answerQuestions: answerQuestionsAction,
      slug,
      questionId
    } = this.props

    this.setState({ submitting: true })

    answerQuestionsAction(slug, [
      {
        question_id: questionId,
        value
      }
    ]).then(response => {
      if (response.status) {
        this.setState({ errors: response.messages, submitting: false })
      } else {
        getSingleExperimentAction(slug).then(() => {
          this.setState({ value: '', submitting: false, errors: [] })
          closeModal()
        })
      }
    })
  }

  handleChange = e => {
    const {
      currentTarget: { value }
    } = e

    this.setState({
      value
    })
  }

  render() {
    const { submitting, errors, value } = this.state
    const { t, question, description } = this.props

    let disableField = false
    if (submitting) {
      disableField = true
    }

    return (
      <Form onSubmit={this.submitForm}>
        <h3>
          {t('common:change-answer-for')} {question}
        </h3>
        <LabelTextarea
          label={t('common:answer')}
          placeholder={description || t('common:answer-here')}
          name="value"
          onChange={this.handleChange}
          value={value}
          errors={errors[0]}
          styles={{ minHeight: 250 }}
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
    answerQuestions,
    getSingleExperiment
  }
)(withTranslation('common')(AuthHoc(ExperimentQuestion)))
