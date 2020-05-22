import { Component } from 'react'
import ReactDOM from 'react-dom'

class Portal extends Component {
  componentDidMount() {
    const { selector } = this.props
    this.element = document.querySelector(selector)
    this.forceUpdate()
  }

  render() {
    if (this.element === undefined) {
      return null
    }
    const { children } = this.props

    return ReactDOM.createPortal(children, this.element)
  }
}

export default Portal
