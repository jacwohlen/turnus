<template>
  <v-card class="elevation-12" width="50%">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>
    <Alert />

    <!-- Login View -->
    <div v-if="view === View.LoginView">
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            v-model="email"
            prepend-icon="mdi-at"
            name="login"
            label="Email"
            type="text"
            :rules="emailRules"
          >
          </v-text-field>
          <v-text-field
            id="password"
            v-model="password"
            prepend-icon="mdi-lock"
            name="password"
            label="Password"
            type="password"
            :rules="passwordRules"
          >
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn plain @click="view = View.ForgotPasswordView">
          Forgot Password
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="view = View.CreateAccountView">
          Create Account
        </v-btn>
        <v-btn :disabled="!valid" color="primary" @click="login">Login</v-btn>
      </v-card-actions>
    </div>

    <!-- Create Account View -->
    <div v-if="view === View.CreateAccountView">
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            v-model="email"
            prepend-icon="mdi-at"
            name="login"
            label="Email"
            type="text"
            :rules="emailRules"
          >
          </v-text-field>
          <v-text-field
            id="password"
            v-model="password"
            prepend-icon="mdi-lock"
            name="password"
            label="Password"
            type="password"
            :rules="passwordRules"
          >
          </v-text-field>
          <v-text-field
            id="password2"
            v-model="password2"
            prepend-icon="mdi-lock"
            name="password"
            label="Confirm Password"
            type="password"
            :rules="[matchPasswords]"
          >
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn plain @click="view = View.LoginView">
          Already have an Account
        </v-btn>
        <v-btn :disabled="!valid" color="primary" @click="createAccount"
          >Create Account</v-btn
        >
      </v-card-actions>
    </div>

    <!-- Forgot Password View -->
    <div v-if="view === View.ForgotPasswordView">
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            v-model="email"
            prepend-icon="mdi-at"
            name="login"
            label="Email"
            type="text"
            :rules="emailRules"
          >
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn plain @click="view = View.LoginView">Go back go login</v-btn>
        <v-btn color="primary" to="/">Reset Account</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { userStore, alertStore } from '~/store'

enum View {
  LoginView,
  CreateAccountView,
  ForgotPasswordView,
}

@Component
export default class LoginPage extends Vue {
  view: View = View.LoginView // default view
  View: any = View
  errorMessage: string = ''
  username: string = ''
  email: string = ''
  password: string = ''
  password2: string = ''
  nameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) =>
      (v && v.length <= 10) || 'Name must be less than 10 characters',
  ]

  passwordRules = [(v: string) => !!v || 'Password is required']

  emailRules = [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ]

  valid: boolean = true

  get matchPasswords() {
    return () => this.password === this.password2 || 'Passwords must match'
  }

  createAccount() {
    userStore
      .signUp({
        email: this.email,
        password: this.password,
      })
      .then(() => {
        this.$router.push('/dashboard')
      })
      .catch((err) => {
        alertStore.setError({ msg: err })
      })
  }

  login() {
    userStore
      .signInWithEmail({
        email: this.email,
        password: this.password,
      })
      .then(() => {
        this.$router.push('/dashboard')
      })
      .catch((err) => {
        alertStore.setError({ msg: err })
      })
  }
}
</script>
