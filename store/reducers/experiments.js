import {
  GET_EXPERIMENTS,
  GET_SINGLE_EXPERIMENT,
  CREATE_COMMENT_POST,
  CREATE_COMMENT,
  GET_LOOKING_FOR_OPTIONS,
  CREATE_EXPERIMENT,
  ANSWER_QUESTIONS,
  CLEAR_EXPERIMENT,
  NEW_EXPERIMENT,
  GET_STATISTICS,
  PARTIAL_UPDATE_EXPERIMENT
} from 'store/actions/experiments'

import {
  commonState,
  commonListReducer,
  commonSingleByIdItemReduer,
  commonSingleBySlugItemReduer
} from 'store/common/reducers'

import { produce } from 'immer'

import typeToReducer from 'type-to-reducer'

const createCommentPostReducer = {
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

const initialState = {
  ...commonState,
  options: [],
  statistics: [],
  requests: {
    experimentWithQuestions: {
      experimentPending: false,
      questionsPending: false,
      error: null,
      justCreated: false
    }
  }
}

export default typeToReducer(
  {
    [GET_EXPERIMENTS]: commonListReducer,
    [GET_SINGLE_EXPERIMENT]: commonSingleBySlugItemReduer,
    [CREATE_COMMENT_POST]: createCommentPostReducer,
    [CREATE_COMMENT]: createCommentPostReducer,
    [GET_LOOKING_FOR_OPTIONS]: {
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
          draft.options = payload
          draft.isPending = false
        })
      }
    },
    [GET_STATISTICS]: {
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
          draft.statistics = payload
          draft.isPending = false
        })
      }
    },
    [CREATE_EXPERIMENT]: {
      PENDING: state =>
        produce(state, draft => {
          draft.isPending = true
          draft.requests.experimentWithQuestions.experimentPending = true
        }),

      REJECTED: (state, { payload }) =>
        produce(state, draft => {
          draft.isPending = false
          draft.requests.experimentWithQuestions.experimentPending = false
          draft.requests.experimentWithQuestions.error = payload
          draft.error = payload
        }),
      FULFILLED: state => {
        return produce(state, draft => {
          //  draft.options = payload
          draft.requests.experimentWithQuestions.experimentPending = false
          draft.requests.experimentWithQuestions.error = null
          draft.isPending = false
          draft.error = null
        })
      }
    },
    [PARTIAL_UPDATE_EXPERIMENT]: {
      PENDING: state =>
        produce(state, draft => {
          draft.isPending = true
        }),

      REJECTED: (state, { payload }) =>
        produce(state, draft => {
          draft.isPending = false
          draft.error = payload
        }),
      FULFILLED: state => {
        return produce(state, draft => {
          //  draft.options = payload
          draft.isPending = false
          draft.error = null
        })
      }
    },
    [ANSWER_QUESTIONS]: {
      PENDING: state =>
        produce(state, draft => {
          draft.isPending = true
          draft.requests.experimentWithQuestions.questionsPending = true
        }),

      REJECTED: (state, { payload }) =>
        produce(state, draft => {
          draft.isPending = false
          draft.requests.experimentWithQuestions.questionsPending = false
          draft.requests.experimentWithQuestions.error = payload
          draft.error = payload
        }),
      FULFILLED: state => {
        return produce(state, draft => {
          // draft.options = payload
          draft.requests.experimentWithQuestions.questionsPending = false
          draft.requests.experimentWithQuestions.error = null
          draft.isPending = false
          draft.error = null
        })
      }
    },
    [NEW_EXPERIMENT]: state =>
      produce(state, draft => {
        draft.requests.experimentWithQuestions.justCreated = true
      }),
    [CLEAR_EXPERIMENT]: state =>
      produce(state, draft => {
        draft.requests.experimentWithQuestions.justCreated = false
      })
  },
  initialState
)
