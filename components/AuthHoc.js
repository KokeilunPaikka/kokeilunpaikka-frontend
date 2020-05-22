// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { getDetails } from 'store/actions/users'

// import { parseCookies } from 'nookies'

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    static async getInitialProps(ctx) {
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))

      return { ...componentProps }
    }

    state = {
      userIsAuthenticated: false
    }

    componentDidMount() {
      if (process.browser) {
        const token = sessionStorage.getItem('token') || null

        const {
          dispatch,
          user: { user }
        } = this.props

        if (
          token &&
          token !== 'undefined' &&
          Object.entries(user).length === 0
        ) {
          dispatch(getDetails()).then(() => {})
        } else if (Object.entries(user).length > 0) {
          this.setState({ userIsAuthenticated: true })
        }
      }
    }

    componentDidUpdate(prevProps) {
      const {
        user: { isLogged: wasLogged }
      } = prevProps

      const {
        user: { isLogged }
      } = this.props

      if (wasLogged === false && isLogged === true) {
        this.setState({ userIsAuthenticated: true })
      }
    }

    render() {
      const { userIsAuthenticated } = this.state
      return (
        <WrappedComponent
          {...this.props}
          userIsAuthenticated={userIsAuthenticated}
        />
      )
    }
  }

const mapStateToProps = ({ user }) => ({
  user
})

export default compose(
  connect(mapStateToProps),
  withAuthSync
)
