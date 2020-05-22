// @flow

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select, { components } from 'react-select'

const CaretDownIcon = () => {
  return <FontAwesomeIcon icon="chevron-down" />
}

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <CaretDownIcon />
    </components.DropdownIndicator>
  )
}

const customStyles = {
  input: () => ({
    visibility: 'visible',
    color: 'hsl(0, 0%, 20%)',
    boxSizing: 'border-box'
  }),
  control: () => ({
    label: 'control',
    alignItems: 'center',
    backgroundColor: 'hsl(0, 0%, 100%)',

    boxShadow: null,
    cursor: 'default',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    outline: '0 !important',
    position: 'relative',
    transition: 'all 100ms',
    '&:hover': { cursor: 'pointer' },
    boxSizing: 'border-box',

    fontSize: '24px',
    padding: '12px 24px',
    border: '1px solid #787878',
    borderRadius: '40px',
    fontWeight: 800
  }),
  valueContainer: () => ({
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    WebkitOverflowScrolling: 'touch',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box'
  }),
  option: () => ({
    borderBottom: '1px solid #f1f1f1',
    padding: '10px',
    color: '#4A4A4A',
    '&:hover': { cursor: 'pointer' }
  }),
  placeholder: () => ({
    color: '#4A4A4A',
    marginLeft: 2,
    marginRight: 2,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    boxSizing: 'border-box'
  }),
  indicatorContainer: () => ({
    alignItems: 'center',
    alignSelf: 'stretch',
    display: 'flex',
    flexShrink: 0,
    boxSizing: 'border-box'
  }),
  singleValue: provided => {
    return { ...provided }
  },
  indicatorSeparator: () => ({
    label: 'indicatorSeparator',
    alignSelf: 'stretch',
    boxSizing: 'border-box'
  }),
  dropdownIndicator: () => ({
    label: 'indicatorContainer',
    color: '#4A4A4A',
    display: 'flex',
    transition: 'color 150ms',
    boxSizing: 'border-box'
  }),
  clearIndicator: () => ({
    padding: '0 8px'
  })
}

const Input = ({
  handleChange,
  options,
  selectedOption,
  name,
  placeholder
}: {
  handleChange: Function,
  options: Array<Object>,
  selectedOption: Object,
  name: string,
  placeholder: string
}) => {
  return (
    <div>
      <Select
        name={name}
        styles={customStyles}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        components={{ DropdownIndicator }}
        isClearable
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
