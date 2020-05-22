import { Get } from 'api/index'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { WORDPRESS_URL }
} = getConfig()

export const GET_MENU = 'GET_MENU'
export const GET_LOCATION = 'GET_LOCATION'
export const SET_OPEN_CHILD_MENU_ID = 'SET_OPEN_CHILD_MENU_ID'

export const getMenu = menuName => dispatch => {
  const url = `${WORDPRESS_URL}/menus/v1/menus/${menuName}`
  return dispatch({
    type: GET_MENU,
    payload: Get(url)
  })
}
export const getLocation = locationName => dispatch => {
  const url = `${WORDPRESS_URL}/menus/v1/locations/${locationName}`
  return dispatch({
    type: GET_MENU,
    payload: Get(url)
  })
}
export const setOpenChildMenuId = id => dispatch => {
  return dispatch({
    type: SET_OPEN_CHILD_MENU_ID,
    payload: id
  })
}
