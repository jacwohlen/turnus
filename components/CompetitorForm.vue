<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Last name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="sex"
            :items="sexes"
            label="Sex"
            placeholder="Select..."
            required
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="birthday"
                label="Birthday"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="birthday"
              :max="new Date().toISOString().substr(0, 10)"
              min="1940-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="club"
            :rules="[() => !!club || 'This field is required']"
            :items="clubs"
            label="Club"
            placeholder="Select..."
            required
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="weight"
            label="Weight"
            suffix="kg"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn :disabled="!valid" @click="addCompetitor">Add competitor</v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    firstname: null,
    lastname: null,
    sex: null,
    birthday: null,
    email: null,
    club: null,
    weight: null,
    sexes: ['male', 'female'],
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    menu: false,
    valid: true,
  }),
  computed: {
    clubs() {
      return this.$store.state.club.list
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  methods: {
    addCompetitor() {
      this.$store.commit('competitors/add', {
        firstname: this.firstname,
        lastname: this.lastname,
        sex: this.sex,
        birthday: this.birthday,
        club: this.club,
        weight: this.weight,
      })
      this.firstname = null
      this.lastname = null
      this.birthday = null
      this.email = null
      // this.club
      this.weight = null
    },
    save(date) {
      this.$refs.menu.save(date)
    },
  },
}
</script>
