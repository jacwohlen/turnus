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
  list: Category[] = [
    {
      id: 0,
      name: 'Elite Male',
      sex: 'male',
      ageFrom: 1999,
      ageTo: 1980,
      weights: [
        { name: '-66kg', weight_from: 0, weight_to: 66 },
        { name: '-73kg', weight_from: 66, weight_to: 73 },
        { name: '-81kg', weight_from: 73, weight_to: 81 },
        { name: '-90kg', weight_from: 81, weight_to: 90 },
        { name: '-100kg', weight_from: 90, weight_to: 100 },
        { name: '+100kg', weight_from: 100, weight_to: Infinity },
      ],
    },
    {
      id: 1,
      name: 'Elite Female',
      sex: 'female',
      ageFrom: 1999,
      ageTo: 1990,
      weights: [
        { name: '-66kg', weight_from: 0, weight_to: 66 },
        { name: '-73kg', weight_from: 66, weight_to: 73 },
        { name: '-81kg', weight_from: 73, weight_to: 81 },
        { name: '-90kg', weight_from: 81, weight_to: 90 },
        { name: '-100kg', weight_from: 90, weight_to: 100 },
        { name: '+100kg', weight_from: 100, weight_to: Infinity },
      ],
    },
    {
      id: 2,
      name: 'Junior Male',
      sex: 'male',
      ageFrom: 2009,
      ageTo: 2000,
      weights: [
        { name: '-66kg', weight_from: 0, weight_to: 66 },
        { name: '-73kg', weight_from: 66, weight_to: 73 },
        { name: '-81kg', weight_from: 73, weight_to: 81 },
        { name: '-90kg', weight_from: 81, weight_to: 90 },
        { name: '-100kg', weight_from: 90, weight_to: 100 },
        { name: '+100kg', weight_from: 100, weight_to: Infinity },
      ],
    },
    {
      id: 3,
      name: 'Junior Female',
      sex: 'female',
      ageFrom: 2009,
      ageTo: 2000,
      weights: [
        { name: '-66kg', weight_from: 0, weight_to: 66 },
        { name: '-73kg', weight_from: 66, weight_to: 73 },
        { name: '-81kg', weight_from: 73, weight_to: 81 },
        { name: '-90kg', weight_from: 81, weight_to: 90 },
        { name: '-100kg', weight_from: 90, weight_to: 100 },
        { name: '+100kg', weight_from: 100, weight_to: Infinity },
      ],
    },
  ]

  @Mutation
  add({ name, sex, ageFrom, ageTo, weights }: Category) {
    firebase
      .database()
      .ref(`/categories`)
      .push({ name, sex, ageFrom, ageTo, weights })
  }

  @Mutation
  update({ id, name, sex, ageFrom, ageTo, weights }: Category) {
    firebase
      .database()
      .ref(`/categories/${id}`)
      .update({ name, sex, ageFrom, ageTo, weights })
  }

  @Mutation
  remove(id: string) {
    firebase.database().ref(`/categories/${id}`).remove()
  }

  @Action
  addCategoryAndCreatePools({ name, sex, ageFrom, ageTo, weights }: Category) {
    this.add({ name, sex, ageFrom, ageTo, weights })
    weights.forEach((weight) => {
      this.context.commit(
        'pools/add',
        {
          name: name + ' ' + weight.name,
          generated: true,
          source: { name, sex, ageFrom, ageTo, weights },
          criteria: {
            ageFrom,
            ageTo,
            sex,
            weight_from: weight.weight_from,
            weight_to: weight.weight_to,
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
    this.context.commit('update', { id, name, sex, ageFrom, ageTo, weights })
    this.context.commit(
      'pools/removeAllPoolsFromCategory',
      { id },
      { root: true }
    )
    weights.forEach((weight: WeightClass) => {
      this.context.commit(
        'pools/add',
        {
          name: name + ' ' + weight.name,
          generated: true,
          source: { id, name, sex, ageFrom, ageTo, weights },
          criteria: {
            ageFrom,
            ageTo,
            sex,
            weight_from: weight.weight_from,
            weight_to: weight.weight_to,
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
      { id },
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
