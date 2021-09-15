enum AlertType {
  Error = 'error',
  Info = 'info',
}

export const state = () => ({
  alert: {
    message: '',
    type: AlertType.Error,
  },
})

export const mutations = {
  setAlert(state: any, { msg, type }: { msg: string; type: AlertType }) {
    state.alert.message = msg
    state.alert.type = type
  },
}

export const actions = {
  setError(ctx: any, { msg }: { msg: string }) {
    ctx.commit('setAlert', { msg, type: 'error' })
  },
}
