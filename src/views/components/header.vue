<template>
  <v-container class="d-flex pa-3" fluid>
    <v-row class="align-center" no-gutters>
      <v-col cols="2">
        <v-btn color="primary md-3"
          ><v-icon left dark>mdi-plus</v-icon>Create Task</v-btn
        >
      </v-col>
      <v-col cols="7" class="px-3">
        <div class="text-h6 grey--text font-weight-medium">Progress</div>
        <v-progress-linear
          class="rounded-pill"
          v-model="doneProgress"
          background-color="secondary"
          height="20"
        >
          <span class="text-caption">{{
            `${doneProgress} (${doneTaskCount} of ${allTaskCount})`
          }}</span>
        </v-progress-linear>
      </v-col>
      <v-col cols="3" class="pl-3">
        <v-text-field
          solo
          dense
          hide-details
          placeholder="Search"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      searchWord: ''
    }
  },
  computed: {
    ...mapGetters(['doneProgress', 'doneTaskCount', 'allTaskCount'])
  }
}
</script>

<style lang="scss" scoped></style>
