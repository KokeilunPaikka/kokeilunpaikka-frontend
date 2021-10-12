import { GET_STAGE_QUESTIONS, GET_STAGES } from 'store/actions/stages'
import typeToReducer from 'type-to-reducer'

import produce from 'immer'

const initialState = {
  questions: {},
  stages: [],
  isPending: false,
  error: null
}

export default typeToReducer(
  {
    [GET_STAGE_QUESTIONS]: {
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
        const { payload, meta } = action
        return produce(state, draft => {
          draft.questions[meta] = payload
          draft.isPending = false
        })
      }
    },
    [GET_STAGES]: {
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
          draft.stages = payload
          draft.isPending = false
        })
      }
    }
  },
  initialState
)
