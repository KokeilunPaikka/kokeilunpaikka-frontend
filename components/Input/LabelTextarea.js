// @flow
import styled from 'styled-components/macro'

const Wrapper = styled.div`
  position: relative;
  // display: inline-block;
  display: flex;
  flex-direction: column;

  height: 100%;

  justify-content: flex-end;
`

const Field = styled.textarea`
  min-width: 0;
  display: inline;
  font-size: 16px;
  padding: 10px 18px 8px;
  margin: 3px;
  border-radius: 18px;
  border: none;
  color: ${props => props.theme.colors.text};
  font-weight: normal;
  resize: none;
  min-height: 80px;

  &::placeholder {
    color: ${props => props.theme.colors.text};
    font-weight: normal;
  }

  &:disabled {
    background: #dddddd;
  }

  :focus {
    outline: 0;
  }
`

const Label = styled.label`
  font-size: 16px;
  color: #2d3264;
  font-weight: 800;
  margin-bottom: 8px;
`

const LabelTextarea = ({
  label,
  name,
  type = 'text',
  placeholder,
  styles,
  className,
  onChange,
  required,
  errors,
  disabled,
  wrapperStyles,
  value
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
  disabled: boolean,
  wrapperStyles: { [string]: [string] },
  value: string
}) => {
  let errorText = ''
  if (errors && name in errors) {
    errorText = (
      <div style={{ color: 'red', marginTop: 10 }}>
        {errors[name][0].message}
      </div>
    )
  }
  return (
    <Wrapper style={wrapperStyles}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Field
        className={className}
        style={styles}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
        value={value}
      />
      {errorText}
    </Wrapper>
  )
}

LabelTextarea.defaultProps = {
  label: null
}

export default LabelTextarea
