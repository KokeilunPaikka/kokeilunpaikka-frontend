// @flow

import styled from 'styled-components/macro'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const FormRow = styled.div`
  margin: 18px 0;
  flex: 1;
  display: flex;

  > div {
    margin: 0 10px;
    overflow: hidden;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`

const FormCol = styled.div`
  text-align: ${props => props.align || 'left'};
  flex: 1;
`

export { Form, FormRow, FormCol }
