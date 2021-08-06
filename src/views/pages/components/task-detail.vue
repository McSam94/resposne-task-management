<template>
  <v-dialog
    v-model="isOpen"
    content-class="task-detail__dialog"
    max-width="800"
  >
    <v-card>
      <v-btn
        fab
        depressed
        small
        color="rgba(0, 0, 0, 0.08)"
        class="task-detail__close"
        @click="isOpen = false"
      >
        <v-icon small color="black">mdi-close</v-icon>
      </v-btn>
      <v-container class="pa-0 task-detail__image-container" fluid>
        <img :src="task.images" class="task-detail__image" alt="broke" />
        <div
          class="task-detail__image-overlay d-flex justify-center align-center"
        >
          <v-icon @click="uploadNewImage" dark>mdi-upload</v-icon>
          <input
            ref="fileInput"
            type="file"
            class="d-none"
            @change="selectImage"
          />
        </div>
      </v-container>
      <v-card-title class="text-h5">
        <v-col>
          <v-text-field
            v-if="isEditingField.title"
            v-model="task.title"
            @blur="onSave('title')"
            autofocus
            hide-details
            outlined
            dense
            flat
            solo
          ></v-text-field>
          <h4 v-else @click="editField('title')">
            {{ task.title }}
          </h4>
          <v-chip
            small
            v-for="tag of task.tags"
            :key="tag"
            class="mr-1 white--text"
            :color="pickColor(tag)"
            ><v-icon left> mdi-label </v-icon>{{ tag }}</v-chip
          >
          <div class="text-subtitle-2 gray--text">
            Estimated Time: {{ task.estimatedTime }}
          </div>
        </v-col>
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-textarea
            v-if="isEditingField.description"
            v-model="task.description"
            @blur="onSave('description')"
            autofocus
            hide-details
            outlined
            dense
            flat
            solo
          ></v-textarea>
          <span v-else @click="editField('description')">
            {{ task.description }}
          </span>
        </v-container>
        <v-divider></v-divider>
        <v-container class="my-3" fluid>
          <h3 class="gray--text my-3">Comments</h3>
          <v-text-field
            v-model="newComment"
            class="mb-3"
            append-outer-icon="mdi-comment-arrow-right"
            placeholder="Write a comment..."
            @click:append-outer="sendComment"
            hide-details
            outlined
            dense
            flat
            solot
          />
          <v-col
            v-for="comment of task.comments"
            :key="comment.time"
            class="pa-0"
          >
            <v-input
              class="mt-4 pa-3 rounded task-detail__comment"
              hide-details
              >{{ comment.text }}</v-input
            >
            <span class="grey--text text-caption">{{
              formatTime(new Date(comment.time))
            }}</span>
          </v-col>
        </v-container>
        <v-divider></v-divider>
        <v-container>
          <v-btn color="error" class="my-3" block @click="removeTask(task.id)"
            >Delete</v-btn
          >
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { pickColor, getPreviewImageFromFile } from '@/utils/common'
import { formatTime } from '@/utils/time'

export default {
  name: 'TaskDetail',
  data() {
    return {
      isOpen: false,
      isEditingField: {
        title: false,
        description: false
      },
      task: {
        title: '',
        description: '',
        tags: [],
        images: '',
        estimatedTime: '',
        comments: []
      },
      newComment: ''
    }
  },
  watch: {
    hasGotTaskDetail(val) {
      this.isOpen = val
    },
    isOpen(val) {
      if (!val) {
        this.resetTaskDetail()
        this.$router.push('/')
      }
    },
    $route(val) {
      this.getTaskDetail({ id: val.params.id })
    },
    taskDetails(val) {
      this.task = val
    },
    hasCommented(val) {
      if (val) {
        this.newComment = ''
        this.resetAddComment()
      }
    }
  },
  mounted() {
    this.getTaskDetail({ id: this.$route.params.id })
  },
  computed: {
    ...mapState({
      taskDetails: state => state.task.taskDetails,
      hasGotTaskDetail: state => state.task.hasGotTaskDetail,
      getTaskDetailError: state => state.task.getTaskDetailError,
      hasCommented: state => state.task.hasCommented
    })
  },
  methods: {
    ...mapActions([
      'resetTaskDetail',
      'getTaskDetail',
      'updateTask',
      'addComment',
      'resetAddComment',
      'deleteTask'
    ]),
    formatTime,
    pickColor,
    sendComment() {
      this.addComment({
        id: this.task.id,
        comment: { text: this.newComment, time: new Date().toString() }
      })
    },
    editField(fieldName) {
      this.isEditingField[fieldName] = true
    },
    onSave(fieldName) {
      if (this.isEditingField[fieldName]) {
        this.isEditingField[fieldName] = false

        this.updateTask({
          task: {
            ...this.task,
            [fieldName]: this.task[fieldName]
          }
        })
      }
    },
    uploadNewImage() {
      this.$refs.fileInput.click()
    },
    async selectImage(e) {
      if (e.target.files.length) {
        const singleFile = e.target.files?.[0]

        const newImage = await getPreviewImageFromFile(singleFile)

        this.updateTask({
          task: {
            ...this.task,
            images: newImage
          }
        })
      }
    },
    removeTask(id) {
      this.deleteTask({ id })
      this.isOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
.task-detail {
  &__dialog {
    overflow-x: hidden;
  }
  &__image {
    width: 100%;
    max-height: 15rem;
    object-fit: cover;

    &-container {
      cursor: pointer;

      &:hover {
        & .task-detail__image-overlay {
          visibility: visible;
        }
      }
    }
    &-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 15rem;
      visibility: hidden;
      background-color: rgba($color: #000000, $alpha: 0.5);
      z-index: 1;
    }
  }
  &__close {
    position: absolute;
    right: 1.2rem;
    top: 1.2rem;
    z-index: 10;
  }
  &__comment {
    border: solid 1px lightgray;
  }
}
</style>
