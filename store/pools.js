export const state = () => ({
  list: [
    {
      id: 99,
      name: 'Elite Male - 81kg',
      system: 'Round Robin',
      status: 'not ready',
      tatami_scheduled: null,
      competitors: [
        {
          id: 1,
          firstname: 'Benjamin',
          lastname: 'Wey',
          sex: 'male',
          birthyear: '1900-02-24',
          club: 'JAC Wohlen',
          weight: 73,
          weightMeasured: 72.5,
        },
        {
          id: 2,
          firstname: 'Samuel',
          lastname: 'Wey',
          sex: 'male',
          birthyear: '1900-01-24',
          club: 'JAC Wohlen',
          weight: 66,
          weightMeasured: 59.1,
        },
      ],
      generated: true,
      generation_source: { id: 0, name: 'Elite Male' },
      criteria: {
        sex: 'male',
        ageFrom: 1999,
        ageTo: 1980,
        weight_from: 73,
        weight_to: 81,
      },
    },
    {
      id: 98,
      name: 'Elite Female - 66kg',
      system: 'Round Robin',
      status: 'not ready',
      tatami_scheduled: null,
      competitors: [
        {
          id: 3,
          firstname: 'Manuela',
          lastname: 'Scherer',
          sex: 'female',
          birthyear: '1990-02-10',
          club: 'JAC Wohlen',
          weight: 60,
          weightMeasured: 60.0,
        },
        {
          id: 4,
          firstname: 'Fabienne',
          lastname: 'Wey',
          sex: 'female',
          birthyear: '1990-02-10',
          club: 'JAC Wohlen',
          weight: 60,
          weightMeasured: 60.3,
        },
        {
          id: 5,
          firstname: 'Sandra',
          lastname: 'Weber',
          sex: 'female',
          birthyear: '1988-02-10',
          club: 'JAC Wohlen',
          weight: 60.1,
          weightMeasured: 60.1,
        },
      ],
      generated: true,
      generation_source: { id: 1, name: 'Elite Female' },
      criteria: {
        sex: 'female',
        ageFrom: 1999,
        ageTo: 1980,
        weight_from: 53,
        weight_to: 66,
      },
    },
    {
      id: 97,
      name: 'Special Needs',
      system: 'Round Robin',
      status: 'not ready',
      tatami_scheduled: null,
      competitors: [],
      generated: false,
      generation_source: null,
      criteria: null,
    },
  ],
})

export const mutations = {
  add(state, { name, generated, source, criteria }) {
    state.list.push({
      id: state.list.length,
      name,
      system: 'Round Robin',
      status: 'not ready',
      tatami_scheduled: null,
      competitors: [],
      generated,
      generation_source: source,
      criteria,
    })
  },
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
  addCompetitorToPool(state, { competitor, pool }) {
    const idx = state.list.findIndex((x) => x.id === pool.id)
    state.list[idx].competitors.push(competitor)
  },
  removeCompetitorFromAllPools(state, { competitor }) {
    state.list.forEach((pool) => {
      const idx = pool.competitors.findIndex((c) => c.id === competitor.id)
      if (idx >= 0) {
        pool.competitors.splice(idx, 1)
      }
    })
  },
  removeCompetitorFromPool(state, { competitor, pool }) {
    const idx = state.list.findIndex((x) => x.id === pool.id)
    const cidx = state.list[idx].competitors.findIndex(
      (c) => c.id === competitor.id
    )
    state.list[idx].competitors.splice(cidx, 1)
  },

  removeAllPoolsFromCategory(state, { id }) {
    let i = state.list.length
    while (i--) {
      const pool = state.list[i]
      if (pool.generated === true && pool.generation_source.id === id) {
        state.list.splice(i, 1)
      }
    }
  },
}

export const getters = {
  getPotentialPools(state) {
    return function (competitor) {
      return state.list.filter(function (e) {
        return (
          e.generated === true && // only generated pools have criterias
          e.criteria.ageFrom > competitor.birthyear &&
          e.criteria.ageTo <= competitor.birthyear &&
          e.criteria.sex === competitor.sex &&
          e.criteria.weight_from < competitor.weight &&
          e.criteria.weight_to >= competitor.weight
        )
      })
    }
  },
  getPoolsByCompetitor(state) {
    return function (competitor) {
      return state.list.filter(function (e) {
        return e.competitors.findIndex((c) => c.id === competitor.id) !== -1
      })
    }
  },
}
