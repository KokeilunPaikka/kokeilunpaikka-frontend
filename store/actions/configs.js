// @flow

import { Get } from 'api'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { DJANGO_URL }
} = getConfig()

export const GET_CONFIGURATION = 'GET_CONFIGURATION'

export const getConfiguration = () => dispatch => {
  const url = `${DJANGO_URL}/configuration/`

  return dispatch({
    type: GET_CONFIGURATION,
    payload: Get(url)
  })
}
