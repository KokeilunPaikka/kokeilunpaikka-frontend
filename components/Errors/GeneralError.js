// @flow

import styled from 'styled-components/macro'

const Error = styled.div`
  margin-top: 10px;

  padding: 10px;
  p {
    padding: 5px;

    color: red;
  }
`

const GeneralError = ({ errors }: { errors: Object }) => {
  try {
    const { non_field_errors: messageList } = errors

    const messages = messageList.map(({ message }) => (
      <p key={message}>{message}</p>
    ))
    return <Error>{messages}</Error>
  } catch {
    return null
  }
}

export default GeneralError
