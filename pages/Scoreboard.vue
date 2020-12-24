<template>
  <ScreenLayout>
    <v-container fill-height fluid pl-0 pr-0>
      <v-row class="border">
        <v-col class="tatami" md="2">{{ tatami.name }}</v-col>
        <v-col class="pool" md="8" align="center">{{ pool.name }}</v-col>
        <v-col md="2"></v-col>
      </v-row>
      <v-row>
        <v-col class="red" md="6">
          <v-row>
            <v-col class="competitor">{{
              actualFight.competitorRed.name
            }}</v-col>
          </v-row>
          <v-row>
            <v-col class="club">{{ actualFight.competitorRed.club }}</v-col>
          </v-row>
        </v-col>
        <v-col class="white" md="6">
          <v-row>
            <v-col class="competitor">{{
              actualFight.competitorWhite.name
            }}</v-col>
          </v-row>
          <v-row>
            <v-col class="club">{{ actualFight.competitorWhite.club }}</v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="border">
        <v-col class="red" md="3">
          <v-row class="score">
            <v-col align="center">
              {{ actualFight.competitorRed.score.ippon }}
            </v-col>
            <v-col align="center">
              {{ actualFight.competitorRed.score.wazari }}
            </v-col>
            <v-col align="center">
              {{ actualFight.competitorRed.score.shido }}
            </v-col>
          </v-row>
          <v-row class="scorelegend">
            <v-col align="center"> Ippon </v-col>
            <v-col align="center"> Wazari </v-col>
            <v-col align="center"> Shido </v-col>
          </v-row>
        </v-col>
        <v-col class="red" md="3"></v-col>
        <v-col class="white" md="3"></v-col>
        <v-col class="white" md="3">
          <v-row class="score">
            <v-col align="center">
              {{ actualFight.competitorRed.score.ippon }}
            </v-col>
            <v-col align="center">
              {{ actualFight.competitorRed.score.wazari }}
            </v-col>
            <v-col align="center">
              {{ actualFight.competitorRed.score.shido }}
            </v-col>
          </v-row>
          <v-row class="scorelegend">
            <v-col align="center"> Ippon </v-col>
            <v-col align="center"> Wazari </v-col>
            <v-col align="center"> Shido </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="border">
        <v-col class="flag" md="3">Flag</v-col>
        <v-col class="clock" md="6" align="center">{{ clock }}</v-col>
        <v-col class="flag" md="3">Flag</v-col>
      </v-row>
      <v-row class="border">
        <v-col class="next" md="1">Next</v-col>
        <v-col class="red" md="5">
          <v-row>
            <v-col class="nextCompetitor">{{
              actualFight.competitorRed.name
            }}</v-col>
          </v-row>
          <v-row>
            <v-col class="nextCompetitorClub">{{
              actualFight.competitorRed.club
            }}</v-col>
          </v-row>
        </v-col>
        <v-col class="white" md="5">
          <v-row>
            <v-col class="nextCompetitor">{{
              actualFight.competitorWhite.name
            }}</v-col>
          </v-row>
          <v-row>
            <v-col class="nextCompetitorClub">{{
              actualFight.competitorWhite.club
            }}</v-col>
          </v-row>
        </v-col>
        <v-col md="1"></v-col>
      </v-row>
    </v-container>
  </ScreenLayout>
</template>

<script>
export default {
  layout: 'ScreenLayout',
  data() {
    return {
      tatami: { name: 'Tatami 1' },
      pool: { name: 'Elite Herren -90kg' },
      actualFight: {
        competitorRed: {
          name: 'WEY Benjamin',
          club: 'JAC Wohlen',
          score: { ippon: 0, wazari: 0, shido: 0 },
        },
        competitorWhite: {
          name: 'SCHMID Andreas',
          club: 'JAC Wohlen',
          score: { ippon: 0, wazari: 0, shido: 0 },
        },
      },
      clock: '4:00',
      nextFight: {
        competitorRed: { name: 'WEY Samuel', club: 'JAC Wohlen' },
        competitorWhite: { name: 'Aggeler Lukas', club: 'JAC Wohlen' },
      },
    }
  },
}
</script>
<style>
.border {
  border-bottom: solid black 1px;
}
.tatami {
  font-size: 2em;
}
.pool {
  font-size: 3em;
}
.competitor {
  font-size: 6.5em;
  font-weight: bold;
}
.club {
  font-size: 3.2em;
}
.score {
  font-size: 15em;
  font-weight: bold;
}
.scorelegend {
  font-size: 2em;
  font-weight: bold;
}
.clock {
  font-size: 20em;
  font-weight: bold;
}
.flag {
  font-size: 1em;
}
.next {
  font-size: 3.2em;
}
.nextCompetitor {
  font-size: 3.2em;
  font-weight: bold;
}
.nextCompetitorClub {
  font-size: 3em;
  font-weight: bold;
}
.red {
  background-color: blue;
  color: white;
}
.white {
  background-color: inherit;
}
</style>
