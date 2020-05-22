// @flow

import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { getSingleExperiment } from 'store/actions/experiments'
import AuthHoc from 'components/AuthHoc'
import { withTranslation } from 'i18n'
import { Experiment } from 'components/Experiment'

type OwnProps = $ReadOnly<{|
  comingFromOutside: string
|}>

type Props = $ReadOnly<{|
  ...OwnProps,
  getSingleExperiment: () => void
|}>

class SingleExperiment extends Component<Props> {
  componentDidMount() {
    const { getSingleExperiment: getSingleExperimentAction } = this.props
    getSingleExperimentAction(this.getCurrentPath())
  }

  static getInitialProps() {
    return {
      namespacesRequired: ['common', 'page-titles']
    }
  }

  getCurrentPath = () => {
    if (process.browser) {
      const {
        router: {
          query: { slug }
        }
      } = this.props
      return slug
    }
    return null
  }

  render() {
    const { experiments } = this.props
    const path = this.getCurrentPath()
    if (path in experiments.byId) {
      const experiment = experiments.byId[path]
      return <Experiment currentExperiment={experiment} />
    }
    return null
  }
}

const mapStateToProps = ({ experiments, user }) => {
  return {
    experiments,
    user
  }
}

export default withTranslation(['common', 'page-titles'])(
  AuthHoc(
    withRouter(
      connect<Props, OwnProps, _, _, _, _>(
        mapStateToProps,
        {
          getSingleExperiment
        }
      )(AuthHoc(SingleExperiment))
    )
  )
)
