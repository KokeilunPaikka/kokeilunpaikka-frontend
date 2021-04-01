// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import { MainLayout } from 'components/Layout'

import AuthHoc from 'components/AuthHoc'

import { Icon } from 'components/Icon'
import { LabelInput, Checkbox } from 'components/Input'
import { Container, Row, Col } from 'components/Layout/Grid'

import { Button as ButtonBase } from 'components/Button'
import { HeaderText } from 'components/Text'

import { getThemes, createTheme, CREATE_THEME } from 'store/actions/themes'
import {
  getLookingForOptions,
  createExperiment,
  answerQuestions,
  createExperimentAndAnswerQuestions,
  clearCreatedExperiment
} from 'store/actions/experiments'
import { getChallenges } from 'store/actions/experimentChallenges'
import { getStageQuestions } from 'store/actions/stages'

import { Form, FormRow, FormCol } from 'components/Forms'

import CreatableSelect from 'react-select/creatable'

import produce from 'immer'

import { isPast, parseISO } from 'date-fns'

import { withTranslation, Link } from 'i18n'

import Router from 'next/router'

import Helmet from 'react-helmet'

const Button = styled(ButtonBase)`
  font-size: 16px;

  padding: 8px 65px 7px;

  transition: all 250ms ease-out;
  &:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
      0 0 40px rgba(128, 128, 128, 0.1) inset;
    border-color: #dedede;
  }
`

const Background = styled.div`
  background-color: #f6f8ff;
  border-radius: 100px 0 100px 0;
  padding: 36px 18px;

  @media ${props => props.theme.breakpoints.md} {
    padding: 36px 64px;
  }
`

const Header = styled(HeaderText)``

const Breadcrumbs = styled.div`
  font-size: 16px;
  color: #787878;
  font-weight: 800;

  margin: 10px;
  text-align: center;

  span {
    color: #2d3264;
  }
`

const StepCounter = styled.span`
  font-size: 40px;
  color: #2d3264;
  font-weight: 800;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 25px;
  }

  > a {
    text-align: center;
  }

  @media ${props => props.theme.breakpoints.lg} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const Fieldset = styled.fieldset`
  border: 0;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`

const FormRow2 = styled(FormRow)`
  flex-direction: column;

  > div {
    &:last-child,
    &:first-child {
      margin: 0;
    }

    &:last-child {
      margin-top: 10px;
    }
  }

  @media ${props => props.theme.breakpoints.md} {
    flex-direction: row;

    > div {
      &:last-child {
        margin: 0 0 0 10px;
      }
      &:first-child {
      }
    }
  }
`
const NotLoggedInHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -35px;
`
const NotLoggedInHeader = styled.h1`
  color: #2d3264;
  background: none;
  font-size: 60px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 74px;
  user-select: none;
`
const FrownIcon = styled(Icon)`
  margin-left: 1rem;
  margin-bottom: 1rem;
  font-size: 96.87px;
  color: #73be9b;
`
const NotLoggedInDisclaimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: #2e2e2e;
    font-size: 15px;
    letter-spacing: 0;
    line-height: 18px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 49px;
    &:first-of-type {
      color: #2d3264;
      font-size: 30px;
      font-weight: bold;
      letter-spacing: 0;
      line-height: 41px;
      text-align: center;
      margin-top: 0;
      margin-bottom: 32px;
    }
  }
  a {
    text-align: center;
    height: 34px;
    width: 239px;
  }
`
const NotLoggedInInformation = styled.div`
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 55px;
  & > p {
    &:first-of-type {
      color: #2d3264;
      font-weight: bold;
      margin-top: 72px;
      margin-bottom: 48px;
      font-size: 30px;
      letter-spacing: 0;
      line-height: 36px;
      text-align: center;
    }
  }
`
const LoggedInInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  & > div {
    display flex;
    flex-direction: column;
    align-items: center;
    svg {
      font-size: 100px;
      color: #73be9b;
      text-align: center;
      height: 100px;
    }
    .publish-icon {
      background-color: #73be9b;
      width: 100%;
      text-align: center;
      height: 100px;
      mask: url("/static/publish.svg") no-repeat center;
      mask-size: auto 100px;
    }
    .light-bulb-icon {
      background-color: #73be9b;
      width: 100%;
      text-align: center;
      height: 100px;
      mask: url("/static/bulb.svg") no-repeat center;
      mask-size: auto 100px;
    }
    p {
      width: 262px;
      color: #2d3264;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 0;
      line-height: 26px;
      text-align: center;
    }
  }
  @media ${props => props.theme.breakpoints.md} {
    flex-direction: row;
  }
`
const InstructionsDisclaimer = styled.p`
  margin-top: 45px;
  color: #2e2e2e;
  font-size: 15px;
  letter-spacing: 0;
  line-height: 18px;
  text-align: center;
`
const maxTextLength = 900

type OwnProps = $ReadOnly<{|
  comingFromOutside: string
|}>

type Props = $ReadOnly<{|
  ...OwnProps
|}>

class NewExperiment extends Component<Props> {
  state = {
    step: 0,
    theme: [],
    fields: { name: '', description: '', questions: {} },
    options: [],
    challenges: []
  }

  timeOut = false

  static async getInitialProps() {
    return {
      namespacesRequired: [
        'common',
        'register-experiment',
        'auth',
        'page-titles'
      ]
    }
  }

  componentDidMount() {
    const {
      getLookingForOptions: getLookingForOptionsAction,
      getChallenges: getChallengesAction,
      getThemes: getThemesAction,
      getStageQuestions: getStageQuestionsAction,
      userIsAuthenticated,
      challengesOpen,
      i18n
    } = this.props

    if (userIsAuthenticated) {
      getLookingForOptionsAction()
      getChallengesAction({ page_size: 9999999 }, i18n.language)
      getThemesAction(i18n.language)
      getStageQuestionsAction(1)

      if (challengesOpen) {
        challengesOpen.forEach(({ id }) => {
          getStageQuestionsAction(1, id)
        })
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {
      userIsAuthenticated: userWasAuthenticated,
      challengesOpen: prevChallengesOpen
    } = prevProps

    const {
      userIsAuthenticated,
      challengesOpen,
      getStageQuestions: getStageQuestionsAction
    } = this.props

    if (userWasAuthenticated === false && userIsAuthenticated) {
      const {
        getLookingForOptions: getLookingForOptionsAction,
        getChallenges: getChallengesAction,
        getThemes: getThemesAction,

        i18n
      } = this.props

      getLookingForOptionsAction()
      getChallengesAction({ page_size: 9999999 }, i18n.language)
      getThemesAction(i18n.language)
      getStageQuestionsAction(1)
    }

    if (prevChallengesOpen.length === 0 && challengesOpen.length > 0) {
      challengesOpen.forEach(({ id }) => {
        getStageQuestionsAction(1, id)
      })
    }
  }

  componentWillUnmount() {
    const { clearCreatedExperiment: clearCreatedExperimentAction } = this.props
    clearCreatedExperimentAction()
  }

  getInitialProps = async () => ({
    namespacesRequired: ['common', 'auth']
  })

  handleChange = e => {
    const {
      currentTarget: { name, value }
    } = e

    this.setState(
      produce(draft => {
        draft.fields[name] = value
      })
    )
    this.setState()
  }

  handleQuestion = e => {
    const {
      currentTarget: { name, value }
    } = e

    this.setState(
      produce(draft => {
        draft.fields.questions[name] = value
      })
    )
  }

  submitForm = e => {
    e.preventDefault()
    const {
      theme,
      fields: { name, description, questions },
      options,
      challenges
    } = this.state

    const {
      createExperimentAndAnswerQuestions: createExperimentAndAnswerQuestionsAction
    } = this.props

    const experimentPayload = {
      name,
      description,
      experiment_challenge_ids: challenges,
      is_published: false,
      looking_for_ids: options,
      theme_ids: theme ? theme.map(({ value }) => value) : []
    }

    const questionsPayload = Object.entries(questions).map(
      ([questionName, value]) => ({
        question_id: questionName.split('_', 2)[1],
        value
      })
    )

    createExperimentAndAnswerQuestionsAction(
      experimentPayload,
      questionsPayload
    ).then(({ type, meta }) => {
      if (type === 'NEW_EXPERIMENT') {
        const { slug } = meta
        const url = `/kokeilu-draft/${slug}`
        this.timeOut = setTimeout(() => {
          Router.push(url)
        }, 6000)
      }
    })
  }

  getTimeLeft = timeout => {
    return Math.ceil(
      (timeout._idleStart + timeout._idleTimeout - Date.now()) / 1000 // eslint-disable-line
    )
  }

  nextForm = e => {
    e.preventDefault()
    const { step } = this.state
    this.setState({ step: step + 1 })
  }

  prevForm = () => {
    const { step } = this.state
    this.setState({ step: step - 1 })
  }

  changeTheme = value => {
    this.setState({ theme: value })
  }

  handleCreate = (inputValue: string) => {
    const { createTheme: createThemeAction } = this.props

    createThemeAction(inputValue).then(
      ({
        action: {
          type,
          payload: { id: value, name: label }
        }
      }) => {
        if (type === `${CREATE_THEME}_FULFILLED`) {
          this.setState(
            produce(draft => {
              if (!draft.theme) {
                draft.theme = []
              }
              draft.theme.push({ label, value })
            })
          )
        }
      }
    )
  }

  handleCheckbox = async e => {
    const {
      currentTarget: { name, value, checked }
    } = e

    if (checked) {
      await this.setState(
        produce(draft => {
          draft[name].push(parseInt(value, 10))
        })
      )
    } else {
      const { [name]: current } = this.state

      await this.setState({
        [name]: current.filter(option => option !== parseInt(value, 10))
      })
    }
    if (name === 'challenges') {
      const { [name]: current } = this.state
      const { getStageQuestions: getStageQuestionsAction } = this.props
      getStageQuestionsAction(1, null, current)
      getStageQuestionsAction(1, current, current)
    }
  }

  render() {
    const {
      themes: { list, isPending },
      lookingForOptions,
      challengesOpen,
      questions,
      userIsAuthenticated,
      experiments: { experimentPending, questionsPending, justCreated },
      t
    } = this.props

    const ThemeOptions = list.map(({ id: value, name: label }) => ({
      label,
      value
    }))

    const {
      step,
      theme,
      fields: { name, description, questions: questionsValues },
      options,
      challenges
    } = this.state

    let questionsForForm = null
    if ('common' in questions) {
      questionsForForm = questions.common.map(
        ({ id, question, description: fieldDescription }) => (
          <FormRow key={id}>
            <FormCol>
              <LabelInput
                key={id}
                type="textarea"
                placeholder={fieldDescription}
                label={question}
                name={`question_${id}`}
                onChange={this.handleQuestion}
                required
                value={questionsValues[`question_${id}`]}
              />
            </FormCol>
          </FormRow>
        )
      )
    }

    // If one of the selected challenges has more questions
    const challengeSelectedWithQuestions =
      Object.entries(questions).findIndex(
        ([id]) =>
          challenges.includes(parseInt(id, 10)) &&
          Object.entries(questions[id]).length > 0
      ) > -1

    const extraQuestions = []

    if (challengeSelectedWithQuestions) {
      challenges.forEach(challenge => {
        if (challenge in questions) {
          extraQuestions.push(
            questions[challenge].map(
              ({ id, question, description: fieldDescription }) => (
                <FormRow key={id}>
                  <FormCol>
                    <LabelInput
                      key={id}
                      type="textarea"
                      placeholder={fieldDescription}
                      label={question}
                      name={`question_${id}`}
                      onChange={this.handleQuestion}
                      required
                      value={questionsValues[`question_${id}`]}
                    />
                  </FormCol>
                </FormRow>
              )
            )
          )
        }
      })
    }

    const step2 = (
      <>
        <Breadcrumbs>
          {t('common:start-experiment')} /{' '}
          <span>{t('register-experiment:second-step-title')}</span> /{' '}
          {t('register-experiment:third-step-title')}
        </Breadcrumbs>

        <Background>
          <TitleContainer>
            <Header>{t('register-experiment:second-step-title')}</Header>
            <StepCounter>{step + 1}/3</StepCounter>
          </TitleContainer>
          <Form onSubmit={this.nextForm}>
            <FormRow>
              <FormCol>
                <LabelInput
                  placeholder={t(
                    'register-experiment:experiment-title-placeholder'
                  )}
                  label={t('register-experiment:experiment-title-label')}
                  name="name"
                  onChange={this.handleChange}
                  required
                  value={name}
                  maxLength={200}
                />
              </FormCol>
            </FormRow>
            <FormRow>
              <FormCol>
                <LabelInput
                  type="textarea"
                  placeholder={t(
                    'register-experiment:experiment-goal-placeholder'
                  )}
                  label={`${t('register-experiment:experiment-goal-label')}`}
                  name="description"
                  onChange={this.handleChange}
                  required
                  value={description}
                  maxLength={maxTextLength}
                />
              </FormCol>
            </FormRow>

            <FormRow>
              <FormCol>
                <ButtonContainer>
                  <Button size="medium" onClick={this.prevForm}>
                    {t('previous')}
                  </Button>
                  <Button size="medium" type="submit" as="button">
                    {t('continue')}
                  </Button>
                </ButtonContainer>
              </FormCol>
            </FormRow>
          </Form>
        </Background>
      </>
    )

    const step3 = (
      <>
        <Breadcrumbs>
          {t('common:start-experiment')} /{' '}
          {t('register-experiment:second-step-title')} /{' '}
          <span>{t('register-experiment:third-step-title')}</span>
        </Breadcrumbs>

        <Background>
          <TitleContainer>
            <Header>{t('register-experiment:third-step-title')}</Header>
            <StepCounter>{step + 1}/3</StepCounter>
          </TitleContainer>
          <Form
            onSubmit={
              challengeSelectedWithQuestions ? this.nextForm : this.submitForm
            }
          >
            {questionsForForm}

            <FormRow>
              <FormCol>
                <ButtonContainer>
                  <Button size="medium" onClick={this.prevForm}>
                    {t('previous')}
                  </Button>
                  {challengeSelectedWithQuestions ? (
                    <Button size="medium" type="submit" as="button">
                      {t('continue')}
                    </Button>
                  ) : (
                    <Button
                      size="medium"
                      type="submit"
                      as="button"
                      disabled={experimentPending || questionsPending}
                    >
                      {t('register-experiment:submit-new-experiment')}
                    </Button>
                  )}
                </ButtonContainer>
              </FormCol>
            </FormRow>
          </Form>
        </Background>
      </>
    )

    const step1 = (
      <>
        <Breadcrumbs>
          <span>{t('common:start-experiment')}</span> /{' '}
          {t('register-experiment:second-step-title')} /{' '}
          {t('register-experiment:third-step-title')}
        </Breadcrumbs>

        <Background>
          <TitleContainer>
            <Header>{t('common:start-experiment')}</Header>
            <StepCounter>{step + 1}/3</StepCounter>
          </TitleContainer>
          <Form onSubmit={this.nextForm}>
            <FormRow2>
              <FormCol>
                <LabelInput
                  label={t('register-experiment:select-themes-label')}
                  name="theme"
                >
                  {selectName => (
                    <CreatableSelect
                      placeholder={t(
                        'register-experiment:select-themes-placeholder'
                      )}
                      name={selectName}
                      isClearable
                      isMulti
                      isDisabled={isPending}
                      isLoading={isPending}
                      onChange={this.changeTheme}
                      onCreateOption={this.handleCreate}
                      options={ThemeOptions}
                      value={theme}
                      menuPortalTarget={process.browser ? document.body : null}
                      formatCreateLabel={inputVal =>
                        `${t(
                          `register-experiment:select-themes-create-new-label`
                        )} "${inputVal}"`
                      }
                    />
                  )}
                </LabelInput>
              </FormCol>
              <FormCol>
                <LabelInput
                  label={t('register-experiment:looking-for-options-label')}
                  labelOnly
                />
                <Fieldset>
                  {lookingForOptions.map(({ id, value }) => (
                    <Checkbox
                      key={value}
                      value={id}
                      label={value}
                      onChange={this.handleCheckbox}
                      name="options"
                      checked={options.some(e => e === id)}
                    />
                  ))}
                </Fieldset>
              </FormCol>
            </FormRow2>
            {challengesOpen.length > 0 && (
              <FormRow>
                <FormCol>
                  <LabelInput
                    label={t(
                      'register-experiment:experiment-challenge-select-label'
                    )}
                    labelOnly
                  />
                  <Fieldset>
                    {challengesOpen.map(({ id, name: labelName, slug }) => (
                      <Checkbox
                        key={slug}
                        value={id}
                        label={labelName}
                        onChange={this.handleCheckbox}
                        name="challenges"
                        checked={challenges.some(e => e === id)}
                      />
                    ))}
                  </Fieldset>
                </FormCol>
              </FormRow>
            )}
            <FormRow>
              <FormCol>
                <ButtonContainer>
                  <Button size="medium" type="submit" as="button">
                    {t('continue')}
                  </Button>
                </ButtonContainer>
              </FormCol>
            </FormRow>
          </Form>
        </Background>
      </>
    )

    const step4 = (
      <>
        <Breadcrumbs>
          {t('common:start-experiment')} /{' '}
          {t('register-experiment:second-step-title')} /{' '}
          {t('register-experiment:third-step-title')} /{' '}
          <span> {t('register-experiment:fourth-step-title')} </span>
        </Breadcrumbs>

        <Background>
          <TitleContainer>
            <Header>{t('register-experiment:fourth-step-title')}</Header>
            <StepCounter>{step + 1}/3</StepCounter>
          </TitleContainer>
          <Form onSubmit={this.submitForm}>
            {extraQuestions}

            <FormRow>
              <FormCol>
                <ButtonContainer>
                  <Button size="medium" onClick={this.prevForm}>
                    {t('previous')}
                  </Button>
                  <Button
                    size="medium"
                    type="submit"
                    as="button"
                    disabled={experimentPending || questionsPending}
                  >
                    {t('register-experiment:submit-new-experiment')}
                  </Button>
                </ButtonContainer>
              </FormCol>
            </FormRow>
          </Form>
        </Background>
      </>
    )

    const forms = [step1, step2, step3, step4]

    const notLoggedIn = (
      <>
        <NotLoggedInHeaderContainer>
          <NotLoggedInHeader>{t('auth:not-logged-in-title')}</NotLoggedInHeader>
          <FrownIcon icon={['far', 'frown-open']} />
        </NotLoggedInHeaderContainer>
        <NotLoggedInDisclaimerContainer>
          <p>{t('auth:not-logged-in-description')}</p>
          <Link href="/register">
            <ButtonBase>{t(`common:register`)}</ButtonBase>
          </Link>
          <p>
            {t('auth:you-can-register')} {t('auth:here')}{' '}
            {t('auth:or-use-login-form')}
          </p>
        </NotLoggedInDisclaimerContainer>
      </>
    )

    const notLoggedInInformation = (
      <>
        <NotLoggedInInformation>
          <p>{t(`auth:as-logged-in-user`)}</p>
          <LoggedInInfoContainer>
            <div>
              <div className="light-bulb-icon" />
              <p>{t('auth:apply-for-funding')}</p>
            </div>
            <div>
              <div className="publish-icon" />
              <p>{t('register-experiment:submit-new-experiments')}</p>
            </div>
            <div>
              <Icon icon={['far', 'comments']} />
              <p>{t('auth:comment-or-discuss-experiments')}</p>
            </div>
          </LoggedInInfoContainer>
        </NotLoggedInInformation>
        <InstructionsDisclaimer>
          <div
            /* eslint-disable-next-line */
            dangerouslySetInnerHTML={{
              __html: t('auth:if-you-want-to-know-more', {
                start_link: `<a href="${t(
                  'auth:instructions-url'
                )}" target="__blank">`,
                end_link: '</a>'
              })
            }}
          />
        </InstructionsDisclaimer>
      </>
    )

    const thankYou = (
      <>
        <Background>
          <TitleContainer>
            <Header>{t('register-experiment:thank-you-title')}</Header>
          </TitleContainer>
          <div>
            <p>{t('register-experiment:thank-you-created')}</p>
          </div>
        </Background>
      </>
    )

    const form = justCreated ? thankYou : forms[step]
    const content = userIsAuthenticated ? form : notLoggedIn
    return (
      <MainLayout>
        <Helmet>
          <title>{t('page-titles:new-experiment')}</title>
          <meta property="og:title" content={t('page-titles:new-experiment')} />
        </Helmet>
        <Container>
          <Row>
            <Col size={8} offset={2}>
              {content}
            </Col>
            {!userIsAuthenticated && (
              <Col size={12}>{notLoggedInInformation}</Col>
            )}
          </Row>
        </Container>
      </MainLayout>
    )
  }
}

const mapStateToProps = ({
  user,
  themes,
  experiments: {
    options,
    requests: {
      experimentWithQuestions: {
        experimentPending,
        questionsPending,
        error,
        justCreated
      }
    }
  },
  challenges: { list: challengesList },
  stages: { questions }
}) => ({
  user,
  themes,
  lookingForOptions: options,
  challenges: challengesList,
  challengesOpen: challengesList.filter(
    ({ is_active: isActive, starts_at: startsAt }) =>
      isActive && isPast(parseISO(startsAt))
  ),
  questions,
  experiments: { experimentPending, questionsPending, error, justCreated }
})

export default connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  {
    getThemes,
    createTheme,
    getChallenges,
    getLookingForOptions,
    createExperiment,
    getStageQuestions,
    answerQuestions,
    createExperimentAndAnswerQuestions,
    clearCreatedExperiment
  }
)(
  withTranslation(['common', 'register-experiment', 'auth', 'page-titles'])(
    AuthHoc(NewExperiment)
  )
)
