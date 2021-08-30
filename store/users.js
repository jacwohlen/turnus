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
    return this.$fire.auth.createUserWithEmailAndPassword(email, password)
  },
  signInWithEmail: (_, { email, password }) => {
    return this.$fire.auth.signInWithEmailAndPasword(email, password)
  },
  signOut: (_) => {
    return this.$fire.auth.signOut()
  },
}
