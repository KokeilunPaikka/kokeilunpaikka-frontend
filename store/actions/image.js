// @flow

import { Post } from 'api'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { DJANGO_URL }
} = getConfig()

export const UPLOAD_IMAGE = 'UPLOAD_IMAGE'

export const uploadImage = (body, filetype, filename) => dispatch => {
  const url = `${DJANGO_URL}/uploads/images/`
  const headers = {
    'Content-Disposition': `attachment; filename=${filename}`,
    'Content-Type': filetype
  }

  return dispatch({
    type: UPLOAD_IMAGE,
    payload: Post(url, body, headers)
  })
}
