import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Users from '~/store/users'
import Alert from '~/store/alert'
import Competitors from '~/store/competitors'
import Categories from '~/store/categories'
import Pools from '~/store/pools'
import Scheduler from '~/store/scheduler'

let userStore: Users
let alertStore: Alert
let competitorsStore: Competitors
let categoriesStore: Categories
let poolsStore: Pools
let schedulerStore: Scheduler

function initializeStores(store: Store<any>) {
  userStore = getModule(Users, store)
  alertStore = getModule(Alert, store)
  competitorsStore = getModule(Competitors, store)
  categoriesStore = getModule(Categories, store)
  poolsStore = getModule(Pools, store)
  schedulerStore = getModule(Scheduler, store)
}

export {
  initializeStores,
  userStore,
  alertStore,
  competitorsStore,
  categoriesStore,
  poolsStore,
  schedulerStore,
}
