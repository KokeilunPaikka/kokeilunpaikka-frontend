const isPromise = p =>
  typeof p === 'object' && p !== null && typeof p.then === 'function'

export default function errorMiddleware() {
  return next => action => {
    const { payload } = action
    // If not a promise, continue on
    if (!isPromise(payload)) {
      return next(action)
    }

    // Dispatch initial pending promise, but catch any errors
    return next(action).catch(err => err)
  }
}
