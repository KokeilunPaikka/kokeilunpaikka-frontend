import { GET_EDITABLE_TEXTS } from 'store/actions/texts'
import typeToReducer from 'type-to-reducer'

import produce from 'immer'

const initialState = {
  isPending: false,
  error: null,
  texts: []
}

export default typeToReducer(
  {
    [GET_EDITABLE_TEXTS]: {
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
        return produce(state, draft => {
          draft.isPending = false
          draft.texts = action.payload
        })
      }
    }
  },
  initialState
)
