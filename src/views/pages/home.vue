<template>
  <v-container fluid class="pa-0">
    <Header />
    <Progress v-if="allTasksCount" />
    <v-row v-if="allTasksCount" class="px-12 py-12 justify-space-between">
      <Board :type="status" v-for="status of statusList" :key="status" />
      <TaskDetail />
    </v-row>
    <v-row v-else class="ma-6 mt-12">
      <v-col class="justify-center align-center ">
        <v-img
          height="400"
          contain
          :src="require('@/assets/images/empty.png')"
        />
        <div class="grey--text text-h5 font-weight-medium my-3 text-center">
          Seems like there's nothing here. Create a new task now.
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Header from '@/views/pages/components/header'
import Board from '@/views/pages/components/board'
import TaskDetail from '@/views/pages/components/task-detail'
import Progress from '@/views/pages/components/progress'
import Constants from '@/config/constants'

export default {
  components: { Header, Board, TaskDetail, Progress },
  data() {
    return {
      Constants
    }
  },
  mounted() {
    this.loadTask()
  },
  computed: {
    ...mapGetters(['allTasksCount']),
    statusList() {
      return Object.values(Constants.TASK_STATUS)
    }
  },
  methods: {
    ...mapActions(['loadTask'])
  }
}
</script>

<style lang="scss" scoped></style>
