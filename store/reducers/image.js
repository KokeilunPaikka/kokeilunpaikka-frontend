import { UPLOAD_IMAGE } from 'store/actions/image'
import typeToReducer from 'type-to-reducer'

import produce from 'immer'

const initialState = {
  isPending: false,
  error: null
}

export default typeToReducer(
  {
    [UPLOAD_IMAGE]: {
      PENDING: state =>
        produce(state, draft => {
          draft.isPending = true
        }),

      REJECTED: (state, action) =>
        produce(state, draft => {
          draft.isPending = false
          draft.error = action.payload
        }),
      FULFILLED: state => {
        return produce(state, draft => {
          draft.isPending = false
        })
      }
    }
  },
  initialState
)
