import { encodeQueryParams } from 'utils/url'
import fetch from 'isomorphic-unfetch'
import { i18n } from 'i18n'

import ApiError from './ApiError'

const ApiCall = (path, method, body, overrideHeaders = null) => {
  let headers = {}
  if (overrideHeaders == null) {
    headers = {
      'Content-Type': 'application/json'
    }
  } else {
    headers = overrideHeaders
  }

  if (process.browser) {
    const token = sessionStorage.getItem('token') || null
    headers.Authorization =
      token && token !== 'undefined' ? `Token ${token}` : null
  }

  if (i18n && i18n.language && headers['Accept-Language'] !== null) {
    headers['Accept-Language'] = i18n.language
  }

  return fetch(path, {
    headers,
    method,
    mode: 'cors',
    body: body || undefined
  }).then(response =>
    response[response.status === 204 ? 'text' : 'json']()
      .then(json => {
        if (!response.ok) {
          const Error = new ApiError(response, json)

          return Promise.reject(Error)
        }

        const respHeaders = response.headers
        const responseHeaders = {}
        if (respHeaders.has('X-WP-Total')) {
          responseHeaders['X-WP-Total'] = respHeaders.get('X-WP-Total')
        }
        if (respHeaders.has('X-WP-TotalPages')) {
          responseHeaders['X-WP-TotalPages'] = respHeaders.get(
            'X-WP-TotalPages'
          )
        }

        if (Object.keys(responseHeaders).length > 0) {
          return {
            items: json,
            responseHeaders
          }
        }

        return json
      })
      .catch(error => Promise.reject(error))
  )
}

export function Get(path, params = {}, overrideHeaders = null) {
  return ApiCall(path + encodeQueryParams(params), 'GET', null, overrideHeaders)
}

export function Post(path, body, overrideHeaders = null) {
  return ApiCall(path, 'POST', body, overrideHeaders)
}

export function Put(path, body) {
  return ApiCall(path, 'PUT', body)
}

export function Patch(path, body) {
  return ApiCall(path, 'PATCH', body)
}

export function Delete(path) {
  return ApiCall(path, 'DELETE', null)
}
