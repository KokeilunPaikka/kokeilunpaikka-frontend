// @flow
import styled from 'styled-components'

const ButtonContainer = styled.div`
  right: 0;
  
  margin-left: 0.5rem;
  position: absolute;
  top: 0;
`

const CloseButton = styled.button`
  font-size: 1.2rem;
  font-weight: 600;
  height: 38px;
  outline: none;
  user-select: none;
  white-space: nowrap;
  background: 0 0;
  border: 1px solid transparent;
  cursor: pointer;

  background: hsla(0, 0%, 100%, 0.1);
  border-radius: 0;
  transition: all 0.1s linear;

  &:hover {
    background: hsla(0, 0%, 100%, 0.5);
    border-radius: 20px;
  }

  :active {
    background: hsla(0, 0%, 100%, 0.4);
    box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.37);
    transform: translateY(1px);
  }

  :focus {
    outline: 0;
  }
`

const IconContainer = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
`

const Icon = () => (
  <svg version="1.1" viewBox="0 0 20 20" x="0px" y="0px">
    <g>
      <path d="M8.5 10L4 5.5 5.5 4 10 8.5 14.5 4 16 5.5 11.5 10l4.5 4.5-1.5 1.5-4.5-4.5L5.5 16 4 14.5 8.5 10z" />
    </g>
  </svg>
)

const IconButton = styled(Icon)`
  left: 0;
  position: absolute;
  width: 20px;
  height: 20px;
  fill: white;
`

const Button = ({ onClick }: { onClick: Function }) => {
  return (
    <ButtonContainer>
      <CloseButton onClick={onClick}>
        <IconContainer>
          <IconButton />
        </IconContainer>
      </CloseButton>
    </ButtonContainer>
  )
}

export default Button
