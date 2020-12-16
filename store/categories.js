export const state = () => ({
  list: [
    {
      id: 0,
      name: 'Elite Male',
      sex: 'male',
      ages: '1990-1999',
      weights: [-66, -73, -81, -90, -100, 100],
    },
    {
      id: 1,
      name: 'Elite Female',
      sex: 'female',
      ages: '1990-1999',
      weights: [-66, -73, -81, -90, -100, 100],
    },
    {
      id: 2,
      name: 'Junior Male',
      sex: 'male',
      ages: '2000-2009',
      weights: [-66, -73, -81, -90, -100, 100],
    },
    {
      id: 3,
      name: 'Junior Female',
      sex: 'female',
      ages: '2000-2009',
      weights: [-66, -73, -81, -90, -100, 100],
    },
  ],
})

export const mutations = {
  add(state, { name, sex, ages, weights }) {
    state.list.push({
      name,
      sex,
      ages,
      weights,
    })
  },

  update(state, { id, name, sex, ages, weights }) {
    const idx = state.list.findIndex((x) => x.id === id)
    Object.assign(state.list[idx], { id, name, sex, ages, weights })
  },

  remove(state, { c }) {
    state.list.splice(state.list.indexOf(c), 1)
  },
}
