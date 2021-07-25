import { auth } from '~/plugins/firebase.js'

export const state = () => ({
  user: '',
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
}

export const getters = {
  user(state) {
    return state.user
  },

  isAuthenticated(state) {
    return !!state.user
  },
}

export const actions = {
  signUp: (_, { email, password }) => {
    return auth.createUserWithEmailAndPassword(email, password)
  },
  signInWithEmail: (_, { email, password }) => {
    return auth.signInWithEmailAndPasword(email, password)
  },
  signOut: (_) => {
    return auth.signOut()
  },
}
