import styled from 'styled-components/macro'

import { Icon as IconElement } from 'components/Icon'

const Wrapper = styled.div`
  position: relative;
  // display: inline-block;
  display: flex;
`

const Icon = styled(IconElement)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  color: ${props => props.theme.colors.mint};
`

const Field = styled.input`
  display: inline;
  font-size: 24px;
  padding: 12px 24px;
  border: 1px solid #787878;
  border-radius: 40px;
  color: ${props => props.theme.colors.text};
  font-weight: 800;
  width: 100%;
  outline: 0;

  &::placeholder {
    color: ${props => props.theme.colors.text};

    font-weight: 800;
  }

  :focus {
    outline: 0;
  }
`
const Input = props => {
  const { onChange, name, placeholder, onKeyPress } = props
  return (
    <Wrapper>
      <Field
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={onKeyPress}
        name={name}
      />
    </Wrapper>
  )
}

export default Input
