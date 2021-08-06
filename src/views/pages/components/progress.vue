<template>
  <v-row class="px-12 pt-12">
    <h2 class="grey--text">Progress</h2>
    <v-progress-linear
      class="rounded-pill progress"
      v-model="doneProgress"
      background-color="secondary"
      height="30"
    >
      <span class="text-subtitle-1">{{
        `${
          doneProgress === 100 ? '🎉' : '🏃🏼‍♂️'
        } ${doneProgress}% (${doneTasksCount} of ${allTasksCount})`
      }}</span>
    </v-progress-linear>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['doneProgress', 'doneTasksCount', 'allTasksCount'])
  }
}
</script>

<style lang="scss" scoped>
.progress {
  pointer-events: none;
}
</style>
