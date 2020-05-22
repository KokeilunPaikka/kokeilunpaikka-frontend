// @flow

import { Get } from 'api/index'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { DJANGO_URL }
} = getConfig()

export const GET_LIBRARY_ITEMS = 'GET_LIBRARY_ITEMS'
export const GET_LIBRARY_ITEM = 'GET_LIBRARY_ITEM'

export const getLibraryItems = (filters = [], lang) => dispatch => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': lang
  }

  const url = `${DJANGO_URL}/library_items/`

  return dispatch({
    type: GET_LIBRARY_ITEMS,
    payload: Get(url, filters, headers)
  })
}

export const getLibraryItem = (slug, lang) => dispatch => {
  const url = `${DJANGO_URL}/library_items/${slug}`
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': lang
  }
  return dispatch({
    type: GET_LIBRARY_ITEM,
    payload: Get(url, {}, headers)
  })
}
