<template>
  <v-data-table
    :headers="headers"
    :items="pools"
    disable-sort
    hide-default-footer
  >
    <template v-slot:footer>
      <div
        style="
          color: grey;
          border: dashed 1px;
          border-radius: 0.2em;
          text-align: center;
        "
      >
        Drag things here
      </div>
    </template>
    <template v-slot:body="props">
      <draggable :list="props.items" tag="tbody" group="people">
        <tr v-for="(item, idx) in props.items" :key="idx">
          <td>
            <v-icon small class="page__grab-icon"> mdi-arrow-all </v-icon>
          </td>
          <td>{{ item.name }}</td>
          <td>
            <v-progress-linear height="25">
              <strong>0/{{ item.matches.length }}</strong>
            </v-progress-linear>
          </td>
          <td>
            <SchedulePoolForm :pool="item" :tatamis="tatamis" />
          </td>
        </tr>
      </draggable>
    </template>
  </v-data-table>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable,
  },
  props: {
    tatamis: { type: Array, required: true },
    pools: { type: Array, required: true },
  },
  data: () => ({
    headers: [
      { text: '', value: '' },
      { text: 'Pool', value: 'name' },
      { text: 'Progress', value: 'progress' },
      { text: 'Action', value: 'action' },
    ],
  }),
  computed: {},
  methods: {
    onCutDrop(e) {
      this.cut.push(e.data)
    },
    remove(n) {
      const index = this.pools.indexOf(n)
      this.pools.splice(index, 1)
    },
  },
}
</script>
