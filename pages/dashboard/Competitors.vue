<template>
  <div>
    <h1>Competitors</h1>
    <CompetitorForm />
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">First Name</th>
            <th class="text-left">Last Name</th>
            <th class="text-left">Sex</th>
            <th class="text-left">Birthday</th>
            <th class="text-left">Club</th>
            <th class="text-left">Weight</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in items" :key="idx">
            <td>{{ item.firstname }}</td>
            <td>{{ item.lastname }}</td>
            <td>{{ item.sex }}</td>
            <td>{{ item.birthyear }}</td>
            <td>{{ item.club }}</td>
            <td>{{ item.weight }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  layout: 'DashboardLayout',
  computed: {
    items() {
      return this.$store.state.competitors.list
    },
  },
}
</script>
