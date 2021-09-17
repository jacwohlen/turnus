import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Users from '~/store/users'

let userStore: Users

function initializeStores(store: Store<any>) {
  userStore = getModule(Users, store)
}

export { initializeStores, userStore }
