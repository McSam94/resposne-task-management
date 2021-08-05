<template>
  <div :class="cClass">
    <label class="mb-3 gray--text">{{ label }}</label>
    <v-input
      hide-details
      :class="
        `image-upload__btn ${
          previewImage
            ? 'image-upload__btn--preview'
            : 'image-upload__btn--plus'
        } justify-center align-center rounded`
      "
    >
      <v-container
        v-if="!previewImage"
        class=" justify-center align-center text-center"
        @click="openFileExplorer"
      >
        <v-icon large>mdi-plus</v-icon>
      </v-container>
      <v-container v-else class="image-upload__container--preview">
        <v-img :src="previewImage" cover />
        <v-container
          class="image-upload__overlay text-center justify-center align-center d-flex"
        >
          <v-icon dark @click="removeImage">mdi-trash-can-outline</v-icon>
        </v-container>
      </v-container>
    </v-input>
    <input ref="fileInput" type="file" class="d-none" @change="selectImage" />
  </div>
</template>

<script>
import { getPreviewImageFromFile } from '@/utils/common'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    label: String,
    cClass: String,
    value: [String, Array]
  },
  data() {
    return {
      previewImage: ''
    }
  },
  watch: {
    previewImage(val) {
      this.$emit('change', val)
    }
  },
  methods: {
    openFileExplorer() {
      this.$refs.fileInput.click()
    },
    async selectImage(e) {
      if (e.target.files.length) {
        const singleFile = e.target.files?.[0]

        this.previewImage = await getPreviewImageFromFile(singleFile)
      }
    },
    removeImage() {
      this.previewImage = ''
      this.$refs.fileInput.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.image-upload {
  &__container {
    &--preview {
      height: 9rem;
      width: 9rem;
    }
  }
  &__btn {
    border: dashed 1px grey;
    height: 9rem;
    width: 9rem;
    cursor: pointer;

    &--preview {
      border: solid 1px lightgray;

      &:hover {
        & .image-upload__overlay {
          visibility: visible;
        }
      }
    }
    &--plus {
      &:hover {
        background-color: lightgray;
      }
    }
  }
  &__overlay {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    visibility: hidden;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }
}
</style>
