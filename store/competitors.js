export const state = () => ({
  list: [
    {
      firstname: 'Andreas',
      lastname: 'Schmid',
      sex: 'male',
      birthday: '1900-03-24',
      club: 'JAC Wohlen',
      weight: 92,
    },
    {
      firstname: 'Benjamin',
      lastname: 'Wey',
      sex: 'male',
      birthday: '1900-02-24',
      club: 'JAC Wohlen',
      weight: 73,
    },
    {
      firstname: 'Samuel',
      lastname: 'Wey',
      sex: 'male',
      birthday: '1900-01-24',
      club: 'JAC Wohlen',
      weight: 66,
    },
  ],
})

export const mutations = {
  add(state, { firstname, lastname, sex, birthday, club, weight }) {
    state.list.push({
      firstname,
      lastname,
      sex,
      birthday,
      club,
      weight,
    })
  },

  remove(state, { c }) {
    state.list.splice(state.list.indexOf(c), 1)
  },
}
