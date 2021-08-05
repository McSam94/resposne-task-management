<template>
  <v-card
    ref="taskCard"
    class="task__card"
    @click="openTask"
    @dragstart="startDrag"
    draggable
  >
    <img
      :src="task.images"
      class="task__image"
      alt="broke"
      :draggable="false"
    />
    <v-card-title class="px-0">
      <v-col class="py-0">
        <h4>{{ task.title }}</h4>
        <v-chip
          small
          v-for="tag of task.tags"
          :key="tag"
          class="mr-1 white--text"
          :color="pickColor(tag)"
          ><v-icon left> mdi-label </v-icon>{{ tag }}</v-chip
        >
      </v-col>
    </v-card-title>
    <v-card-text>
      <v-col>
        <v-row>
          <span class="text-body-1">{{
            task.description | truncate(40, '...')
          }}</span>
        </v-row>
      </v-col>
    </v-card-text>
  </v-card>
</template>

<script>
import { pickColor } from '@/utils/common'
import Constants from '@/config/constants'

export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      height: 0
    }
  },
  mounted() {
    this.height = this.$refs.taskCard.$el.clientHeight
  },
  watch: {
    height(val) {
      this.$parent.addCardsHeight(val)
    }
  },
  methods: {
    pickColor,
    openTask() {
      this.$router.push(`task/${this.task.id}`)
    },
    startDrag(e) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData(Constants.DRAG_ID, this.task.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  &__image {
    width: 100%;
    max-height: 15rem;
    object-fit: cover;
  }
  &__card {
    cursor: pointer;
    margin: 0 6px;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
