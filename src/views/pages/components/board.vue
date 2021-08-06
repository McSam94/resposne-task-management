<template>
  <v-col class="board mx-3 pa-0 rounded">
    <h3 ref="boardTitle" class="board__title pa-3">{{ title }}</h3>
    <Draggable v-model="tasks" group="board" class="board__draggable">
      <div class="my-3" v-for="task in tasks" :key="task.id">
        <Task :ref="`boardTask-${task.id}`" :task="task" />
      </div>
    </Draggable>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Constants from '@/config/constants'
import Task from '@/views/pages/components/task'
import Draggable from 'vuedraggable'
import lowerCase from 'lodash/lowerCase'
import capitalize from 'lodash/capitalize'

export default {
  name: 'Board',
  components: { Task, Draggable },
  props: {
    type: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      Constants
    }
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
    tasks: {
      get() {
        return this[`${lowerCase(this.title)}Tasks`]
      },
      set(val) {
        const shouldNotUpdate = val?.every(task => task.status === this.type)

        if (shouldNotUpdate) {
          return
        }

        let idToRemove
        const statusUpdatedTasks = val?.map(task => {
          if (task.status !== this.type) {
            idToRemove = task.id
          }
          return {
            ...task,
            status: this.type
          }
        })

        this.replaceStatusTasks({
          tasks: statusUpdatedTasks,
          status: this.type,
          idToRemove
        })
      }
    }
  },
  methods: {
    ...mapActions(['replaceStatusTasks']),
    lowerCase
  }
}
</script>

<style lang="scss" scoped>
.board {
  background-color: #ebecf0;
  border: solid 1px lightgray;

  &__draggable {
    min-height: 20rem;
  }
}
</style>
