<template>
  <v-dialog
    scrollable
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="350px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-col :class="`${cClass} pa-0`">
        <label class="mb-3 gray--text">{{ label }}</label>
        <v-spacer></v-spacer>
        <v-btn
          :class="
            `${hasSelected ? 'black' : 'grey'}--text timepicker__btn md-3`
          "
          v-bind="attrs"
          v-on="on"
          >{{ selectedTime || placeholder }}</v-btn
        >
      </v-col>
    </template>
    <v-card>
      <v-card-title>
        <v-row class="align-center justify-space-between px-3">
          <v-col cols="10">
            <h4>Select Time</h4>
          </v-col>
          <v-col cols="2" class="justify-center align-center">
            <v-btn icon class="float-right" @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-time-picker v-model="selectedTime" :min="min" :max="max" />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn depressed color="primary" @click="done">Done</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'TimePicker',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    label: String,
    cClass: String,
    min: String,
    max: String,
    placeholder: {
      type: String,
      default: 'Select a time'
    },
    value: String
  },
  watch: {
    value(val) {
      this.selectedTime = val
    }
  },
  computed: {
    hasSelected() {
      return !!this.selectedTime
    }
  },
  data() {
    return {
      dialog: false,
      selectedTime: ''
    }
  },
  methods: {
    done() {
      this.dialog = false
      this.$emit('change', this.selectedTime)
    }
  }
}
</script>

<style lang="scss" scoped>
.timepicker {
  &__btn {
    border: solid 1px lightgray;
    width: 100%;
  }
}
</style>
