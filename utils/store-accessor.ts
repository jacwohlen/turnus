import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Users from '~/store/users'
import Alert from '~/store/alert'
import Competitors from '~/store/competitors'
import Categories from '~/store/categories'

let userStore: Users
let alertStore: Alert
let competitorsStore: Competitors
let categoriesStore: Categories

function initializeStores(store: Store<any>) {
  userStore = getModule(Users, store)
  alertStore = getModule(Alert, store)
  competitorsStore = getModule(Competitors, store)
  categoriesStore = getModule(Categories, store)
}

export {
  initializeStores,
  userStore,
  alertStore,
  competitorsStore,
  categoriesStore,
}
