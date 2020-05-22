import { Get } from 'api/index'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { WORDPRESS_URL }
} = getConfig()

export const GET_ARTICLES = 'GET_ARTICLES'
export const GET_ARTICLE = 'GET_ARTICLE'

export const getArticles = (filters = []) => dispatch => {
  let queryString = ''
  const allFilters = filters
  if (!('per_page' in filters)) {
    allFilters.per_page = 9
  }
  if (allFilters) {
    queryString = Object.keys(allFilters)
      .map(key => `${key}=${allFilters[key]}`)
      .join('&')
  }

  const url = `${WORDPRESS_URL}/wp/v2/posts/?_embed&${queryString}`
  return dispatch({
    type: GET_ARTICLES,
    payload: Get(url)
  })
}
export const getArticle = (slug, preview, thumbnail, isNew, postType) => dispatch => {
  let url = `${WORDPRESS_URL}/kokeilunpaikka/v1/post/${slug}/?post_type=${postType}`
  if (preview) {
    url = `${url}&preview=${preview}`

    if (thumbnail) {
      url = `${url}&thumbnail=${thumbnail}`
    }

    if (isNew) {
      url = `${url}&new=true`
    }
  }

  return dispatch({
    type: GET_ARTICLE,
    payload: Get(url)
  })
}
