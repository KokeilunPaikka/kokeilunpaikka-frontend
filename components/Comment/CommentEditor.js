import React from 'react'
import { connect } from 'react-redux'
import { Editor, EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { uploadImage } from 'store/actions/image'
import styled from 'styled-components/macro'
import { withTranslation } from 'i18n'
import { StyledModal } from 'components/Modals/index'
import { Button } from 'components/Button/index'
import { LabelInput as LabelInputBase } from 'components/Input'
import {
  mediaBlockRenderer,
  customEntityTransform
} from 'utils/mediaBlockRenderer'
import Spinner from 'components/Spinner/Spinner'

const EditorContainer = styled.div`
  background-color: #ffffff;
  border-radius: 18px;
  padding: 10px 18px 8px;
  min-height: 200px;
  figure {
    display: block;
    margin: 10px 0;
    user-select: none;
  }
`
const Label = styled.label`
  font-size: 16px;
  color: #2d3264;
  font-weight: 800;
  margin-bottom: 8px;
  display: block;
`
const Toolbar = styled.div`
  display: flex;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  padding: 1px 0;
  margin-bottom: 10px;
  user-select: none;
`
const ToolbarButton = styled.a`
  padding: 5px;
  border-right: 1px solid #ddd;
  background: #fff;
  font-size: 0.9rem;
  cursor: pointer;
  height: 100%;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: #ddd;
  }
`
const Input = styled.input`
  margin-bottom: 10px;
`
const LabelInput = styled(LabelInputBase)`
  margin-bottom: 10px;
`
const SpinnerContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`

class CommentEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      showImageModal: false,
      showVideoModal: false,
      uploadingImage: false,
      imageError: null,
      fields: {
        imageFile: null,
        videoURL: null
      }
    }
    this.onChange = editorState => {
      const { onChange, name } = props
      this.setState({ editorState })
      const rawContentState = convertToRaw(editorState.getCurrentContent())

      const markup = draftToHtml(
        rawContentState,
        {},
        false,
        customEntityTransform
      )
      onChange({
        currentTarget: {
          name,
          value: markup
        }
      })
    }
  }

  showImageModal = () => {
    this.setState({ showImageModal: true })
  }

  closeImageModal = () => {
    this.setState({ showImageModal: false })
  }

  showVideoModal = () => {
    this.setState({ showVideoModal: true })
  }

  closeVideoModal = () => {
    this.setState({ showVideoModal: false })
  }

  handleFile = e => {
    const { fields } = this.state
    this.setState({
      fields: {
        ...fields,
        imageFile: e.target.files[0]
      }
    })
  }

  handleVideoURL = e => {
    const { fields } = this.state
    this.setState({
      fields: {
        ...fields,
        videoURL: e.target.value
      }
    })
  }

  addVideo = e => {
    e.preventDefault()
    const {
      fields: { videoURL }
    } = this.state
    if (videoURL && videoURL.length > 0) {
      const { editorState } = this.state
      const contentState = editorState.getCurrentContent()
      let contentStateWithEntity = null
      contentStateWithEntity = contentState.createEntity('video', 'IMMUTABLE', {
        videoURL
      })
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
      let newEditorState = EditorState.set(
        editorState,
        { currentContent: contentStateWithEntity },
        'create-entity'
      )
      newEditorState = AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        ' '
      )
      this.onChange(newEditorState)
      this.closeVideoModal()
    }
  }

  uploadImage = async e => {
    e.preventDefault()
    await this.setState({ uploadingImage: true })
    const {
      fields: { imageFile }
    } = this.state
    const { uploadImage: uploadImageAction, t } = this.props
    if (!imageFile) {
      this.setState({ imageError: t('common:file-must-be-set') })
      this.setState({ uploadingImage: false })
    } else {
      uploadImageAction(imageFile, imageFile.type, imageFile.name).then(
        response => {
          const src = (response.value || {}).url
          if (!src) {
            return
          }
          const { editorState } = this.state
          const contentState = editorState.getCurrentContent()
          let contentStateWithEntity = null
          contentStateWithEntity = contentState.createEntity(
            'image',
            'IMMUTABLE',
            {
              src
            }
          )
          const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
          let newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity },
            'create-entity'
          )
          newEditorState = AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            entityKey,
            ' '
          )
          this.onChange(newEditorState)
          this.closeImageModal()
          this.setState({ uploadingImage: false })
        }
      )
    }
  }

  renderImageModal = () => {
    const { imageError, uploadingImage } = this.state
    const { t } = this.props
    return (
      <>
        <Input type="file" name="file" onChange={this.handleFile} />
        <Button onClick={this.uploadImage}>{t('comment:submit-image')}</Button>
        {imageError}
        {uploadingImage && (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        )}
      </>
    )
  }

  renderVideoModal = () => {
    const { t } = this.props
    return (
      <>
        <LabelInput
          label={t('comment:video-url')}
          placeholder={t('comment:write-video-url')}
          type="text"
          onChange={this.handleVideoURL}
        />
        <Button onClick={this.addVideo}>{t('comment:submit-video')}</Button>
      </>
    )
  }

  render() {
    const { editorState, showImageModal, showVideoModal } = this.state
    const { t } = this.props
    return (
      <>
        <Label>{t('comment:comment')}</Label>
        <EditorContainer>
          <Toolbar>
            <ToolbarButton onClick={this.showImageModal}>
              {t('common:image')}
            </ToolbarButton>
            <ToolbarButton onClick={this.showVideoModal}>
              {t('common:video')}
            </ToolbarButton>
          </Toolbar>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            placeholder={t('comment:comment-field-placeholder')}
            blockRendererFn={mediaBlockRenderer}
          />
        </EditorContainer>
        <StyledModal
          isOpen={showImageModal}
          onRequestClose={this.closeImageModal}
        >
          {this.renderImageModal()}
        </StyledModal>
        <StyledModal
          isOpen={showVideoModal}
          onRequestClose={this.closeVideoModal}
        >
          {this.renderVideoModal()}
        </StyledModal>
      </>
    )
  }
}

const mapStateToProps = () => ({})

export default connect(
  mapStateToProps,
  {
    uploadImage
  }
)(withTranslation(['common', 'comment'])(CommentEditor))
