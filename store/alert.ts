import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

enum AlertType {
  Error = 'error',
  Info = 'info',
}

interface AlertMessage {
  message: string
  type: AlertType
}

@Module({
  name: 'alert',
  stateFactory: true,
  namespaced: true,
})
export default class Alert extends VuexModule {
  alert: AlertMessage = {
    message: '',
    type: AlertType.Error,
  }

  @Mutation
  setAlert({ message, type }: AlertMessage) {
    this.alert.message = message
    this.alert.type = type
  }

  @Action({ rawError: true })
  setError({ msg }: { msg: string }) {
    this.setAlert({ message: msg, type: AlertType.Error })
  }
}
