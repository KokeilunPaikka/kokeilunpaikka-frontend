// @flow

import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { getSingleExperiment } from 'store/actions/experiments'
import AuthHoc from 'components/AuthHoc'
import { Experiment } from 'components/Experiment'
import { withTranslation } from 'i18n'

class SingleExperiment extends Component {
  static async getInitialProps({ store, query }) {
    const { slug } = query
    await store.dispatch(getSingleExperiment(slug))

    return {
      namespacesRequired: ['common', 'page-titles']
    }
  }

  render() {
    const { currentExperiment } = this.props

    /*
      We might be accessing experiment that is draft or somehow not "valid" or found.
    */

    if (!currentExperiment) {
      return null
    }
    return <Experiment currentExperiment={currentExperiment} />
  }
}

const mapStateToProps = (
  { experiments, user },
  {
    router: {
      query: { slug }
    }
  }
) => {
  return {
    experiments,
    user,
    currentExperiment: experiments.byId[slug]
  }
}

export default withTranslation(['common', 'page-titles'])(
  AuthHoc(
    withRouter(
      connect(
        mapStateToProps,
        {
          getSingleExperiment
        }
      )(SingleExperiment)
    )
  )
)
