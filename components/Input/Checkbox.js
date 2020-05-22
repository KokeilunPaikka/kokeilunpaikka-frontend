// @flow
import styled from 'styled-components/macro'

const Field = styled.input`
  min-width: 0;
  display: inline;
  font-size: 16px;
  margin-right: 8px;
  border: none;
  color: ${props => props.theme.colors.text};
  font-weight: normal;

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
`

const Label = styled.label`
  font-size: 16px;
  color: #2d3264;
  font-weight: 800;
  margin-bottom: 8px;
`

const Checkbox = ({
  label,
  name,
  value,
  onChange,
  checked
}: {
  label?: string,
  name: string,
  onChange: SyntheticInputEvent,
  value: string | number,
  checked: boolean
}) => {
  return (
    <Label>
      <Field
        name={name}
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </Label>
  )
}

Checkbox.defaultProps = {
  label: null
}

export default Checkbox
