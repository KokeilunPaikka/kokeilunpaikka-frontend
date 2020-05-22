// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import { MainLayout } from 'components/Layout'
import cogoToast from 'cogo-toast'

import { LabelInput, Checkbox } from 'components/Input'
import { Container, Row, Col } from 'components/Layout/Grid'

import {
  getLookingForOptions,
  getStatusOptions,
  updateProfile
} from 'store/actions/users'
import { getThemes, createTheme, CREATE_THEME } from 'store/actions/themes'

import { MultiStepForm, FormRow, FormCol } from 'components/Forms'

import { produce } from 'immer'

import AuthHoc from 'components/AuthHoc'

import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'

import { uploadImage } from 'store/actions/image'
import { withTranslation, i18n } from 'i18n'

import Helmet from 'react-helmet'
import Router from 'next/router'
import { Icon } from 'components/Icon/index'

const Fieldset = styled.fieldset`
  border: 0;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`

const ColumnWith2Inputs = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;

  > * {
    margin: 15px 0;

    :first-child {
      margin-top: 0;
    }

    :last-child {
      margin-bottom: 0;
    }
  }
`

const ImageUpload = styled.div``

const ProfileImage = styled.img`
  width: 310px;
  height: 200px;

  object-fit: contain;
  background: white;
  border: none;
  outline: none;
  stroke: none;
`

const FileUploadWrapper = styled.div`
  position: relative;
`

const FileUpload = styled.input`
  background: #9dd2c8;
  border-radius: 2px;

  padding: 8px 20px;
  max-width: 100%;
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

const Link = styled.a`
  font-size: 16px;
  color: #2d3264;
  font-weight: 800;
  margin-bottom: 8px;
  svg {
    margin-right: 5px;
  }
`

type OwnProps = $ReadOnly<{|
  comingFromOutside: string
|}>

type Props = $ReadOnly<{|
  ...OwnProps
|}>

class UpdateProfile extends Component<Props> {
  state = {
    fields: {
      description: null,
      facebook_url: null,
      twitter_url: null,
      linkedin_url: null,
      instagram_url: null
    },
    options: null,
    offeringOptions: null,
    sendExperimentNotification: null,
    themes: null,
    status: null,
    image: { file: '', preview: null }
  }

  componentDidMount() {
    const {
      getThemes: getThemesAction,
      getLookingForOptions: getLookingForOptionsAction,
      getStatusOptions: getStatusOptionsAction,
      userIsAuthenticated
    } = this.props

    if (userIsAuthenticated) {
      getThemesAction(i18n.language)
      getLookingForOptionsAction()
      getStatusOptionsAction()
    }
  }

  componentDidUpdate(prevProps) {
    /* eslint-disable react/no-did-update-set-state */
    const { userIsAuthenticated: userWasAuthenticated } = prevProps
    const {
      userIsAuthenticated,
      user: {
        user: {
          offering: initialOfferingOptions,
          looking_for: initialLookingForOptions,
          interested_in_themes: initialThemes,
          status: initialStatus,
          image_url: initialProfileImage,
          send_experiment_notification: initialNotification
        }
      }
    } = this.props

    const {
      options,
      offeringOptions,
      themes,
      status,
      sendExperimentNotification,
      image: { preview }
    } = this.state

    if (userWasAuthenticated === false && userIsAuthenticated) {
      const {
        getThemes: getThemesAction,
        getLookingForOptions: getLookingForOptionsAction,
        getStatusOptions: getStatusOptionsAction
      } = this.props

      getThemesAction(i18n.language)
      getLookingForOptionsAction()
      getStatusOptionsAction()
    }

    if (options === null && initialLookingForOptions) {
      this.setState(
        produce(draft => {
          draft.options = initialLookingForOptions.map(option => option.id)
        })
      )
    }

    if (offeringOptions === null && initialOfferingOptions) {
      this.setState(
        produce(draft => {
          draft.offeringOptions = initialOfferingOptions.map(
            option => option.id
          )
        })
      )
    }

    if (themes === null && initialThemes) {
      this.setState(
        produce(draft => {
          draft.themes = initialThemes.map(({ id: value, name: label }) => ({
            label,
            value
          }))
        })
      )
    }

    if (sendExperimentNotification === null && initialNotification) {
      this.setState(
        produce(draft => {
          draft.sendExperimentNotification = initialNotification
        })
      )
    }
    if (status === null && initialStatus) {
      const { id: value, value: label } = initialStatus
      this.setState(
        produce(draft => {
          draft.status = { label, value }
        })
      )
    }

    if (preview === null && initialProfileImage) {
      this.setState(
        produce(draft => {
          draft.image.preview = initialProfileImage
        })
      )
    }
  }

  handleChange = e => {
    e.preventDefault()
    const {
      currentTarget: { name, value }
    } = e

    this.setState(
      produce(draft => {
        draft.fields[name] = value
      })
    )
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
              draft.theme.push({ label, value })
            })
          )
        }
      }
    )
  }

  handleCheckbox = e => {
    const {
      currentTarget: { name, value, checked }
    } = e

    if (checked) {
      this.setState(
        produce(draft => {
          if (draft[name]) {
            draft[name].push(parseInt(value, 10))
          } else {
            draft[name] = [parseInt(value, 10)]
          }
        })
      )
    } else {
      const { [name]: current } = this.state

      this.setState({
        [name]: current.filter(option => option !== parseInt(value, 10))
      })
    }
  }

  handleNotification = e => {
    const {
      currentTarget: { checked }
    } = e
    this.setState({ sendExperimentNotification: checked })
  }

  changeSelect = (value, { name }) => {
    this.setState({ [name]: value })
  }

  handleImageChange = e => {
    e.preventDefault()

    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = () => {
      this.setState(
        produce(draft => {
          draft.image.file = file
          draft.image.preview = reader.result
        })
      )
    }

    reader.readAsDataURL(file)
  }

  submitProfile = async e => {
    /* eslint-disable camelcase */
    e.preventDefault()

    const {
      fields: {
        description,
        facebook_url,
        twitter_url,
        linkedin_url,
        instagram_url
      },
      offeringOptions,
      options,
      themes,
      status,
      sendExperimentNotification,
      image: { file }
    } = this.state

    const {
      uploadImage: uploadImageAction,
      updateProfile: updateProfileAction
    } = this.props

    const payload = {
      description,
      facebook_url,
      twitter_url,
      linkedin_url,
      instagram_url,
      interested_in_theme_ids: themes ? themes.map(({ value }) => value) : null,
      looking_for_ids: options || null,
      offering_ids: offeringOptions || null,
      status_id: status && 'value' in status ? status.value : null,
      send_experiment_notification: sendExperimentNotification
    }

    if (file) {
      await uploadImageAction(file, file.type, file.name).then(resp => {
        if (!resp.status) {
          payload.image_id = resp.value.id
        }
      })
    }

    // clean up empty keys
    Object.keys(payload).forEach(
      key => payload[key] == null && delete payload[key]
    )

    await updateProfileAction(payload)
    const {
      user: { error },
      t
    } = this.props
    if (typeof error.messages === 'undefined') {
      cogoToast.success(t('update-profile:profile-saved-toast'))
      Router.push('/profile')
    }
  }

  render() {
    const {
      user: {
        user: {
          description: initialDescription,
          facebook_url: initialFacebookUrl,
          twitter_url: initialTwitterUrl,
          linkedin_url: initialLinkedinUrl,
          instagram_url: initialInstagramUrl
        },
        error: { messages: errors }
      },
      themes,
      themesPending,
      lookingForOptions,
      statuses,
      t
    } = this.props

    const {
      fields: {
        description,
        facebook_url: facebookUrl,
        twitter_url: twitterUrl,
        linkedin_url: linkedinUrl,
        instagram_url: instagramUrl
      },
      options,
      offeringOptions,
      themes: selectedThemes,
      status: selectedStatus,
      sendExperimentNotification,
      image: { preview }
    } = this.state

    const ThemeOptions = themes
      .map(({ id: value, name: label }) => ({
        label,
        value
      }))
      .sort((a, b) => a.label.localeCompare(b.label))

    const statusOptions = statuses.map(({ id: value, value: label }) => ({
      label,
      value
    }))

    const Step1 = (
      <div key="step1">
        <FormRow>
          <FormCol>
            <LabelInput
              key="description"
              placeholder={t('update-profile:person-description-placeholder')}
              label={t('update-profile:person-description-label')}
              name="description"
              onChange={this.handleChange}
              value={description === null ? initialDescription : description}
              type="textarea"
              errors={errors}
            />
          </FormCol>
        </FormRow>
        <FormRow2>
          <FormCol>
            <LabelInput
              label={t('update-profile:person-looking-for-label')}
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
                  checked={options && options.some(e => e === id)}
                />
              ))}
            </Fieldset>
            <LabelInput
              label={t('update-profile:person-offering-label')}
              labelOnly
            />
            <Fieldset>
              {lookingForOptions.map(({ id, value, offering_value }) => (
                <Checkbox
                  key={offering_value || value}
                  value={id}
                  label={offering_value || value}
                  onChange={this.handleCheckbox}
                  name="offeringOptions"
                  checked={
                    offeringOptions && offeringOptions.some(e => e === id)
                  }
                />
              ))}
            </Fieldset>
          </FormCol>
          <FormCol>
            <ColumnWith2Inputs>
              <LabelInput
                label={t('update-profile:person-theme-label')}
                name="themes"
              >
                {selectName => (
                  <CreatableSelect
                    placeholder={t('update-profile:person-theme-placeholder')}
                    name={selectName}
                    isClearable
                    isMulti
                    isDisabled={themesPending}
                    isLoading={themesPending}
                    onChange={this.changeSelect}
                    onCreateOption={this.handleCreate}
                    options={ThemeOptions}
                    value={selectedThemes}
                    menuPortalTarget={process.browser ? document.body : null}
                    formatCreateLabel={inputVal => t(`Luo "${inputVal}"`)}
                  />
                )}
              </LabelInput>

              <LabelInput
                label={t('update-profile:person-status-label')}
                name="status"
              >
                {selectName => (
                  <Select
                    placeholder={t('update-profile:person-status-placeholder')}
                    name={selectName}
                    isClearable
                    onChange={this.changeSelect}
                    options={statusOptions}
                    value={selectedStatus}
                    menuPortalTarget={process.browser ? document.body : null}
                  />
                )}
              </LabelInput>
            </ColumnWith2Inputs>
          </FormCol>
        </FormRow2>
      </div>
    )

    const Step2 = (
      <div key="step2">
        <FormRow2>
          <FormCol style={{ display: 'flex', flexDirection: 'column' }}>
            <LabelInput
              key="facebook"
              placeholder={t('update-profile:person-facebook-placeholder')}
              name="facebook_url"
              onChange={this.handleChange}
              value={facebookUrl === null ? initialFacebookUrl : facebookUrl}
              errors={errors}
            />
            <LabelInput
              key="twitter"
              placeholder={t('update-profile:person-twitter-placeholder')}
              name="twitter_url"
              onChange={this.handleChange}
              value={twitterUrl === null ? initialTwitterUrl : twitterUrl}
              errors={errors}
            />
            <LabelInput
              key="LinkedIn"
              placeholder={t('update-profile:person-linkedin-placeholder')}
              name="linkedin_url"
              onChange={this.handleChange}
              value={linkedinUrl === null ? initialLinkedinUrl : linkedinUrl}
              errors={errors}
            />
            <LabelInput
              key="instagram"
              placeholder={t('update-profile:person-instagram-placeholder')}
              name="instagram_url"
              onChange={this.handleChange}
              value={instagramUrl === null ? initialInstagramUrl : instagramUrl}
              errors={errors}
            />
          </FormCol>
          <FormCol style={{ overflow: 'visible' }}>
            <ImageUpload>
              <ProfileImage src={preview} alt="Profile" />
              <FileUploadWrapper>
                <FileUpload type="file" onChange={this.handleImageChange} />
              </FileUploadWrapper>
            </ImageUpload>
          </FormCol>
        </FormRow2>
      </div>
    )

    const Step3 = (
      <div key="step3">
        <FormRow>
          <FormCol>
            <Link
              href="https://kokeilunpaikka.motiva.fi/account"
              target="__blank"
            >
              <Icon icon={['fa', 'envelope']} />
              {t('update-profile:subscribe-or-unsubscribe-newsletter')}
            </Link>
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol>
            <LabelInput
              label={t('update-profile:send-notification-label')}
              name="send_experiment_notification"
            >
              {selectName => (
                <Checkbox
                  name={selectName}
                  onChange={this.handleNotification}
                  checked={sendExperimentNotification}
                />
              )}
            </LabelInput>
          </FormCol>
        </FormRow>
      </div>
    )

    const steps = [
      {
        step: 1,
        title: t('update-profile:first-form-title'),
        component: Step1
      },
      {
        step: 2,
        title: t('update-profile:second-form-title'),
        component: Step2
      },
      {
        step: 3,
        title: t('update-profile:third-form-title'),
        component: Step3
      }
    ]

    return (
      <MainLayout>
        <Helmet>
          <title>{t('page-titles:update-profile')}</title>
          <meta property="og:title" content={t('page-titles:update-profile')} />
        </Helmet>
        <Container>
          <Row>
            <Col size={8} offset={2}>
              <MultiStepForm steps={steps} submitAction={this.submitProfile} />
            </Col>
          </Row>
        </Container>
      </MainLayout>
    )
  }
}

const mapStateToProps = ({
  user: { lookingForOptions, statusOptions },
  themes: { list, isPending }
}) => ({
  lookingForOptions,
  statuses: statusOptions,
  themes: list,
  themesPending: isPending
})

export default connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  {
    getThemes,
    createTheme,
    getLookingForOptions,
    getStatusOptions,
    updateProfile,
    uploadImage
  }
)(
  withTranslation(['common', 'update-profile', 'page-titles'])(
    AuthHoc(UpdateProfile)
  )
)
