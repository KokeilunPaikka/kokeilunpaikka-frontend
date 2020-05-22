// @flow

import { Delete, Get, Patch, Post, Put } from 'api/index'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { DJANGO_URL }
} = getConfig()

export const GET_EXPERIMENTS = 'GET_EXPERIMENTS'
export const GET_SINGLE_EXPERIMENT = 'GET_SINGLE_EXPERIMENT'
export const CREATE_COMMENT_POST = 'CREATE_COMMENT_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const GET_LOOKING_FOR_OPTIONS = 'GET_LOOKING_FOR_OPTIONS'
export const CREATE_EXPERIMENT = 'CREATE_EXPERIMENT'
export const ANSWER_QUESTIONS = 'ANSWER_QUESTIONS'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const REMOVE_COMMENT_POST = 'REMOVE_COMMENT_POST'
export const GET_STATISTICS = 'GET_STATISTICS'
export const PARTIAL_UPDATE_EXPERIMENT = 'PARTIAL_UPDATE_EXPERIMENT'

// clear status of newly created experiment on form dismount
export const CLEAR_EXPERIMENT = 'CLEAR_EXPERIMENT'

// New experiment was created succesfully
export const NEW_EXPERIMENT = 'NEW_EXPERIMENT'

export const getExperiments = (filters = []) => dispatch => {
  let queryString = ''
  const allFilters = filters
  if (!('page_size' in filters)) {
    allFilters.page_size = 9
  }
  if (allFilters) {
    queryString = Object.keys(allFilters)
      .map(key => `${key}=${allFilters[key]}`)
      .join('&')
  }
  const url = `${DJANGO_URL}/experiments/?${queryString}`

  return dispatch({
    type: GET_EXPERIMENTS,
    payload: Get(url)
  })
}

export const getSingleExperiment = (slug: string) => dispatch => {
  const url = `${DJANGO_URL}/experiments/${slug}/`
  return dispatch({
    type: GET_SINGLE_EXPERIMENT,
    payload: Get(url)
  })
}

export const createCommentPost = (slug: string, fields: []) => dispatch => {
  const url = `${DJANGO_URL}/experiments/${slug}/posts/`
  const body = JSON.stringify(fields)
  return dispatch({
    type: CREATE_COMMENT_POST,
    payload: Post(url, body)
  })
}

export const removeCommentPost = (slug: string, postId: number) => dispatch => {
  const url = `${DJANGO_URL}/experiments/${slug}/posts/${postId}/`

  return dispatch({
    type: REMOVE_COMMENT_POST,
    payload: Delete(url)
  })
}

export const createComment = (
  slug: string,
  postId: number,
  fields: []
) => dispatch => {
  const url = `${DJANGO_URL}/experiments/${slug}/posts/${postId}/comments/`
  const body = JSON.stringify(fields)

  return dispatch({
    type: CREATE_COMMENT,
    payload: Post(url, body)
  })
}

export const removeComment = (
  slug: string,
  postId: number,
  commentId: number
) => dispatch => {
  const url = `${DJANGO_URL}/experiments/${slug}/posts/${postId}/comments/${commentId}/`

  return dispatch({
    type: REMOVE_COMMENT,
    payload: Delete(url)
  })
}

export const getLookingForOptions = () => dispatch => {
  const url = `${DJANGO_URL}/experiments/looking_for_options/`
  return dispatch({
    type: GET_LOOKING_FOR_OPTIONS,
    payload: Get(url)
  })
}

export const createExperiment = fields => dispatch => {
  const url = `${DJANGO_URL}/experiments/`
  return dispatch({
    type: CREATE_EXPERIMENT,
    payload: Post(url, JSON.stringify(fields))
  })
}

export const answerQuestions = (slug, fields) => dispatch => {
  const url = `${DJANGO_URL}/experiments/${slug}/answer_questions/`
  return dispatch({
    type: ANSWER_QUESTIONS,
    payload: Put(url, JSON.stringify(fields))
  })
}

export const createExperimentAndAnswerQuestions = (
  experimentFields,
  answerQuestionsFields
) => dispatch => {
  return dispatch(createExperiment(experimentFields)).then(
    ({
      action: {
        payload: { slug }
      }
    }) =>
      dispatch(answerQuestions(slug, answerQuestionsFields)).then(() =>
        dispatch({
          type: NEW_EXPERIMENT,
          meta: {
            slug
          }
        })
      )
  )
}

export const clearCreatedExperiment = () => dispatch => {
  dispatch({
    type: CLEAR_EXPERIMENT
  })
}

export const getStatistics = () => dispatch => {
  const url = `${DJANGO_URL}/experiments/statistics/`
  return dispatch({
    type: GET_STATISTICS,
    payload: Get(url)
  })
}

export const partialUpdateExperiment = (
  slug: string,
  fields: []
) => dispatch => {
  const url = `${DJANGO_URL}/experiments/${slug}/`
  const body = JSON.stringify(fields)
  return dispatch({
    type: PARTIAL_UPDATE_EXPERIMENT,
    payload: Patch(url, body)
  })
}
