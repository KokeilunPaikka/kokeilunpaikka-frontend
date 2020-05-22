import { GET_THEMES, CREATE_THEME } from 'store/actions/themes'
import typeToReducer from 'type-to-reducer'

import produce from 'immer'

const initialState = {
  list: [],
  curated: [],
  isPending: false,
  error: null
}

export default typeToReducer(
  {
    [GET_THEMES]: {
      PENDING: state =>
        produce(state, draft => {
          draft.isPending = true
        }),

      REJECTED: (state, action) =>
        produce(state, draft => {
          draft.isPending = false
          draft.error = action.payload
        }),
      FULFILLED: (state, { payload }) => {
        const alphabeticalThemes = payload
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))

        return produce(state, draft => {
          draft.list = alphabeticalThemes
          draft.curated = alphabeticalThemes.filter(
            ({ is_curated: isCurated }) => isCurated
          )
          draft.isPending = false
        })
      }
    },
    [CREATE_THEME]: {
      PENDING: state =>
        produce(state, draft => {
          draft.isPending = true
        }),

      REJECTED: (state, action) =>
        produce(state, draft => {
          draft.isPending = false
          draft.error = action.payload
        }),
      FULFILLED: (state, { payload }) => {
        return produce(state, draft => {
          draft.list.push(payload)

          draft.isPending = false
        })
      }
    }
  },
  initialState
)
