// @flow
import styled from 'styled-components/macro'
import { Icon } from 'components/Icon'

const Container = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
`

const List = styled.ul`
  list-style: none;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin: 0;
  padding-left: 10px;

  li {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const LookingForList = ({ lookingFor }) => {
  const elements = lookingFor.map(looking => {
    return <li key={looking.value}>{looking.value}</li>
  })
  if (lookingFor.length === 0) return null

  return (
    <Container>
      <Icon
        icon={['fa', 'search']}
        fixedWidth
        size="3x"
        width="16"
        style={{ color: '#73BE9B' }}
      />
      <List style={{ marginLeft: 10 }}>{elements}</List>
    </Container>
  )
}

export default LookingForList
