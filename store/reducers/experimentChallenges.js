import {
  GET_CHALLENGES,
  GET_SINGLE_CHALLENGE
} from 'store/actions/experimentChallenges'

import {
  commonState,
  commonListReducer,
  commonSingleBySlugItemReduer
} from 'store/common/reducers'

import typeToReducer from 'type-to-reducer'

const initialState = commonState

export default typeToReducer(
  {
    [GET_CHALLENGES]: commonListReducer,
    [GET_SINGLE_CHALLENGE]: commonSingleBySlugItemReduer
  },
  initialState
)
