export const state = () => ({
  list: [
    {
      id: 0,
      name: 'Elite Male - 80kg',
      size: 2,
      system: 'Round Robin',
      status: 'not ready',
      tatami_scheduled: null,
      competitors: [
        {
          id: 1,
          firstname: 'Benjamin',
          lastname: 'Wey',
          sex: 'male',
          birthday: '1900-02-24',
          club: 'JAC Wohlen',
          weight: 73,
          weight_measured: 72.5,
        },
        {
          id: 2,
          firstname: 'Samuel',
          lastname: 'Wey',
          sex: 'male',
          birthday: '1900-01-24',
          club: 'JAC Wohlen',
          weight: 66,
          weight_measured: 59.1,
        },
      ],
    },
    {
      id: 1,
      name: 'Elite Female - 80kg',
      size: 3,
      system: 'Round Robin',
      status: 'not ready',
      tatami_scheduled: null,
      competitors: [
        {
          id: 3,
          firstname: 'Manuela',
          lastname: 'Scherer',
          sex: 'female',
          birthday: '1990-02-10',
          club: 'JAC Wohlen',
          weight: 60,
          weight_measured: 60.0,
        },
        {
          id: 4,
          firstname: 'Fabienne',
          lastname: 'Wey',
          sex: 'female',
          birthday: '1990-02-10',
          club: 'JAC Wohlen',
          weight: 60,
          weight_measured: 60.3,
        },
        {
          id: 5,
          firstname: 'Sandra',
          lastname: 'Weber',
          sex: 'female',
          birthday: '1988-02-10',
          club: 'JAC Wohlen',
          weight: 60.1,
          weight_measured: 60.1,
        },
      ],
    },
  ],
})

export const mutations = {
  ready(state, id) {
    const idx = state.list.findIndex((x) => x.id === id)
    Object.assign(state.list[idx], { id, status: 'ready' })
  },

  notReady(state, id) {
    const idx = state.list.findIndex((x) => x.id === id)
    Object.assign(state.list[idx], { id, status: 'not ready' })
  },

  schedule(state, { id, tatamiId }) {
    const idx = state.list.findIndex((x) => x.id === id)
    Object.assign(state.list[idx], { id, tatami_scheduled: tatamiId })
  },

  unschedule(state, id) {
    const idx = state.list.findIndex((x) => x.id === id)
    Object.assign(state.list[idx], { id, tatami_scheduled: null })
  },
}
