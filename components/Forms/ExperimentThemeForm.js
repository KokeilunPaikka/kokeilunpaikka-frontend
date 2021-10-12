// @flow

import { Component } from 'react'
import AuthHoc from 'components/AuthHoc'
import { withTranslation, i18n } from 'i18n'
import { Form } from 'components/Forms'
import { Button } from 'components/Button'
import { LabelInput } from 'components/Input'
import Tooltip from 'components/Tooltip'
import { connect } from 'react-redux'
import {
  getSingleExperiment,
  partialUpdateExperiment
} from 'store/actions/experiments'
import { getThemes, createTheme, CREATE_THEME } from 'store/actions/themes'
import CreatableSelect from 'react-select/creatable'
import produce from 'immer'

class ExperimentThemeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitting: false,
      experimentThemes: props.experimentThemes.map(t => ({
        value: t.id,
        label: t.name
      }))
    }
  }

  componentDidMount = () => {
    const { getThemes: getThemesAction } = this.props
    getThemesAction(i18n.language)
  }

  submitForm = e => {
    e.preventDefault()
    const { experimentThemes } = this.state
    const {
      closeModal,
      getSingleExperiment: getSingleExperimentAction,
      partialUpdateExperiment: partialUpdateExperimentAction,
      slug
    } = this.props

    this.setState({ submitting: true })

    partialUpdateExperimentAction(slug, {
      theme_ids: (experimentThemes || []).map(t => t.value)
    }).then(() => {
      getSingleExperimentAction(slug).then(() => {
        this.setState({ submitting: false })
        closeModal()
      })
    })
  }

  changeTheme = value => {
    this.setState({ experimentThemes: value })
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
              if (!draft.experimentThemes) {
                draft.experimentThemes = []
              }
              draft.experimentThemes.push({ label, value })
            })
          )
        }
      }
    )
  }

  render() {
    const { submitting, experimentThemes } = this.state
    const {
      t,
      themes: { list: themeItems }
    } = this.props
    let disableField = false
    if (submitting) {
      disableField = true
    }
    const themeOptions = themeItems.map(item => {
      return { value: item.id, label: item.name }
    })
    const selectStyles = {
      menuPortal: base => ({ ...base, zIndex: 9999 }),
      menu: provided => ({ ...provided, zIndex: '9999 !important' })
    }
    return (
      <Form onSubmit={this.submitForm}>
        <LabelInput
          label={t('register-experiment:select-themes-label')}
          name="theme"
          tooltip={
            <Tooltip
              title={t('register-experiment:select-themes-label')}
              text={t('register-experiment:tooltips-themes')}
            />
          }
        >
          {selectName => (
            <CreatableSelect
              placeholder={t('register-experiment:select-themes-placeholder')}
              name={selectName}
              isClearable
              isMulti
              onChange={this.changeTheme}
              onCreateOption={this.handleCreate}
              options={themeOptions}
              value={experimentThemes}
              menuPortalTarget={process.browser ? document.body : null}
              formatCreateLabel={inputVal =>
                `${t(
                  `register-experiment:select-themes-create-new-label`
                )} "${inputVal}"`
              }
              styles={selectStyles}
            />
          )}
        </LabelInput>
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

const mapStateToProps = ({ experiments, image, themes }) => ({
  experiments,
  image,
  themes
})

export default connect(
  mapStateToProps,
  {
    getSingleExperiment,
    getThemes,
    partialUpdateExperiment,
    createTheme
  }
)(withTranslation('common')(AuthHoc(ExperimentThemeForm)))
