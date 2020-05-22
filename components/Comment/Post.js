import { Col, Row } from 'components/Layout/Grid'
import { format } from 'date-fns'
import { Component } from 'react'
import styled from 'styled-components/macro'
import { Form, FormCol, FormRow } from 'components/Forms'
import { Button } from 'components/Button'
import {
  createComment,
  removeComment,
  getSingleExperiment,
  removeCommentPost
} from 'store/actions/experiments'
import { connect } from 'react-redux'
import Swiper from 'swiper'
import { LabelTextarea } from 'components/Input'
import { StyledModal } from 'components/Modals'
import { withTranslation, Link } from 'i18n'
import anchorme from 'anchorme'
import xss from 'xss'

const options = {
  whiteList: {
    a: ['href', 'title', 'target'],
    br: [],
    p: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    ul: [],
    li: [],
    strong: [],
    img: ['src', 'alt'],
    iframe: [
      'height',
      'width',
      'src',
      'frameborder',
      'allow',
      'allowfullscreen'
    ],
    span: []
  }
}

const CommentDate = styled.div`
  font-size: 24px;
  color: #4a4a4a;
`
const CommentSubHeader = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 30px;
  line-height: 36px;
  margin-top: 0;
`

const PostContent = styled.div`
  margin: 50px 10px;
  @media ${props => props.theme.breakpoints.md} {
    margin: 50px;
  }
  br {
    display: block;
    content: ' ';
    line-height: 0;
  }
  img {
    max-width: 560px;
  }
`
const AuthorImage = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 10px;
    border-radius: 50px;
    max-width: 64px;
  }
`
const AuthorName = styled.div`
  a {
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const CommentCount = styled.div`
  color: #4a4a4a;
  font-size: 14px;
  margin: 15px 0;

  @media ${props => props.theme.breakpoints.md} {
    margin: 15px 50px;
  }
`

const CommentToggle = styled.div`
  font-size: 18px;
  margin-bottom: 25px;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 24px;
    text-align: center;
    margin-bottom: 0;
  }

  &:hover {
    cursor: pointer;
  }
`

const CommentsTitle = styled.div`
  font-size: 16px;
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
`

const SingleComment = styled.div`
  display: flex;

  &.even {
    justify-content: flex-end;
    > div {
      border-radius: 0 30px 0 30px;
    }
  }

  > div {
    border-radius: 30px 0 30px 0;
    background-color: #ffffff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
    padding: 15px;
    display: flex;
    margin-top: 25px;
    width: 100%;

    @media ${props => props.theme.breakpoints.md} {
      width: 80%;
    }

    img {
      margin-right: 20px;
    }
  }
`
const ThumbGallery = styled.div`
  &.gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0 0;
  }
  &.gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
    height: 100px !important;

    &:hover {
      cursor: pointer;
    }
  }
  &.gallery-thumbs .swiper-slide-thumb-active {
    opacity: 1;
  }
`

const Background = styled.div`
  border-radius: 100px 0 100px 0;
  background-color: #f6f8ff;
  padding-bottom: 30px;
`

const Remove = styled.div`
  text-align: right;
  color: red;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
  }
`

const RemovePost = styled(Remove)`
  margin: 10px 0;
  @media ${props => props.theme.breakpoints.md} {
    margin: 10px 50px;
  }
`

const Comments = styled.div`
  padding: 15px 0;

  @media ${props => props.theme.breakpoints.md} {
    padding: 15px 50px;
  }
`

const SliderCol = styled(Col)`
  width: 100%;
  @media ${props => props.theme.breakpoints.md} {
    width: 50%;
  }
`

class Post extends Component {
  state = {
    toggleComments: true,
    submitting: false,
    fields: {
      content: ''
    },
    errors: {},
    removeCommentModal: false,
    removeCommentPostModal: false,
    removeCommentId: null
  }

  swiper = null

  componentDidMount() {
    const { post } = this.props
    if (post.images.length > 0) {
      let thumbSwiper = null
      if (post.images.length > 1) {
        thumbSwiper = new Swiper(`.gallery-thumbs-${post.id}`, {
          spaceBetween: 10,
          slidesPerView: 3,
          freeMode: true,
          watchSlidesVisibility: true,
          watchSlidesProgress: true
        })
      }
      if (!this.swiper) {
        const args = {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },

          spaceBetween: 10
        }
        if (thumbSwiper) {
          args.thumbs = {
            swiper: thumbSwiper
          }
        }
        this.swiper = new Swiper(`.gallery-${post.id}`, args)
      }
    }
  }

  toggleComments = () => {
    const { toggleComments } = this.state
    this.setState({ toggleComments: !toggleComments })
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

  submitForm = e => {
    e.preventDefault()
    const { fields } = this.state
    const {
      post,
      experimentSlug,
      createComment: createCommentAction,
      getSingleExperiment: getSingleExperimentAction
    } = this.props
    this.setState({ submitting: true })
    createCommentAction(experimentSlug, post.id, fields).then(response => {
      if (response.status) {
        this.setState({ submitting: false })
        this.setState({ errors: response.messages })
      } else {
        getSingleExperimentAction(experimentSlug).then(() => {
          this.setState({ fields: { content: '' }, errors: {} })
          this.setState({ submitting: false })
        })
      }
    })
  }

  openRemoveCommentModal = commentId => {
    this.setState({ removeCommentId: commentId, removeCommentModal: true })
  }

  closeRemoveCommentModal = () => {
    this.setState({ removeCommentId: null, removeCommentModal: false })
  }

  openRemoveCommentPostModal = () => {
    this.setState({
      removeCommentPostModal: true
    })
  }

  closeRemoveCommentPostModal = () => {
    this.setState({ removeCommentPostModal: false })
  }

  removeComment = () => {
    const {
      post,
      experimentSlug,
      removeComment: removeCommentAction,
      getSingleExperiment: getSingleExperimentAction
    } = this.props

    const { removeCommentId } = this.state
    this.setState({ submitting: true })
    removeCommentAction(experimentSlug, post.id, removeCommentId).then(
      response => {
        if (!response.status) {
          getSingleExperimentAction(experimentSlug).then(() => {
            this.closeRemoveCommentModal()
            this.setState({ submitting: false })
          })
        }
      }
    )
  }

  removeCommentPost = () => {
    const {
      post,
      experimentSlug,
      removeCommentPost: removeCommentPostAction,
      getSingleExperiment: getSingleExperimentAction
    } = this.props
    this.setState({ submitting: true })
    removeCommentPostAction(experimentSlug, post.id).then(response => {
      if (!response.status) {
        getSingleExperimentAction(experimentSlug).then(() => {
          this.closeRemoveCommentPostModal()
          this.setState({ submitting: false })
        })
      }
    })
  }

  render() {
    const {
      post,
      post: {
        count_of_comments: countOfComments,
        created_by: { image_url: createdByImage, full_name: createdByName }
      },
      user: { isLogged, user },
      t
    } = this.props
    const {
      toggleComments,
      fields,
      submitting,
      errors,
      removeCommentModal,
      removeCommentPostModal
    } = this.state

    const image = createdByImage ? (
      <img alt={createdByName} src={createdByImage} />
    ) : null

    let toggleButtonText = t('hide-comments')
    if (!toggleComments) {
      if (countOfComments === 0) {
        toggleButtonText = t('write-first-comment')
      } else {
        toggleButtonText = t('show-comments')
      }
    }

    let form = (
      <div
        style={{
          display: 'flex',
          marginTop: 25,
          justifyContent: 'flex-end'
        }}
      >
        {t('login-to-comment')}
      </div>
    )

    if (isLogged) {
      form = (
        <Form onSubmit={this.submitForm}>
          <FormRow>
            <FormCol style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <LabelTextarea
                placeholder={t('comment')}
                name="content"
                onChange={this.handleChange}
                value={fields.content}
                disabled={submitting}
                errors={errors}
                wrapperStyles={{
                  width: '80%'
                }}
                styles={{
                  borderRadius: 18,
                  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)'
                }}
              />
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
                disabled={submitting}
              >
                {t('send-comment')}
              </Button>
            </FormCol>
          </FormRow>
        </Form>
      )
    }

    let comments = null
    if (toggleComments) {
      const commentEntries = post.comments.map((comment, index) => {
        let clazz = 'odd'
        if (index % 2 === 0) {
          clazz = 'even'
        }
        return (
          <SingleComment key={comment.id} className={clazz}>
            <div>
              {comment.created_by.image_url ? (
                <div>
                  <AuthorImage>
                    <img
                      alt={comment.created_by.full_name}
                      src={comment.created_by.image_url}
                    />
                  </AuthorImage>
                </div>
              ) : null}
              <div style={{ width: '100%' }}>
                <AuthorName>{comment.created_by.full_name}</AuthorName>
                <div
                  style={{
                    marginTop: 10,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                  // Backend is returning html data here, so we have to user dangerouslySetInnerHTML
                  // eslint-disable-next-line
                  dangerouslySetInnerHTML={{
                    __html: xss(anchorme(comment.content), options)
                  }}
                />
                {user.id === comment.created_by.id ? (
                  <Remove
                    onClick={() => this.openRemoveCommentModal(comment.id)}
                  >
                    {t('remove-comment')}
                  </Remove>
                ) : null}
              </div>
            </div>
          </SingleComment>
        )
      })
      comments = (
        <Comments>
          <CommentsTitle>{t('comments')}</CommentsTitle>
          {commentEntries}
          {form}
        </Comments>
      )
    } else {
      comments = (
        <div>
          <CommentCount>
            {post.count_of_comments === 1
              ? `${post.count_of_comments} ${t('one-comment')}`
              : `${post.count_of_comments} ${t('many-comments')}`}
          </CommentCount>
          {user.id === post.created_by.id ? (
            <RemovePost
              style={{ textAlign: 'left', marginBottom: 15 }}
              onClick={this.openRemoveCommentPostModal}
            >
              {t('remove-post')}
            </RemovePost>
          ) : null}
          <StyledModal
            isOpen={removeCommentPostModal}
            onRequestClose={this.closeRemoveCommentPostModal}
          >
            <div>{t('really-remove-post')}</div>
            <div style={{ marginTop: 20 }}>
              <Button
                size="medium"
                type="submit"
                as="button"
                onClick={this.closeRemoveCommentPostModal}
                disabled={submitting}
              >
                {t('cancel')}
              </Button>
              <Button
                size="medium"
                type="submit"
                as="button"
                onClick={this.removeCommentPost}
                style={{ marginLeft: 15 }}
                disabled={submitting}
              >
                {t('remove')}
              </Button>
            </div>
          </StyledModal>
        </div>
      )
    }

    let images = null
    if (post.images.length > 0) {
      const postImages = post.images.map(postImage => {
        const style = {
          background: `url(${postImage.url}) no-repeat center`,
          height: 285,
          backgroundSize: 'cover'
        }
        return <div key={postImage.id} className="swiper-slide" style={style} />
      })
      const thumbClass = `swiper-container gallery-thumbs gallery-thumbs-${post.id}`
      const sliderClass = `swiper-container gallery gallery-${post.id}`
      images = (
        <SliderCol size={6}>
          <div>
            <div className={sliderClass}>
              <div className="swiper-wrapper">{postImages}</div>
              <div className="swiper-button-next" />
              <div className="swiper-button-prev" />
            </div>
            {post.images.length > 1 ? (
              <ThumbGallery className={thumbClass}>
                <div className="swiper-wrapper">{postImages}</div>
              </ThumbGallery>
            ) : null}
          </div>
        </SliderCol>
      )
    }

    return (
      <div
        style={{
          paddingBottom: 50
        }}
      >
        <Row>
          <Col size={12}>
            <Background>
              <Row>
                <Col size={post.images.length > 0 ? 6 : 12}>
                  <div>
                    <PostContent>
                      <CommentDate>
                        {format(new Date(post.created_at), 'dd.MM.yyyy')}
                      </CommentDate>
                      <CommentSubHeader>{post.title}</CommentSubHeader>
                      <div
                        style={{
                          fontSize: 14,
                          marginBottom: 20,
                          lineHeight: '18px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        dangerouslySetInnerHTML={{
                          __html: xss(anchorme(post.content), options)
                        }}
                      />
                      <AuthorImage>
                        {image}
                        <AuthorName>
                          <Link
                            href={{
                              pathname: '/kokeilija/[id]',
                              query: {
                                id: post.created_by.id
                              }
                            }}
                            as={`/kokeilija/${post.created_by.id}`}
                          >
                            <a>{post.created_by.full_name}</a>
                          </Link>
                        </AuthorName>
                      </AuthorImage>
                    </PostContent>
                  </div>
                </Col>
                {images}
              </Row>
              <Row>
                <Col size={12}>
                  <div style={{ borderTop: '1px solid #E0E0E0' }}>
                    {comments}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col size={12}>
                  <CommentToggle onClick={this.toggleComments}>
                    {toggleButtonText}
                  </CommentToggle>
                </Col>
              </Row>
            </Background>
          </Col>
        </Row>
        <StyledModal
          isOpen={removeCommentModal}
          onRequestClose={this.closeRemoveCommentModal}
        >
          <div>{t('really-remove-comment')}</div>
          <div style={{ marginTop: 20 }}>
            <Button
              size="medium"
              type="submit"
              as="button"
              onClick={this.closeRemoveCommentModal}
              disabled={submitting}
            >
              {t('cancel')}
            </Button>
            <Button
              size="medium"
              type="submit"
              as="button"
              onClick={this.removeComment}
              style={{ marginLeft: 15 }}
              disabled={submitting}
            >
              {t('remove')}
            </Button>
          </div>
        </StyledModal>
      </div>
    )
  }
}

const mapStateToProps = ({ experiments, user }) => ({
  experiments,
  user
})

export default connect(
  mapStateToProps,
  {
    createComment,
    removeComment,
    getSingleExperiment,
    removeCommentPost
  }
)(withTranslation('common')(Post))
