import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'
import 'firebase/auth'

import { Category, WeightClass } from '~/types/models'

@Module({
  name: 'categories',
  stateFactory: true,
  namespaced: true,
})
export default class Categories extends VuexModule {
  list: Category[] = []

  @Mutation
  remove(id: string) {
    firebase.database().ref(`/categories/${id}`).remove()
  }

  @Action
  addCategoryAndCreatePools({ name, sex, ageFrom, ageTo, weights }: Category) {
    const ref = firebase.database().ref('/categories').push()
    const id = ref.key
    ref.set({ id, name, sex, ageFrom, ageTo, weights })

    // FIXME: call action to add pool instead of mutation
    // or use firebase directly in here and not pool...
    weights.forEach((weight) => {
      this.context.commit(
        'pools/add',
        {
          name: name + ' ' + weight.name,
          generated: true,
          generationSource: { id, name },
          criteria: {
            ageFrom,
            ageTo,
            sex,
            weightFrom: weight.weightFrom,
            weightTo: weight.weightTo,
          },
        },
        { root: true }
      )
    })
  }

  @Action
  updateCategoryAndRecreatePools({
    id,
    name,
    sex,
    ageFrom,
    ageTo,
    weights,
  }: Category) {
    // FIXME: Implement transaction
    // Update category
    firebase
      .database()
      .ref(`/categories/${id}`)
      .update({ name, sex, ageFrom, ageTo, weights })

    // Remove all existing pools
    this.context.commit(
      'pools/removeAllPoolsFromCategory',
      { categoryId: id },
      { root: true }
    )

    // Create the new pools
    weights.forEach((weight: WeightClass) => {
      this.context.commit(
        'pools/add',
        {
          name: name + ' ' + weight.name,
          generated: true,
          generationSource: { id, name },
          criteria: {
            ageFrom,
            ageTo,
            sex,
            weightFrom: weight.weightFrom,
            weightTo: weight.weightTo,
          },
        },
        { root: true }
      )
    })
  }

  @Action
  removeCategoryAndPools({ id }: { id: string }) {
    this.context.commit('remove', id)
    this.context.commit(
      'pools/removeAllPoolsFromCategory',
      { categoryId: id },
      { root: true }
    )
  }

  @Action
  init() {
    const action = firebaseAction(({ bindFirebaseRef }) => {
      return bindFirebaseRef('list', firebase.database().ref('categories'))
    }) as Function
    return action(this.context)
  }
}
