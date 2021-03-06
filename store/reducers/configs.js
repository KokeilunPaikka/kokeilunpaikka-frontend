import { GET_CONFIGURATION } from 'store/actions/configs'
import typeToReducer from 'type-to-reducer'

import produce from 'immer'

const initialState = {
  isPending: false,
  error: null,
  config: {
    top_menu_opacity: 0,
    front_page_image_opacity: 0.01
  }
}

export default typeToReducer(
  {
    [GET_CONFIGURATION]: {
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
          const [config] = action.payload
          if (config) {
            draft.config = config
          }
        })
      }
    }
  },
  initialState
)
