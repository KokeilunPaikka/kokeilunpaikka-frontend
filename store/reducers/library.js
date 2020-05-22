import {
  commonState,
  commonListReducer, commonSingleBySlugItemReduer,
} from 'store/common/reducers'

import typeToReducer from 'type-to-reducer'
import { GET_LIBRARY_ITEMS, GET_LIBRARY_ITEM } from 'store/actions/library'

const initialState = commonState

export default typeToReducer(
  {
    [GET_LIBRARY_ITEMS]: commonListReducer,
    [GET_LIBRARY_ITEM]: commonSingleBySlugItemReduer
  },
  initialState
)
