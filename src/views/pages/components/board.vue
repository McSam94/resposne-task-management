<template>
  <v-col
    class="board mx-3 pa-0 rounded"
    @drop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <h3 ref="boardTitle" class="board__title pa-3">{{ title }}</h3>
    <div class="my-3" v-for="task in tasks" :key="task.id">
      <Task :ref="`boardTask-${task.id}`" :task="task" />
    </div>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Constants from '@/config/constants'
import Task from '@/views/pages/components/task'
import lowerCase from 'lodash/lowerCase'
import capitalize from 'lodash/capitalize'

export default {
  name: 'Board',
  components: { Task },
  props: {
    type: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      Constants,
      titleHeight: 0,
      cardsHeight: []
    }
  },
  mounted() {
    this.titleHeight = this.$refs.boardTitle.clientHeight
  },
  computed: {
    ...mapGetters(['pendingTasks', 'processingTasks', 'doneTasks']),
    title() {
      return capitalize(
        Object.keys(Constants.TASK_STATUS)?.find(
          status => Constants.TASK_STATUS[status] === this.type
        )
      )
    },
    tasks() {
      return this[`${lowerCase(this.title)}Tasks`]
    }
  },
  methods: {
    ...mapActions(['updateStatus']),
    lowerCase,
    onDrop(e) {
      const taskID = e.dataTransfer.getData(Constants.DRAG_ID)

      this.updateStatus({
        id: taskID,
        status: this.type
      })
    },
    addCardsHeight(val) {
      this.cardsHeight = [...this.cardsHeight, val]
    }
  }
}
</script>

<style lang="scss" scoped>
.board {
  background-color: #ebecf0;
  border: solid 1px lightgray;

  &__title {
  }
}
</style>
