export const state = () => ({
  list: [
    {
      id: 0,
      firstname: 'Andreas',
      lastname: 'Schmid',
      sex: 'male',
      birthyear: '1990',
      club: 'JAC Wohlen',
      weight: 92,
      weight_measured: 92.3,
    },
    {
      id: 1,
      firstname: 'Benjamin',
      lastname: 'Wey',
      sex: 'male',
      birthyear: '1988',
      club: 'JAC Wohlen',
      weight: 73,
      weight_measured: null,
    },
    {
      id: 2,
      firstname: 'Samuel',
      lastname: 'Wey',
      sex: 'male',
      birthyear: '1992',
      club: 'JAC Wohlen',
      weight: 66,
      weight_measured: null,
    },
    {
      id: 3,
      firstname: 'Manuela',
      lastname: 'Scherer',
      sex: 'female',
      birthyear: '1990',
      club: 'JAC Wohlen',
      weight: 60,
      weight_measured: null,
    },
  ],
})

export const mutations = {
  add(state, { firstname, lastname, sex, birthyear, club, weight }) {
    state.list.push({
      firstname,
      lastname,
      sex,
      birthyear,
      club,
      weight,
    })
  },

  remove(state, { c }) {
    state.list.splice(state.list.indexOf(c), 1)
  },

  addWeight(state, { id, weight }) {
    const idx = state.list.findIndex((x) => x.id === id)
    Object.assign(state.list[idx], { id, weight_measured: weight })
  },

  removeWeight(state, id) {
    const idx = state.list.findIndex((x) => x.id === id)
    Object.assign(state.list[idx], { id, weight_measured: null })
  },
}
