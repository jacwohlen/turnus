import Cookie from 'js-cookie'

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, { uid, email, emailVerified }) {
    state.user = { uid, email, emailVerified }
  },
  unsetUser(state) {
    state.user = null
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
  async signInWithEmail({ dispatch }, { email, password }) {
    const ret = await this.$fire.auth.signInWithEmailAndPassword(
      email,
      password
    )
    const authUser = ret.user
    // force state update, as onAuthStateChanged has delay and messes up
    // redirection after login
    dispatch('onAuthStateChanged', { authUser })
  },
  signOut() {
    return this.$fire.auth.signOut()
  },
  async onAuthStateChanged({ commit }, { authUser }) {
    if (authUser) {
      const { uid, email, emailVerified } = authUser
      commit('setUser', { uid, email, emailVerified })
      // save user as cookie for server (SSR workaround)
      const token = await authUser.getIdToken()
      Cookie.set('access-token', token)
    } else {
      commit('unsetUser')
      Cookie.remove('access-token')
    }
  },
}
