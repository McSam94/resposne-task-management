<template>
  <v-col :class="`${cClass} pa-0`">
    <v-combobox
      v-model="model"
      :filter="filter"
      :hide-no-data="!search"
      :items="options"
      :search-input.sync="search"
      :placeholder="placeholder"
      :label="label"
      @focus="focus"
      @change="onTagChange"
      hide-selected
      multiple
      small-chips
      solo
    >
      <template v-slot:no-data>
        <v-list-item @click="create(search)">
          <span class="subheading">Create</span>
          <v-chip
            class="ml-3 white--text"
            :color="search ? pickColor(search) : 'black'"
            label
            small
          >
            {{ search }}
          </v-chip>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-bind="attrs"
          :color="pickColor(item)"
          :input-value="selected"
          label
          small
        >
          <span class="pr-2 white--text">
            {{ item }}
          </span>
          <v-icon color="white" small @click="parent.selectItem(item)">
            mdi-close-circle-outline
          </v-icon>
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <label v-if="item === createHint" @click.stop>{{ item }}</label>
        <v-chip v-else dark label small :color="pickColor(item)">
          {{ item }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-list-item-action @click.stop v-if="item !== createHint">
          <v-btn icon @click="remove(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-combobox>
  </v-col>
</template>

<script>
import { pickColor } from '@/utils/common'

export default {
  name: 'TagPicker',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    label: String,
    cClass: String,
    placeholder: String,
    options: Array,
    filter: Function,
    create: Function,
    remove: Function,
    focus: Function,
    createHint: String,
    value: Array
  },
  data: () => ({
    activator: null,
    attach: null,
    nonce: 1,
    menu: false,
    search: null,
    model: []
  }),
  watch: {
    value(val) {
      this.model = val
    }
  },
  methods: {
    pickColor,
    onTagChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped></style>
