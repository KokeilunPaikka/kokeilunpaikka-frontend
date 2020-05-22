const encodeQueryParams = params => {
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&')

  return query === '' ? query : `?${query}`
}

const getParameterByName = (name, url) => {
  const regex = new RegExp(
    '[?&]' + name.replace(/[\[\]]/g, '\\$&') + '(=([^&#]*)|&|#|$)'
  )
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return null
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export { encodeQueryParams, getParameterByName }
