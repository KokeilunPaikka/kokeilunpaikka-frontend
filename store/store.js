import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers/index'

import errorMiddleware from './middleware/promiseError'

export const initStore = preloadedState => {
  const middlewares = [thunkMiddleware, errorMiddleware, promise]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers)

  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(composedEnhancers)
  )

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}

export default initStore
