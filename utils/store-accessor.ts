import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Users from '~/store/users'
import Alert from '~/store/alert'

let userStore: Users
let alertStore: Alert

function initializeStores(store: Store<any>) {
  userStore = getModule(Users, store)
  alertStore = getModule(Alert, store)
}

export { initializeStores, userStore, alertStore }
