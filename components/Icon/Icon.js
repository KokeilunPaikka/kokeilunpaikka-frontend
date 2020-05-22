// @flow
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components/macro'

const Icon = ({ children, ...rest }) => (
  <FontAwesomeIcon {...rest}>{children}</FontAwesomeIcon>
)

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.colors.primary};
`

export default StyledIcon
