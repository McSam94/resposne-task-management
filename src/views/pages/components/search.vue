<template>
  <v-slide-x-reverse-transition>
    <v-col
      class="search__box--expand rounded"
      v-show="isOpen"
      v-click-outside="clickOutside"
    >
      <v-form ref="form">
        <v-text-field
          ref="searchExpand"
          v-model="form.keywords"
          class="search__box-input"
          placeholder="Keywords"
          append-icon="mdi-magnify"
          solo
          dense
          hide-details
          full-width
          flat
        />
        <v-col>
          <v-row v-if="isAdvanceVisible">
            <v-col cols="6">
              <label class="gray--text">Time between</label>
              <TimePicker
                label="Start Time"
                v-model="form.startTime"
                :max="form.endTime"
              ></TimePicker>
              <TimePicker
                label="End Time"
                v-model="form.endTime"
                :min="form.startTime"
              ></TimePicker>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="form.tags"
                label="Tag"
                class="my-6"
                :items="labelOptions"
                hide-details
                multiple
                solo
                dense
              />
              <v-select
                v-model="form.status"
                label="Status"
                class="my-6"
                item-text="text"
                item-value="value"
                :items="statusOptions"
                hide-details
                multiple
                solo
                dense
              />
            </v-col>
          </v-row>
          <v-row class="pa-3 align-end justify-space-between">
            <div>
              <v-btn depressed color="primary" @click="onSearch">
                Search
              </v-btn>
              <v-btn text color="secondary" @click="onClear">
                Clear
              </v-btn>
            </div>
            <v-btn @click="showAdvance" class="text-caption" text>{{
              isAdvanceVisible ? 'Hide Advance Search' : 'Advance Search'
            }}</v-btn>
          </v-row>
        </v-col>
      </v-form>
    </v-col>
  </v-slide-x-reverse-transition>
</template>

<script>
import TimePicker from '@/views/components/time-picker'
import { mapActions, mapState } from 'vuex'
import Constants from '@/config/constants'
import _capitalize from 'lodash/capitalize'

const statusOptions = Object.entries(Constants.TASK_STATUS).map(
  ([key, value]) => ({
    text: _capitalize(key),
    value
  })
)

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    clickOutside: Object
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  components: { TimePicker },
  data() {
    return {
      isAdvanceVisible: false,
      statusOptions,
      form: {
        keywords: '',
        startTime: null,
        endTime: null,
        tags: [],
        status: []
      }
    }
  },
  mounted() {
    this.loadTags()
  },
  computed: {
    ...mapState({
      labelOptions: state => state.tag.tags
    })
  },
  methods: {
    ...mapActions(['loadTags', 'searchTask', 'resetSearch']),
    showAdvance() {
      this.isAdvanceVisible = !this.isAdvanceVisible
    },
    focus() {
      this.$refs.searchExpand.focus()
    },
    onSearch() {
      this.searchTask({
        param: this.form
      })
      this.$emit('change', this.form)
      this.$parent.isSearchFocus = false
    },
    onClear() {
      this.$refs.form.reset()
      this.form = {
        keywords: '',
        startTime: null,
        endTime: null,
        tags: [],
        status: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  &__box {
    &-input {
      border-bottom: solid 1px lightgray;
    }
    &--expand {
      background: white;
      position: absolute;
      right: 12px;
      top: 24px;
      width: 50%;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 1px 1px 0 rgba(0, 0, 0, 0.19);
      z-index: 10;
    }
  }
}
</style>
