import { GET_ARTICLE, GET_ARTICLES } from 'store/actions/blog'
import typeToReducer from 'type-to-reducer'

import produce from 'immer'

const initialState = {
  items: [],
  isPending: false,
  error: null,
  pagination: null,
  currentArticle: {}
}

export default typeToReducer(
  {
    [GET_ARTICLES]: {
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
        const { payload } = action
        return produce(state, draft => {
          draft.items = payload.items
          draft.pagination = payload.responseHeaders
          draft.isPending = false
        })
      }
    },
    [GET_ARTICLE]: {
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
        const { payload } = action
        return produce(state, draft => {
          draft.currentArticle = payload
          draft.isPending = false
        })
      }
    }
  },
  initialState
)
