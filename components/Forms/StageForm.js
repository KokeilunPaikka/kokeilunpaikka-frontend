// @flow

import { Component } from 'react'
import AuthHoc from 'components/AuthHoc'
import { Link, withTranslation, i18n } from 'i18n'
import { Form } from 'components/Forms'
import { Button } from 'components/Button'
import { connect } from 'react-redux'
import {
  getSingleExperiment,
  answerQuestions,
  partialUpdateExperiment
} from 'store/actions/experiments'
import { getStageQuestions } from 'store/actions/stages'
import styled from 'styled-components/macro'
import { LabelTextarea } from 'components/Input'
import cogoToast from 'cogo-toast'

const Error = styled.div`
  margin-top: 10px;
  color: red;
  padding: 10px;
`
const Disclaimer = styled.p`
  font-size: 16px;
  color: #2d3264;
  font-weight: 800;
  margin-bottom: 8px;
`

class StageForm extends Component {
  state = {
    submitting: false,
    fields: [],
    errors: [],
    commonErrors: null
  }

  componentDidMount() {
    const {
      getStageQuestions: getStageQuestionsAction,
      stageNumber,
      experimentChallenges
    } = this.props

    const promises = []
    promises.push(
      getStageQuestionsAction(
        stageNumber,
        null,
        experimentChallenges.map(e => e.id)
      )
    )

    if (experimentChallenges.length > 0) {
      experimentChallenges.forEach(challenge => {
        promises.push(getStageQuestionsAction(stageNumber, challenge.id))
      })
    }

    Promise.all(promises)
  }

  submitForm = e => {
    e.preventDefault()
    const { fields } = this.state
    const {
      closeModal,
      getSingleExperiment: getSingleExperimentAction,
      answerQuestions: answerQuestionsAction,
      partialUpdateExperiment: partialUpdateExperimentAction,
      experimentSlug,
      stageNumber,
      t
    } = this.props

    const answers = []
    // eslint-disable-next-line
    for (const [key, answer] of Object.entries(fields)) {
      answers.push({
        question_id: key.replace('value_', ''),
        value: answer
      })
    }

    this.setState({ submitting: true })

    partialUpdateExperimentAction(experimentSlug, {
      stage_number: stageNumber
    }).then(resp => {
      if (
        resp.status === 400 &&
        resp.messages &&
        'stage_number' in resp.messages
      ) {
        this.setState({
          commonErrors: [resp.messages.stage_number[0].message],
          submitting: false
        })
      } else {
        answerQuestionsAction(experimentSlug, answers).then(response => {
          if (response.status) {
            this.setState({ errors: response.messages, submitting: false })
          } else {
            getSingleExperimentAction(experimentSlug).then(() => {
              this.setState({ value: '', submitting: false, errors: [] })
              let message = t('common:stage-2-transition-success')
              if (stageNumber === 3) {
                message = t('common:stage-3-transition-success')
              }
              cogoToast.success(message)
              closeModal()
            })
          }
        })
      }
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

  render() {
    const { submitting, errors, value, commonErrors } = this.state
    const {
      t,
      stages: { questions },
      stageNumber,
      experimentChallenges
    } = this.props

    let toolPageLink = '/p/tyokalu'
    if (i18n.language === 'sv') {
      toolPageLink = '/p/verktyg'
    } else if (i18n.language === 'en') {
      toolPageLink = '/p/tools'
    }
    const keys = Object.keys(questions)

    let allQuestions = []
    keys.forEach(key => {
      const questionsArr = questions[key].map(question => {
        return (
          <div key={question.id} style={{ marginTop: 15 }}>
            <LabelTextarea
              label={question.question}
              placeholder={question.description || t('common:answer-here')}
              name={`value_${question.id}`}
              onChange={this.handleChange}
              value={value}
              errors={errors[0]}
              styles={{ minHeight: 250 }}
            />
          </div>
        )
      })
      allQuestions = allQuestions.concat(questionsArr)
    })

    let disableField = false
    if (submitting) {
      disableField = true
    }
    let disclaimer = t('common:stage-transition-disclaimer')
    if (experimentChallenges && experimentChallenges.length) {
      disclaimer = t('common:experiment-challenge-stage-disclaimer')
    }
    if (stageNumber === 3) {
      disclaimer = t('common:learn-stage-disclaimer')
    }
    return (
      <Form onSubmit={this.submitForm}>
        <Disclaimer>{disclaimer}</Disclaimer>
        {stageNumber === 2 && (
          <Link href={toolPageLink}>{t('common:stage-change-reminder')}</Link>
        )}
        {allQuestions}
        <Error>{commonErrors}</Error>
        <Button
          style={{ marginTop: 20 }}
          size="medium"
          type="submit"
          as="button"
          disabled={disableField}
        >
          {stageNumber === 2
            ? t('common:move-to-experiment-stage')
            : t('common:move-to-learn-stage')}
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = ({ experiments, stages }) => ({
  experiments,
  stages
})

export default connect(
  mapStateToProps,
  {
    answerQuestions,
    getSingleExperiment,
    getStageQuestions,
    partialUpdateExperiment
  }
)(withTranslation('common')(AuthHoc(StageForm)))
