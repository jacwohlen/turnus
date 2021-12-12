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
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Last name"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="sex"
            :items="sexes"
            label="Sex"
            placeholder="Select..."
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-combobox
            v-model="birthyear"
            label="Birthyear"
            :items="years"
            prepend-icon="mdi-calendar"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="club"
            :rules="[() => !!club || 'This field is required']"
            :items="clubs"
            label="Club"
            placeholder="Select..."
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="weight"
            label="Weight"
            suffix="kg"
          />
        </v-col>
      </v-row>
      <v-btn :disabled="!valid" @click="addCompetitor">Add competitor</v-btn>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { competitorsStore } from '~/store';
import { ValidationRule } from '~/types/vuetify';
import RequiredRule from '~/validation/RequiredRule';
import EmailRule from "~/validation/EmailRule";

@Component
export default class CompetitorForm extends Vue {
  private firstname: string | null = null;
  private lastname: string | null = null;
  private sex: string | null = null;
  private birthyear: string | null = null;
  private email: string | null = null;
  private club: string | null = null;
  private weight: string | null = null;
  private sexes: string[] = ['male', 'female'];

  private nameRules: ValidationRule[] = [
    RequiredRule('Name'),
    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
  ];

  private emailRules: ValidationRule[] = [
    RequiredRule('Email'),
    EmailRule('Email'),
  ];

  private years: number[] = [];
  private valid: boolean = true;

  private get clubs(): string[] {
    return this.$store.state.club.list;
  }

  public mounted() {
    const currentYear = new Date().getFullYear();
    this.years = [...Array(100).keys()].map(i => currentYear - i); // last 100 years
  };

  private async addCompetitor(): void {
    await competitorsStore.add({
      firstname: this.firstname,
      lastname: this.lastname,
      sex: this.sex,
      birthyear: this.birthyear,
      club: this.club,
      weight: this.weight,
    });

    this.firstname = null;
    this.lastname = null;
    this.birthyear = null;
    this.email = null;
    this.club = null;
    this.weight = null;
  }
}
</script>
