// @flow

import produce from 'immer'

const commonState = {
  list: [],
  byId: {},
  isPending: false,
  error: null,
  next: null,
  previous: null,
  count: null
}

const commonListReducer = {
  PENDING: state =>
    produce(state, draft => {
      draft.isPending = true
    }),

  REJECTED: (state, action) =>
    produce(state, draft => {
      draft.isPending = false
      draft.error = action.payload
    }),
  FULFILLED: (state, { payload: { next, previous, results, count } }) => {
    return produce(state, draft => {
      draft.list = results
      draft.next = next
      draft.previous = previous
      draft.count = count
      draft.isPending = false
    })
  }
}

const commonSingleByIdItemReduer = {
  PENDING: state =>
    produce(state, draft => {
      draft.isPending = true
    }),

  REJECTED: (state, action) =>
    produce(state, draft => {
      draft.isPending = false
      draft.error = action.payload
    }),
  FULFILLED: (state, { payload, payload: { id } }) => {
    return produce(state, draft => {
      draft.byId[id] = payload
      draft.isPending = false
    })
  }
}
const commonSingleBySlugItemReduer = {
  PENDING: state =>
    produce(state, draft => {
      draft.isPending = true
    }),

  REJECTED: (state, action) =>
    produce(state, draft => {
      draft.isPending = false
      draft.error = action.payload
    }),
  FULFILLED: (state, { payload, payload: { slug } }) => {
    return produce(state, draft => {
      draft.byId[slug] = payload
      draft.isPending = false
    })
  }
}

export {
  commonState,
  commonListReducer,
  commonSingleByIdItemReduer,
  commonSingleBySlugItemReduer
}
