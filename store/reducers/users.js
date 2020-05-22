import {
  CREATE_USER,
  CLEAR_REGISTER,
  LOGIN_USER,
  GET_DETAILS,
  GET_LOOKING_FOR_OPTIONS,
  GET_STATUS_OPTIONS,
  UPDATE_PROFILE,
  GET_USERS,
  GET_SINGLE_USER,
  LOGOUT_USER,
  CHANGE_PASSWORD,
  RESET_PASSWORD,
  CLEAR_PASSWORD_LOCK,
  RESET_PASSWORD_CONFIRM
} from 'store/actions/users'
import typeToReducer from 'type-to-reducer'

import produce from 'immer'
import {
  commonListReducer,
  commonSingleByIdItemReduer,
  commonState
} from 'store/common/reducers'

const initialState = {
  ...commonState,
  user: {},
  justRegistered: false,
  key: process.browser ? sessionStorage.getItem('token') : null,
  isLogged: false,
  isPending: false,
  error: {
    messages: {}
  },
  lookingForOptions: [],
  statusOptions: [],
  users: [],
  passwordReset: false
}

export default typeToReducer(
  {
    [CREATE_USER]: {
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
          draft.user = payload
          draft.justRegistered = true
          draft.isPending = false
        })
      }
    },
    [LOGIN_USER]: {
      PENDING: state =>
        produce(state, draft => {
          draft.isPending = true
        }),

      REJECTED: (state, { payload }) =>
        produce(state, draft => {
          draft.isPending = false
          draft.error = payload
        }),
      FULFILLED: (state, { payload: { key } }) => {
        sessionStorage.setItem('token', key)
        return produce(state, draft => {
          draft.key = key
          draft.isLogged = true
          draft.isPending = false
        })
      }
    },
    [GET_DETAILS]: {
      PENDING: state =>
        produce(state, draft => {
          draft.isPending = true
        }),

      REJECTED: (state, { payload }) =>
        produce(state, draft => {
          draft.isPending = false
          draft.error = payload
        }),
      FULFILLED: (state, { payload }) => {
        return produce(state, draft => {
          draft.user = payload
          draft.isLogged = true

          draft.isPending = false
        })
      }
    },
    [CLEAR_REGISTER]: state =>
      produce(state, draft => {
        draft.justRegistered = false
      }),
    [GET_LOOKING_FOR_OPTIONS]: {
      PENDING: state =>
        produce(state, draft => {
          draft.isPending = true
        }),

      REJECTED: (state, { payload }) =>
        produce(state, draft => {
          draft.isPending = false
          draft.error = payload
        }),
      FULFILLED: (state, { payload }) => {
        return produce(state, draft => {
          draft.lookingForOptions = payload
          draft.isPending = false
        })
      }
    },
    [GET_STATUS_OPTIONS]: {
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
          draft.statusOptions = payload
        })
      }
    },
    [UPDATE_PROFILE]: {
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
          draft.user = payload
          draft.error = {}
        })
      }
    },
    [LOGOUT_USER]: {
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
        sessionStorage.removeItem('token')
        return produce(state, draft => {
          draft.user = {}
          draft.key = null
          draft.isLogged = false
          draft.isPending = false
        })
      }
    },
    [CHANGE_PASSWORD]: {
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
          draft.error = initialState.error
        })
      }
    },
    [RESET_PASSWORD]: {
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
          draft.error = initialState.error
          draft.passwordReset = true
        })
      }
    },
    [RESET_PASSWORD_CONFIRM]: {
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
          draft.error = initialState.error
        })
      }
    },
    [CLEAR_PASSWORD_LOCK]: state =>
      produce(state, draft => {
        draft.passwordReset = false
      }),
    [GET_USERS]: commonListReducer,
    [GET_SINGLE_USER]: commonSingleByIdItemReduer
  },
  initialState
)
