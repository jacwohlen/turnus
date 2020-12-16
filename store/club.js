export const state = () => ({
  list: ['JAC Wohlen', 'JC Muri', 'JJJC Brugg'],
})

export const mutations = {
  add(state, { club }) {
    state.list.push({
      club,
    })
  },

  remove(state, { c }) {
    state.list.splice(state.list.indexOf(c), 1)
  },
}
