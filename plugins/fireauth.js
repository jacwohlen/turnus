import { auth } from '~/plugins/firebase.js'

export default (context) => {
  const { store } = context

  /* eslint-disable  @typescript-eslint/no-unused-vars */
  return new Promise((resolve, reject) => {
    /* eslint-enable  @typescript-eslint/no-unused-vars */
    auth.onAuthStateChanged((user) => {
      // here is you would want to build your user
      // object, but for now, we'll just take everything
      store.commit('users/setUser', user)
      resolve()
    })
  })
}
