<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      disable-pagination
      :hide-default-header="true"
      :hide-default-footer="true"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: { category: { type: Object, default: null } },
  data() {
    return {
      headers: [
        { text: 'First Name', value: 'firstname' },
        { text: 'Last Name', value: 'lastname' },
        { text: 'Sex', value: 'sex' },
        { text: 'Birthday', value: 'birthday' },
        { text: 'Club', value: 'club' },
        { text: 'Weight', value: 'weight' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  computed: {
    items() {
      // TODO: Filter list accordingly
      return this.$store.state.competitors.list
    },
    categoryName() {
      if (!this.category) {
        return 'n/a'
      }
      return this.category.name + ' ' + this.category.ages
    },
  },
}
</script>
