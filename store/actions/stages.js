// @flow

import { Get } from 'api/index'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { DJANGO_URL }
} = getConfig()

export const GET_STAGE_QUESTIONS = 'GET_STAGE_QUESTIONS'

export const getStageQuestions = (
  stage: number,
  experimentChallenge = null,
  experimentChallengesForIgnore: null
) => dispatch => {
  const params = new URLSearchParams(window.location.search)
  let queryString = 'experiment_challenge_id__isnull=true'
  let key = 'common'
  if (experimentChallenge) {
    queryString = `experiment_challenge_id=${experimentChallenge}`
    key = experimentChallenge
  }
  if (params.get('experiment_challenge')) {
    queryString = `${queryString}${
      queryString.length > 0 ? '&' : ''
    }experiment_challenge[]=${params.get('experiment_challenge')}`
  }
  if (experimentChallengesForIgnore) {
    queryString = `${queryString}${
      queryString.length > 0 ? '&' : ''
    }${experimentChallengesForIgnore
      .map(e => `experiment_challenge[]=${e}`)
      .join('&')}`
  }
  const url = `${DJANGO_URL}/stages/${stage}/questions/?${queryString}`

  return dispatch({
    type: GET_STAGE_QUESTIONS,
    payload: Get(url),
    meta: key
  })
}
