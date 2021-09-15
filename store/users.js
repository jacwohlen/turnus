export const state = () => ({
  user: null,
})

export const mutations = {
  setUser: (state, { authUser }) => {
    if (authUser) {
      const { uid, email, emailVerified } = authUser
      state.user = { uid, email, emailVerified }
    } else {
      state.user = null
    }
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
  signUp(_, { email, password }) {
    return this.$fire.auth.createUserWithEmailAndPassword(email, password)
  },
  signInWithEmail(_, { email, password }) {
    return this.$fire.auth.signInWithEmailAndPassword(email, password)
  },
  signOut() {
    return this.$fire.auth.signOut()
  },
}
