// @flow

import { Get, Post, Patch } from 'api'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { DJANGO_URL }
} = getConfig()

export const CREATE_USER = 'CREATE_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const CLEAR_REGISTER = 'CLEAR_REGISTER'
export const GET_DETAILS = 'GET_DETAILS'
export const GET_LOOKING_FOR_OPTIONS = 'GET_LOOKING_FOR_OPTIONS'
export const GET_STATUS_OPTIONS = 'GET_STATUS_OPTIONS'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const GET_USERS = 'GET_USERS'
export const GET_SINGLE_USER = 'GET_SINGLE_USER'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESET_PASSWORD_CONFIRM = 'RESET_PASSWORD_CONFIRM'
export const CLEAR_PASSWORD_LOCK = 'CLEAR_PASSWORD_LOCK'

export const createUser = (
  user: Object<{
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    sendExperimentNotification?: boolean
  }>
) => dispatch => {
  const {
    email,
    password,
    firstName,
    lastName,
    sendExperimentNotification
  } = user
  const body = JSON.stringify({
    email,
    password,
    first_name: firstName,
    last_name: lastName,
    send_experiment_notification: sendExperimentNotification
  })

  const url = `${DJANGO_URL}/users/`

  return dispatch({
    type: CREATE_USER,
    payload: Post(url, body)
  })
}

export const getDetails = () => dispatch => {
  const url = `${DJANGO_URL}/auth/user/`

  return dispatch({
    type: GET_DETAILS,
    payload: Get(url)
  })
}

export const loginUser = (
  user: Object<{ email: string, password: string }>
) => dispatch => {
  const url = `${DJANGO_URL}/auth/login/`

  const { email, password } = user

  const body = JSON.stringify({
    email,
    password
  })

  return dispatch({
    type: LOGIN_USER,
    payload: Post(url, body)
  }).then(res => {
    if (res.type === `${LOGIN_USER}_FULLFILLED`) {
      dispatch(getDetails())
    }
  })
}

export const clearRegisterThanks = () => dispatch => {
  return dispatch({
    type: CLEAR_REGISTER
  })
}

export const getLookingForOptions = () => dispatch => {
  const url = `${DJANGO_URL}/users/looking_for_options/`

  return dispatch({
    type: GET_LOOKING_FOR_OPTIONS,
    payload: Get(url)
  })
}

export const getStatusOptions = () => dispatch => {
  const url = `${DJANGO_URL}/users/status_options/`

  return dispatch({
    type: GET_STATUS_OPTIONS,
    payload: Get(url)
  })
}

export const updateProfile = profile => dispatch => {
  const url = `${DJANGO_URL}/auth/user/`

  return dispatch({
    type: UPDATE_PROFILE,
    payload: Patch(url, JSON.stringify(profile))
  })
}

export const getUsers = (filters = {}) => dispatch => {
  const allFilters = filters
  if (!('page_size' in filters)) {
    allFilters.page_size = 99
  }
  const url = `${DJANGO_URL}/users/`
  return dispatch({
    type: GET_USERS,
    payload: Get(url, allFilters)
  })
}

export const getSingleUser = id => dispatch => {
  const url = `${DJANGO_URL}/users/${id}/`
  return dispatch({
    type: GET_SINGLE_USER,
    payload: Get(url)
  })
}

export const logoutUser = () => dispatch => {
  const url = `${DJANGO_URL}/auth/logout/`

  return dispatch({
    type: LOGOUT_USER,
    payload: Post(url)
  })
}

export const changePassword = (
  password1: string,
  password2: string
) => dispatch => {
  const url = `${DJANGO_URL}/auth/password/change/`

  const body = JSON.stringify({
    new_password1: password1,
    new_password2: password2
  })

  return dispatch({
    type: CHANGE_PASSWORD,
    payload: Post(url, body)
  })
}

export const resetPassword = (email: string) => dispatch => {
  const url = `${DJANGO_URL}/auth/password/reset/`

  const body = JSON.stringify({
    email
  })

  return dispatch({
    type: RESET_PASSWORD,
    payload: Post(url, body)
  })
}

export const confirmPassword = (
  password1: string,
  password2: string,
  uid: string,
  token: string
) => dispatch => {
  const url = `${DJANGO_URL}/auth/password/reset/confirm/`

  const body = JSON.stringify({
    new_password1: password1,
    new_password2: password2,
    uid,
    token
  })

  return dispatch({
    type: RESET_PASSWORD_CONFIRM,
    payload: Post(url, body)
  })
}

export const clearPasswordResetLock = () => dispatch => {
  return dispatch({
    type: CLEAR_PASSWORD_LOCK
  })
}
