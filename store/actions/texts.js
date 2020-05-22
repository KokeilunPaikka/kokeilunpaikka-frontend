// @flow

import { Get } from 'api'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { DJANGO_URL }
} = getConfig()

export const GET_EDITABLE_TEXTS = 'GET_EDITABLE_TEXTS'

export const getEditableTexts = () => dispatch => {
  const url = `${DJANGO_URL}/editable-text/`

  return dispatch({
    type: GET_EDITABLE_TEXTS,
    payload: Get(url)
  })
}
