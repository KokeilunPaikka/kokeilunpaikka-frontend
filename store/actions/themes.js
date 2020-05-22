// @flow

import { Get, Post } from 'api/index'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { DJANGO_URL }
} = getConfig()

export const GET_THEMES = 'GET_THEMES'
export const CREATE_THEME = 'CREATE_THEME'

export const getThemes = lang => dispatch => {
  const url = `${DJANGO_URL}/themes/`

  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': lang
  }

  return dispatch({
    type: GET_THEMES,
    payload: Get(url, {}, headers)
  })
}
export const createTheme = name => dispatch => {
  const url = `${DJANGO_URL}/themes/`

  return dispatch({
    type: CREATE_THEME,
    payload: Post(url, JSON.stringify({ name }))
  })
}
