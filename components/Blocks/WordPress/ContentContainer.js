import styled from 'styled-components/macro'
import { connect } from 'react-redux'

const ContentContainer = styled.div`
  max-width: ${props => (props.currentArticle.full_image ? '750px' : '1140px')};
  margin: 0 auto;
`

const mapStateToProps = ({ blog }) => {
  return {
    currentArticle: blog.currentArticle
  }
}

export default connect(mapStateToProps)(ContentContainer)
