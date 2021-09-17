import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import Cookie from 'js-cookie'

import firebase from 'firebase/app'
import 'firebase/auth'

interface User {
  uid: string
  email: string | null
  emailVerified: boolean
}

interface LoginData {
  email: string
  password: string
}

interface AuthStateChanged {
  authUser: firebase.User | null
}

@Module({
  name: 'users',
  stateFactory: true,
  namespaced: true,
})
export default class Users extends VuexModule {
  user: User | null = null

  get isAuthenticated() {
    return !!this.user
  }

  @Mutation
  setUser(authUser: User) {
    this.user = authUser
  }

  @Mutation
  unsetUser() {
    this.user = null
  }

  @Action({ rawError: true })
  async signUp({ email, password }: LoginData) {
    const ret = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    const authUser: firebase.User | null = ret.user
    // force state update, as onAuthStateChanged has delay and messes up
    // redirection after login
    this.onAuthStateChanged({ authUser })
  }

  @Action({ rawError: true })
  async signInWithEmail({ email, password }: LoginData) {
    const ret = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    const authUser: firebase.User | null = ret.user
    // force state update, as onAuthStateChanged has delay and messes up
    // redirection after login
    this.onAuthStateChanged({ authUser })
  }

  @Action
  signOut() {
    return firebase.auth().signOut()
  }

  @Action
  // any because of integration with firebase
  async onAuthStateChanged({ authUser }: AuthStateChanged) {
    if (authUser) {
      const { uid, email, emailVerified } = authUser
      this.setUser({ uid, email, emailVerified })
      // save user as cookie for server (SSR workaround)
      const token = await authUser.getIdToken()
      Cookie.set('access-token', token)
    } else {
      this.unsetUser()
      Cookie.remove('access-token')
    }
  }
}
