export const state = () => ({
  list: [
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
  ],
})

export const mutations = {
  add(state, { name, sex, ageFrom, ageTo, weights }) {
    state.list.push({
      name,
      sex,
      ageFrom,
      ageTo,
      weights,
    })
  },

  update(state, { id, name, sex, ageFrom, ageTo, weights }) {
    const idx = state.list.findIndex((x) => x.id === id)
    Object.assign(state.list[idx], { id, name, sex, ageFrom, ageTo, weights })
  },

  remove(state, id) {
    const idx = state.list.findIndex((x) => x.id === id)
    state.list.splice(idx, 1)
  },
}

export const actions = {
  addCategoryAndCreatePools: (
    context,
    { name, sex, ageFrom, ageTo, weights }
  ) => {
    context.commit('add', { name, sex, ageFrom, ageTo, weights })
    weights.forEach((weight) => {
      context.commit(
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
  },
  updateCategoryAndRecreatePools: (
    context,
    { id, name, sex, ageFrom, ageTo, weights }
  ) => {
    context.commit('update', { id, name, sex, ageFrom, ageTo, weights })
    context.commit('pools/removeAllPoolsFromCategory', { id }, { root: true })
    weights.forEach((weight) => {
      context.commit(
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
  },
  removeCategoryAndPools: (context, { id }) => {
    context.commit('remove', id)
    context.commit('pools/removeAllPoolsFromCategory', { id }, { root: true })
  },
}
