// @flow

import { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import { MainLayout } from 'components/Layout'
import { HeaderText } from 'components/Text'
import { Row, Col } from 'components/Layout/Grid'
import { Container } from 'components/common'
import { Button as ButtonBase } from 'components/Button'
import { withRouter } from 'next/router'
import { getSingleExperiment } from 'store/actions/experiments'
import { StageWithText } from 'components/Stage'
import { RoundedImage } from 'components/Image'
import Post from 'components/Comment/Post'
import AuthHoc from 'components/AuthHoc'
import { StyledModal } from 'components/Modals'
import CreateCommentPostModal from 'components/Comment/CreateCommentPostModal'
import { withTranslation, Link } from 'i18n'
import LookingForList from 'components/LookingFor/LookingForList'
import { format } from 'date-fns'
import {
  ExperimentDescriptionForm,
  ExperimentImageForm,
  ExperimentResponsibleForm,
  ExperimentQuestionForm,
  ExperimentPublishForm,
  ExperimentTitleForm,
  ExperimentLookingForForm,
  ExperimentThemeForm,
  StageForm
} from 'components/Forms'

import Icon from 'components/Icon/Icon'
import anchorme from 'anchorme'
import xss from 'xss'

import Helmet from 'react-helmet'

const Background = styled.div`
  border-radius: 100px 0 100px 0;
  background-color: #f6f8ff;
  padding-bottom: 50px;
`

const StudyBackground = styled.div`
  border-radius: 100px 0 100px 0;
  background-color: #96d2eb;
  padding: 50px 20px;
  margin-top: 100px;

  color: #2d3264;
  h2 {
    color: white;
  }

  @media ${props => props.theme.breakpoints.md} {
    padding: 50px;
  }
`

const Name = styled(HeaderText)`
  margin: 50px 0 10px;
  background-position: 100% 90%;
  display: inline;

  @media ${props => props.theme.breakpoints.md} {
    margin: 15px 0 10px;
  }
`

const CustomCol = styled(Col)`
  padding: 0;
  order: 2;
  margin-top: 25px;

  @media ${props => props.theme.breakpoints.md} {
    order: 1;
    margin-top: 0;
  }

  img {
    @media ${props => props.theme.breakpoints.md} {
      height: auto;
    }
  }
`

const ContentCol = styled(Col)`
  order: 1;
  @media ${props => props.theme.breakpoints.md} {
    padding-right: 50px;
    order: 2;
  }

  > h1 {
    font-size: 32px;

    @media ${props => props.theme.breakpoints.md} {
      font-size: 40px;
    }
  }
`

const StudyTitle = styled.h2`
  font-size: 32px;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 60px;
  }
`

const Question = styled.div`
  h2 {
    font-size: 30px;
    color: #2d3264;
    font-weight: 800;
  }

  div,
  p {
    font-size: 14px;
    color: #4a4a4a;
    font-weight: 300;
  }
`

const CommentContainer = styled.div`
  max-width: 945px;
  margin: 0 auto;
`

const CommentHeader = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 32px;
  line-height: 36px;
  margin-top: 50px;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 40px;
    line-height: 48px;
  }
`

const CreatedTime = styled.div`
  font-size: 14px;
  font-weight: 300;
  padding: 20px;

  > div {
    border-top: 1px solid #e0e0e0;
    padding-top: 20px;
  }
`

const AuthorImage = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;

  img {
    margin-right: 10px;
    border-radius: 50px;
    max-width: 65px;
  }
`
const AuthorName = styled.div`
  a {
    margin-left: ${props => (props.hasProfilePic ? '0' : '15px')};
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`
const OrganizerName = styled.div`
  p {
    color: ${props => props.theme.colors.primary};
    margin: 20px;
    font-weight: bold;
  }
`

const EditLink = styled.div`
  font-size: 14px;
  font-weight: 300;

  &:hover {
    cursor: pointer;
  }
`

const EditResponsible = styled.div`
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-bottom: 20px;
  color: ${props => props.theme.colors.primary};

  &:hover {
    cursor: pointer;
  }
`

const NextStage = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  margin: 20px;
  padding: 10px 15px;
  border-radius: 25px;
  text-align: center;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`
const StageModal = styled(StyledModal)`
  overflow: auto;
`

const ExperimentResponsibleModal = styled(StyledModal)`
  overflow: visible;
`

const UploadRoundedImage = styled(RoundedImage)`
  padding: 0;
  @media ${props => props.theme.breakpoints.xl} {
    padding: 0 15px;
  }

  &:hover {
    cursor: pointer;
  }
`

const PublishButton = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  margin-top: 47px;
  margin-bottom: 18px;
  font-size: 20px;
  width: 282px;
  padding: 20px 30px;
  border-radius: 32px;
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-left: 17px;
  }

  &:hover {
    cursor: pointer;
  }
`

const Description = styled.div`
  h2 {
    font-size: 30px;
    color: #2d3264;
    font-weight: 800;
  }

  p {
    font-size: 20px;
    color: #4a4a4a;
    font-weight: 300;
    margin: 5% 0;
    text-align: left;
  }
`

const ExperimentStatus = styled.div`
  color: ${props => props.theme.colors.primary};
  margin: 20px;
  font-weight: bold;
`

const MasonryContainer = styled.div`
  @media ${props => props.theme.breakpoints.md} {
    column-count: 2;
    column-gap: 60px;
    column-fill: auto;
  }
`
const EditIcon = styled(Icon)`
  cursor: pointer;
`
const ThemeContainer = styled.div`
  border-top: 1px solid #e0e0e0;
  margin: 20px 20px 0 20px;
  max-width: calc(100% - 40px);
  .edit-theme {
    margin-top: 15px;
    margin-bottom: 0;
  }
  div:not(.edit-theme) {
    display: flex;
    flex-wrap: wrap;
  }
  p {
    color: ${props => props.theme.colors.primary};
    margin: 20px 20px 20px 0;
    font-weight: bold;
  }
  span {
    background-color: #2d3264;
    color: white;
    margin: 5px 5px 5px 0;
    padding: 10px 15px;
    border-radius: 25px;
    text-align: center;
    font-weight: bold;
  }
`
const Views = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
`

class Experiment extends Component {
  state = {
    modal: false,
    imageModal: false,
    responsibleModal: false,
    stageModal: false,
    hideModal: false,
    publishModal: false,
    titleModal: false,
    descriptionModal: false,
    lookingForModal: false,
    questionModal: [],
    fields: {
      file: null
    }
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

  openQuestionModal = id => {
    const { questionModal } = this.state
    const questionModalArr = questionModal
    questionModalArr[id] = true
    this.setState({ questionModal: questionModalArr })
  }

  openTitleModal = () => {
    this.setState({ titleModal: true })
  }

  closeTitleModal = () => {
    this.setState({ titleModal: false })
  }

  openDescriptionModal = () => {
    this.setState({ descriptionModal: true })
  }

  openThemeModal = () => {
    this.setState({ themeModal: true })
  }

  closeThemeModal = () => {
    this.setState({ themeModal: false })
  }

  closeDescriptionModal = () => {
    this.setState({ descriptionModal: false })
  }

  openLookingForModal = () => {
    this.setState({ lookingForModal: true })
  }

  closeLookingForModal = () => {
    this.setState({ lookingForModal: false })
  }

  closeQuestionModal = () => {
    this.setState({ questionModal: [] })
  }

  openStageModal = () => {
    this.setState({ stageModal: true })
  }

  closeStageModal = () => {
    this.setState({ stageModal: false })
  }

  openResponsibleModal = () => {
    this.setState({ responsibleModal: true })
  }

  closeResponsibleModal = () => {
    this.setState({ responsibleModal: false })
  }

  openImageModal = () => {
    this.setState({ imageModal: true })
  }

  closeImageModal = () => {
    this.setState({ imageModal: false })
  }

  openModal = () => {
    this.setState({ modal: true })
  }

  closeModal = () => {
    this.setState({ modal: false })
  }

  openHideModal = () => {
    this.setState({ hideModal: true })
  }

  closeHideModal = () => {
    this.setState({ hideModal: false })
  }

  openPublishModal = () => {
    this.setState({ publishModal: true })
  }

  closePublishModal = () => {
    this.setState({ publishModal: false })
  }

  render() {
    const {
      currentExperiment: {
        image_url: imageUrl,
        stage,
        name,
        description,
        question_answers: questionAnswers,
        posts,
        slug,
        responsible_users: responsibleUsers,
        looking_for: lookingFor,
        published_at: publishedAt,
        experiment_challenges: experimentChallenges,
        is_published: isPublished,
        themes,
        organizer,
        views
      },
      user: {
        isLogged,
        user: { id: userId }
      },
      t
    } = this.props

    const {
      modal,
      imageModal,
      responsibleModal,
      questionModal,
      stageModal,
      hideModal,
      publishModal,
      titleModal,
      descriptionModal,
      lookingForModal,
      themeModal
    } = this.state

    const me = responsibleUsers.filter(el => {
      return el.id === userId
    })

    const isExperimentOwner = isLogged && me.length > 0

    const RenderHTML = props => (
      // Backend wants us to render html
      // eslint-disable-next-line
      <p
        style={{
          whiteSpace: 'pre-wrap'
        }}
        dangerouslySetInnerHTML={{ __html: xss(anchorme(props.HTML)) }}
      />
    )

    const stage1Questions = questionAnswers
      .filter(({ stage_id: id }) => id === 1)
      .map(
        ({
          id,
          value: answer,
          question,
          question_id: questionId,
          description: questionDescription
        }) => (
          <Question key={id}>
            <h2>{question}</h2>
            <RenderHTML
              HTML={answer}
              style={{
                lineHeight: '18px',
                whiteSpace: 'pre-wrap',
                fontSize: 14,
                color: '#4A4A4A',
                fontWeight: 300,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            />
            {isLogged && me.length > 0 ? (
              <EditLink
                style={{ marginTop: 20 }}
                onClick={() => this.openQuestionModal(questionId)}
              >
                {t('common:edit-answer')}
                <Icon
                  icon={['fa', 'pencil-alt']}
                  fixedWidth
                  size="1x"
                  width="16"
                />
              </EditLink>
            ) : null}

            <StyledModal
              isOpen={questionModal[questionId]}
              onRequestClose={this.closeQuestionModal}
            >
              <ExperimentQuestionForm
                questionId={questionId}
                description={questionDescription}
                question={question}
                questionAnswer={answer}
                slug={slug}
                closeModal={this.closeQuestionModal}
              />
            </StyledModal>
          </Question>
        )
      )

    const stage2Questions = questionAnswers
      .filter(({ stage_id: id }) => id === 2)
      .map(
        ({
          id,
          value: answer,
          question,
          question_id: questionId,
          description: questionDescription
        }) => (
          <Question key={id}>
            <h2>{question}</h2>
            <RenderHTML
              HTML={answer}
              style={{
                lineHeight: '18px',
                whiteSpace: 'pre-wrap',
                fontSize: 14,
                color: '#4A4A4A',
                fontWeight: 300,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {isLogged && me.length > 0 ? (
                <EditLink
                  style={{ marginTop: 20 }}
                  onClick={() => this.openQuestionModal(questionId)}
                >
                  {t('common:edit-answer')}
                  <Icon
                    icon={['fa', 'pencil-alt']}
                    fixedWidth
                    size="1x"
                    width="16"
                  />
                </EditLink>
              ) : null}
            </RenderHTML>
            <StyledModal
              isOpen={questionModal[questionId]}
              onRequestClose={this.closeQuestionModal}
            >
              <ExperimentQuestionForm
                description={questionDescription}
                questionId={questionId}
                question={question}
                questionAnswer={answer}
                slug={slug}
                closeModal={this.closeQuestionModal}
              />
            </StyledModal>
          </Question>
        )
      )

    const stage3 = questionAnswers.filter(({ stage_id: id }) => id === 3)
    const stage3Questions = stage3.map(
      ({
        id,
        value: answer,
        question,
        question_id: questionId,
        description: questionDescription
      }) => (
        <div key={id} style={{ display: 'inline-block' }}>
          <h2>{question}</h2>
          <RenderHTML
            HTML={answer}
            style={{
              lineHeight: '18px',
              whiteSpace: 'pre-wrap',
              fontSize: 14,
              color: '#4A4A4A',
              fontWeight: 300,
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          />
          {isLogged && me.length > 0 ? (
            <EditLink
              style={{ marginTop: 20 }}
              onClick={() => this.openQuestionModal(questionId)}
            >
              {t('common:edit-answer')}
              <Icon
                icon={['fa', 'pencil-alt']}
                fixedWidth
                size="1x"
                width="16"
              />
            </EditLink>
          ) : null}
          <StyledModal
            isOpen={questionModal[questionId]}
            onRequestClose={this.closeQuestionModal}
          >
            <ExperimentQuestionForm
              description={questionDescription}
              questionId={questionId}
              question={question}
              questionAnswer={answer}
              slug={slug}
              closeModal={this.closeQuestionModal}
            />
          </StyledModal>
        </div>
      )
    )

    const experimentPosts = posts.map(post => {
      return <Post key={post.id} post={post} experimentSlug={slug} />
    })

    const defaultResponsibles = []
    const responsibles = responsibleUsers.map(responsible => {
      let image = null
      if (responsible.image_url) {
        image = (
          <div>
            <AuthorImage>
              <img alt={responsible.full_name} src={responsible.image_url} />
            </AuthorImage>
          </div>
        )
      }

      defaultResponsibles.push({
        label: responsible.full_name,
        value: responsible.id
      })

      return (
        <div>
          <div
            key={responsible.full_name}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px 5px'
            }}
          >
            {image}
            <AuthorName hasProfilePic={!!image}>
              <Link
                href={{
                  pathname: '/kokeilija/[id]',
                  query: {
                    id: responsible.id
                  }
                }}
                as={`/kokeilija/${responsible.id}`}
              >
                <a>{responsible.full_name}</a>
              </Link>
            </AuthorName>
          </div>
          <OrganizerName>{organizer ? <p>{organizer}</p> : null}</OrganizerName>
        </div>
      )
    })

    let statusText = null
    let publishButton = null
    if (isLogged && me.length > 0) {
      if (isPublished) {
        statusText = (
          <div>
            <ExperimentStatus>
              {t('common:status')}:{' '}
              {isPublished ? t('common:published') : t('common:draft')}
            </ExperimentStatus>
          </div>
        )
        publishButton = (
          <div>
            <PublishButton onClick={this.openHideModal}>
              {t('common:hide-experiment')}
            </PublishButton>
            <StyledModal
              isOpen={hideModal}
              onRequestClose={this.closeHideModal}
            >
              <ExperimentPublishForm
                publish={false}
                slug={slug}
                closeModal={this.closeHideModal}
              />
            </StyledModal>
          </div>
        )
      } else {
        statusText = (
          <div>
            <ExperimentStatus>
              {t('common:status')}:{' '}
              {isPublished ? t('common:published') : t('common:draft')}
            </ExperimentStatus>
          </div>
        )
        publishButton = (
          <div>
            <PublishButton onClick={this.openPublishModal}>
              {t('common:publish-experiment')}{' '}
              <img alt="Publish" src="/static/publish.svg" />
            </PublishButton>
            <StyledModal
              isOpen={publishModal}
              onRequestClose={this.closePublishModal}
            >
              <ExperimentPublishForm
                publish
                slug={slug}
                closeModal={this.closePublishModal}
              />
            </StyledModal>
          </div>
        )
      }
    }

    return (
      <MainLayout>
        <Helmet>
          <title>{name}</title>
          <meta property="og:title" content={name} />
          <meta property="og:description" content={description} />
          <meta
            property="og:image"
            content={imageUrl || '/static/upload-img.png'}
          />
        </Helmet>
        <Container>
          <Background>
            <Row>
              <CustomCol size={4}>
                <UploadRoundedImage
                  src={imageUrl || '/static/upload-img.png'}
                  alt=""
                  onClick={isExperimentOwner ? this.openImageModal : null}
                />
                <div style={{ margin: '0 20px' }}>
                  {isLogged && me.length > 0 ? (
                    <EditLink
                      style={{ marginTop: 20, marginLeft: 20 }}
                      onClick={this.openImageModal}
                    >
                      {t('common:edit-image')}
                      <Icon
                        icon={['fa', 'pencil-alt']}
                        fixedWidth
                        size="1x"
                        width="16"
                      />
                    </EditLink>
                  ) : null}
                  <StageWithText stage={stage} />
                  <LookingForList lookingFor={lookingFor} />
                  {isLogged && me.length > 0 ? (
                    <EditLink
                      onClick={this.openLookingForModal}
                      style={{ marginLeft: 20 }}
                    >
                      {t('common:edit-experiment-looking-for')}{' '}
                      <EditIcon icon={['fa', 'pencil-alt']} />
                    </EditLink>
                  ) : null}
                  {stage.stage_number === 1 || stage.stage_number === 2 ? (
                    <div>
                      {isLogged && me.length > 0 ? (
                        <NextStage onClick={this.openStageModal}>
                          {stage.stage_number === 1
                            ? t('common:move-to-experiment-stage')
                            : t('common:move-to-learn-stage')}
                        </NextStage>
                      ) : null}
                      <StageModal
                        isOpen={stageModal}
                        onRequestClose={this.closeStageModal}
                      >
                        <StageForm
                          experimentSlug={slug}
                          closeModal={this.closeStageModal}
                          stageNumber={stage.stage_number + 1}
                          experimentChallenges={experimentChallenges}
                        />
                      </StageModal>
                    </div>
                  ) : null}
                  <ThemeContainer>
                    <p>{t('common:experiment-themes')}</p>
                    <div>
                      {themes.map(th => (
                        <span key={th.id}>{th.name}</span>
                      ))}
                    </div>
                    {isLogged && me.length > 0 ? (
                      <EditLink
                        className="edit-theme"
                        onClick={this.openThemeModal}
                      >
                        {t('common:edit-experiment-theme')}{' '}
                        <EditIcon icon={['fa', 'pencil-alt']} />
                      </EditLink>
                    ) : null}
                  </ThemeContainer>

                  {isPublished ? (
                    <CreatedTime>
                      <div>
                        <Views>
                          {views} {t('common:views')}
                        </Views>
                        {t('common:experiment-created')}{' '}
                        {format(new Date(publishedAt), 'dd.MM.yyyy')}
                      </div>
                    </CreatedTime>
                  ) : null}

                  {responsibles}
                  {isLogged && me.length > 0 ? (
                    <EditResponsible onClick={this.openResponsibleModal}>
                      <div
                        style={{
                          background: '#E0E0E0',
                          borderRadius: 50,
                          padding: '8px 3px',
                          marginRight: 10
                        }}
                      >
                        <Icon
                          icon={['fa', 'plus']}
                          fixedWidth
                          size="3x"
                          width="16"
                        />
                      </div>
                      {t('common:add-new-responsible')}
                    </EditResponsible>
                  ) : null}
                  {statusText}
                </div>
              </CustomCol>
              <ContentCol size={8}>
                {publishButton}
                <Name>{name}</Name>
                {isLogged && me.length > 0 ? (
                  <EditLink onClick={this.openTitleModal}>
                    {t('common:edit-experiment-title')}{' '}
                    <EditIcon icon={['fa', 'pencil-alt']} />
                  </EditLink>
                ) : null}
                <Description>
                  <p>{description}</p>
                  {isLogged && me.length > 0 ? (
                    <EditLink onClick={this.openDescriptionModal}>
                      {t('common:edit-experiment-description')}{' '}
                      <EditIcon icon={['fa', 'pencil-alt']} />
                    </EditLink>
                  ) : null}
                </Description>
                {stage1Questions}
                {stage2Questions}
              </ContentCol>
            </Row>
          </Background>
        </Container>
        {stage3.length > 0 ? (
          <Container>
            <StudyBackground>
              <Row>
                <Col>
                  <StudyTitle>{t('common:learned-from-experiment')}</StudyTitle>
                </Col>
              </Row>
              <Row>
                <Col>
                  <MasonryContainer>{stage3Questions}</MasonryContainer>
                </Col>
              </Row>
            </StudyBackground>
          </Container>
        ) : null}
        <CommentContainer>
          {posts.length > 0 ? (
            <Row>
              <Col>
                <CommentHeader>
                  {t('what-has-happened-along-the-way')}
                </CommentHeader>
              </Col>
            </Row>
          ) : null}
          {experimentPosts}
          {isLogged ? (
            <Row style={{ marginTop: 50 }}>
              <Col size={12}>
                <ButtonBase size="medium" onClick={this.openModal}>
                  {t('start-new-conversation')}
                </ButtonBase>
                <StyledModal isOpen={modal} onRequestClose={this.closeModal}>
                  <CreateCommentPostModal
                    experimentSlug={slug}
                    closeModal={this.closeModal}
                  />
                </StyledModal>
              </Col>
            </Row>
          ) : null}
        </CommentContainer>
        {isLogged && me.length > 0 ? (
          <div>
            <StyledModal
              isOpen={imageModal}
              onRequestClose={this.closeImageModal}
            >
              <ExperimentImageForm
                closeModal={this.closeImageModal}
                slug={slug}
              />
            </StyledModal>
            <ExperimentResponsibleModal
              isOpen={responsibleModal}
              onRequestClose={this.closeResponsibleModal}
            >
              <ExperimentResponsibleForm
                closeModal={this.closeResponsibleModal}
                slug={slug}
                defaultResponsibles={defaultResponsibles}
              />
            </ExperimentResponsibleModal>
            <StyledModal
              isOpen={titleModal}
              onRequestClose={this.closeTitleModal}
            >
              <ExperimentTitleForm
                publish
                name={name}
                slug={slug}
                closeModal={this.closeTitleModal}
              />
            </StyledModal>
            <StyledModal
              isOpen={descriptionModal}
              onRequestClose={this.closeDescriptionModal}
            >
              <ExperimentDescriptionForm
                publish
                description={description}
                slug={slug}
                closeModal={this.closeDescriptionModal}
              />
            </StyledModal>
            <StyledModal
              isOpen={lookingForModal}
              onRequestClose={this.closeLookingForModal}
            >
              <ExperimentLookingForForm
                publish
                lookingFor={lookingFor}
                slug={slug}
                closeModal={this.closeLookingForModal}
              />
            </StyledModal>
            <StyledModal
              isOpen={themeModal}
              onRequestClose={this.closeThemeModal}
            >
              <ExperimentThemeForm
                publish
                experimentThemes={themes}
                slug={slug}
                closeModal={this.closeThemeModal}
              />
            </StyledModal>
          </div>
        ) : null}
      </MainLayout>
    )
  }
}

const mapStateToProps = ({ experiments, user }) => {
  return {
    experiments,
    user
  }
}

export default withTranslation(['common', 'register-experiment'])(
  AuthHoc(
    withRouter(
      connect(
        mapStateToProps,
        {
          getSingleExperiment
        }
      )(AuthHoc(Experiment))
    )
  )
)
