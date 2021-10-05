import Vuex, { Store } from 'vuex'
import { createLocalVue } from '@vue/test-utils'

import firebase from 'firebase/app'

import Scheduler from '~/store/scheduler'
import { initializeStores, actions, mutations, plugins } from '~/store'

const localVue = createLocalVue()
localVue.use(Vuex)

const storeOptions = {
  actions,
  mutations,
  plugins,
  modules: {
    scheduler: Scheduler,
  },
}

const createStore = (storeOptions: any = {}): Store<{ scheduler: any }> =>
  new Vuex.Store({ ...storeOptions })

const store = createStore(storeOptions)
initializeStores(store)

const firebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}
const app = firebase.initializeApp(firebaseOptions)
firebase.database(app).useEmulator('localhost', 9000)
