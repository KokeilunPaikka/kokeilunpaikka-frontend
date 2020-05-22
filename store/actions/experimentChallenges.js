// @flow

import { Get } from 'api/index'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { DJANGO_URL }
} = getConfig()

export const GET_CHALLENGES = 'GET_CHALLENGES'
export const GET_SINGLE_CHALLENGE = 'GET_SINGLE_CHALLENGE'

export const getChallenges = (filters = [], lang) => dispatch => {
  let queryString = ''
  const allFilters = filters
  if (allFilters) {
    queryString = Object.keys(allFilters)
      .map(key => `${key}=${allFilters[key]}`)
      .join('&')
  }

  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': lang
  }

  const url = `${DJANGO_URL}/experiment_challenges/?${queryString}`

  return dispatch({
    type: GET_CHALLENGES,
    payload: Get(url, {}, headers)
  })
}

export const getSingleChallenge = (slug: string, lang) => dispatch => {
  const url = `${DJANGO_URL}/experiment_challenges/${slug}/`
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': lang
  }
  return dispatch({
    type: GET_SINGLE_CHALLENGE,
    payload: Get(url, {}, headers)
  })
}
