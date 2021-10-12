// @flow
import type Node from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
  position: relative;
  // display: inline-block;
  display: flex;
  flex-direction: column;
  height: 100%;
  // justify-content: flex-end;
`

const FieldWrapper = styled.div`
  width: 100%;
  position: relative;
`

const Field = styled.input`
  min-width: 0;
  display: inline;
  font-size: 16px;
  padding: 10px 18px 8px;
  margin: 3px;
  border-radius: 18px;
  border: none;
  color: ${props => props.theme.colors.text};
  font-weight: normal;
  width: 100%;
  box-sizing: border-box;
  transition: color 1s linear;

  ::placeholder {
    color: ${props => props.theme.colors.text};

    font-weight: normal;
  }
  :required {
    box-shadow: none;
  }

  :focus {
    outline: 0;
  }

  :focus + small {
    opacity: 1;
    top: -3px;
  }
  :focus ::placeholder {
    color: transparent;
  }

  ${props => (props.type === 'textarea' ? 'min-height: 100px;' : null)}
`

const HelpText = styled.small`
  margin-left: 15px;
  color: rgb(108, 117, 125);
  opacity: 0;
  transition: all 0.2s linear;
  position: absolute;
  top: 10px;
  left: 0;
  pointer-events: none;
`

const Label = styled.label`
  font-size: 16px;
  color: #2d3264;
  font-weight: 800;
  margin-bottom: 8px;
`

const Error = styled.div`
  color: red;
  margin-top: 10px;
`
const LabelInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  styles = [],
  className = [],
  onChange,
  required,
  errors = {},
  children = null,
  labelOnly = false,
  value,
  defaultValue,
  maxLength,
  tooltip = null
}: {
  label?: string,
  name: string,
  type: string,
  placeholder: string,
  styles: { [string]: [string] },
  className: string,
  onChange: SyntheticInputEvent,
  required: boolean,
  errors: {},
  children: Node,
  labelOnly: boolean,
  value: any,
  defaultValue: any,
  maxLength: any,
  tooltip?: React.ReactNode,
  tooltipProps: {
    title: string,
    text: string
  }
}) => {
  if (labelOnly) {
    return (
      <Label htmlFor={name}>
        {label}&nbsp;{tooltip}
      </Label>
    )
  }

  const errorText =
    name in errors ? <Error>{errors[name][0].message}</Error> : ''

  return (
    <Wrapper>
      {label && (
        <Label htmlFor={name}>
          {label}&nbsp;{tooltip}
        </Label>
      )}
      {children ? (
        children(name)
      ) : (
        <FieldWrapper>
          <Field
            as={type === 'textarea' ? 'textarea' : 'input'}
            className={className}
            styles={styles}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
          />
          <HelpText>{placeholder}</HelpText>
          {errorText}
        </FieldWrapper>
      )}
    </Wrapper>
  )
}

LabelInput.defaultProps = {
  label: null,
  tooltip: null
}

export default LabelInput
