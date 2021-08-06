<template>
  <v-container class="d-flex py-6 header__container" fluid>
    <v-row class="align-center justify-space-between" no-gutters>
      <v-col cols="2" class="align-center">
        <v-row class="justify-center align-center">
          <Create />
        </v-row>
      </v-col>
      <v-col cols="8" class="px-6">
        <v-row class="align-center px-3 justify-center">
          <div class="text-h4 font-weight-bold ">
            💬 Response.io
          </div>
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-text-field
          placeholder="Search"
          class="included"
          v-model="searchInfo"
          :append-icon="shouldFilter ? 'mdi-close' : 'mdi-magnify'"
          @click:append="onReset"
          @click.stop="!shouldFilter"
          @focus="onSearchFocus"
          solo
          dense
          hide-details
        ></v-text-field>
      </v-col>
      <SearchBox
        ref="searchBox"
        v-model="form"
        :isOpen="isSearchFocus"
        :clickOutside="{
          handler: onSearchBlur,
          include
        }"
      />
    </v-row>
  </v-container>
</template>

<script>
import Create from '@/views/pages/components/create'
import SearchBox from '@/views/pages/components/search'
import _isArray from 'lodash/isArray'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Header',
  components: { Create, SearchBox },
  data() {
    return {
      isSearchFocus: false,
      form: {
        keywords: '',
        startTime: null,
        endTime: null,
        labels: [],
        status: []
      }
    }
  },
  computed: {
    ...mapState({
      shouldFilter: state => state.task.shouldFilter
    }),
    searchInfo() {
      const totalFilterCount = Object.values(this.form).reduce(
        (filterCount, value) => {
          const isEmpty = _isArray(value) ? value.length === 0 : !value
          const count = filterCount + (isEmpty ? 0 : 1)
          return count
        },
        0
      )

      return totalFilterCount ? `${totalFilterCount} filters applied` : ''
    }
  },
  methods: {
    ...mapActions(['resetSearch']),
    onSearchFocus() {
      this.isSearchFocus = true
      // wait for transition
      setTimeout(() => {
        this.$refs.searchBox.focus()
      })
    },
    onSearchBlur() {
      this.isSearchFocus = false
    },
    onReset() {
      this.form = {
        keywords: '',
        startTime: null,
        endTime: null,
        tags: [],
        status: []
      }
      this.resetSearch()
    },
    include() {
      const selectDropdown = document.querySelector(
        '.menuable__content__active'
      )
      const dialog = document.querySelector('.v-dialog__content--active')

      return [
        document.querySelector('.included'),
        ...(selectDropdown ? [selectDropdown] : []),
        ...(dialog ? [dialog] : [])
      ]
    },
    inputSearch(keyword) {
      this.searchWords = keyword
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  &__container {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
  }
}
</style>
