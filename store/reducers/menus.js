import { GET_MENU, SET_OPEN_CHILD_MENU_ID } from 'store/actions/menus'
import typeToReducer from 'type-to-reducer'

import produce from 'immer'

const initialState = {
  isPending: false,
  error: null,
  menus: {}
}

export default typeToReducer(
  {
    [GET_MENU]: {
      PENDING: state =>
        produce(state, draft => {
          draft.isPending = true
        }),

      REJECTED: (state, action) =>
        produce(state, draft => {
          draft.isPending = false
          draft.error = action.payload
        }),
      FULFILLED: (state, action) => {
        const {
          payload: { items, name }
        } = action

        return produce(state, draft => {
          draft.menus[name] = items
          draft.isPending = false
        })
      }
    },
    [SET_OPEN_CHILD_MENU_ID]: (state, action) =>
      produce(state, draft => {
        if (state.openChildMenu === action.payload) {
          draft.openChildMenu = null
        } else {
          draft.openChildMenu = action.payload
        }
      })
  },
  initialState
)
