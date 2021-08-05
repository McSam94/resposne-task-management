<template>
  <v-dialog
    scrollable
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="800px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed color="primary md-3" v-bind="attrs" v-on="on"
        >Create New Task</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <v-row class="align-center justify-space-between">
          <v-col cols="10">
            <h4>New Task</h4>
          </v-col>
          <v-col cols="2" class="justify-center align-center">
            <v-btn icon class="float-right" @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-form ref="form" v-model="valid">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  solo
                  label="Title"
                  class="create__formfield"
                  v-model="form.title"
                  :rules="rules.title"
                  required
                ></v-text-field>
                <TagPicker
                  cClass="create__formfield"
                  label="Labels"
                  v-model="form.tags"
                  :options="tagOptions"
                  :createHint="COMBOBOX_PLACEHOLDER"
                  :focus="loadTags"
                  :filter="filter"
                  :create="createTag"
                  :remove="removeTag"
                ></TagPicker>
                <v-textarea
                  solo
                  label="Description"
                  class="create__formfield"
                  v-model="form.description"
                ></v-textarea>
                <ImageUplader
                  ref="imageUploader"
                  label="Image"
                  cClass="create__formfield"
                  v-model="form.images"
                ></ImageUplader>
              </v-col>
              <v-col cols="4">
                <v-select
                  class="create__formfield"
                  v-model="form.status"
                  :items="statusOptions"
                  item-text="text"
                  item-value="value"
                  label="Status"
                  hide-details
                  solo
                ></v-select>
                <TimePicker
                  label="Estimated Time"
                  cClass="create__formfield"
                  v-model="form.estimatedTime"
                ></TimePicker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="justify-end px-3">
          <v-btn color="primary" @click="saveTask" :disabled="!valid">
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TimePicker from '@/views/components/time-picker'
import ImageUplader from '@/views/components/image-uploader'
import TagPicker from '@/views/components/tag-picker'
import Constants from '@/config/constants'
import capitalize from 'lodash/capitalize'
import { genUUID } from '@/utils/common'

const COMBOBOX_PLACEHOLDER = 'Select an option or create one'

export default {
  name: 'Create',
  components: { TimePicker, ImageUplader, TagPicker },
  data() {
    return {
      dialog: false,
      valid: false,
      form: {
        id: genUUID(),
        title: '',
        description: '',
        estimatedTime: '',
        images: '',
        status: 0,
        tags: [],
        comments: []
      },
      rules: {
        title: [v => !!v || 'Title is required']
      },
      COMBOBOX_PLACEHOLDER
    }
  },
  computed: {
    ...mapState({
      hasAddedTag: state => state.tag.hasAddedTag,
      hasDeletedTag: state => state.tag.hasDeletedTag,
      tags: state => state.tag.tags
    }),
    statusOptions() {
      return Object.entries(Constants.TASK_STATUS).map(([key, value]) => ({
        text: capitalize(key),
        value
      }))
    },
    tagOptions() {
      return [COMBOBOX_PLACEHOLDER, ...this.tags]
    }
  },
  watch: {
    hasAddedTag(val) {
      if (val) {
        this.resetAddTag()
      }
    },
    hasDeletedTag(val) {
      if (val) {
        this.resetDeleteTag()
      }
    }
  },
  methods: {
    ...mapActions([
      'createTask',
      'loadTask',
      'loadTags',
      'addTag',
      'deleteTag',
      'resetAddTag',
      'resetDeleteTag'
    ]),
    async saveTask() {
      await this.createTask({ task: this.form })
      this.loadTask()
      this.dialog = false
      this.$refs.form.reset()
      this.$refs.imageUploader.removeImage()
    },
    filter(item, queryText, itemText) {
      if (item === COMBOBOX_PLACEHOLDER) return false

      const text = itemText ?? ''
      const query = queryText ?? ''

      return (
        text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      )
    },
    createTag(item) {
      this.addTag({ tag: item })
    },
    removeTag(item) {
      this.deleteTag({ item })
    }
  }
}
</script>

<style lang="scss">
.create {
  &__timepicker {
    width: 100%;
  }

  &__formfield {
    margin: 1.2rem 0;
  }
}
</style>
