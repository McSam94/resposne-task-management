<template>
  <Header />
</template>

<script>
import { mapActions } from 'vuex'
import Header from '@/views/components/header'

export default {
  components: { Header },
  mounted() {
    this.loadTask()
  },
  methods: {
    ...mapActions(['loadTask'])
  }
}
</script>

<style lang="scss" scoped></style>
