import { GET_TAGS, ADD_TAG, DELETE_TAG } from './actions'

export default {
  [GET_TAGS.REQUEST]: state => {
    state.isGettingTags = true
  },
  [GET_TAGS.SUCCESS]: (state, payload) => {
    state.isGettingTags = false
    state.hasGotTags = true
    state.tags = payload?.tags
  },
  [GET_TAGS.FAILED]: (state, payload) => {
    state.isGettingTags = false
    state.hasGotTags = false
    state.getTagsError = payload?.error
  },
  [ADD_TAG.REQUEST]: state => {
    state.isAddingTag = true
  },
  [ADD_TAG.SUCCESS]: (state, payload) => {
    state.isAddingTag = false
    state.hasAddedTag = true
    state.tags = [...state.tags, payload?.tag]
  },
  [ADD_TAG.FAILED]: (state, payload) => {
    state.isAddingTag = false
    state.hasAddedTag = false
    state.addTagError = payload?.error
  },
  [ADD_TAG.RESET]: state => {
    state.isAddingTag = false
    state.hasAddedTag = false
    state.addTagError = ''
  },
  [DELETE_TAG.REQUEST]: state => {
    state.isDeletingTag = false
  },
  [DELETE_TAG.SUCCESS]: (state, payload) => {
    state.isDeletingTag = false
    state.hasDeletedTag = true
    state.tags = [...state.tags?.filter(tag => tag !== payload?.item)]
  },
  [DELETE_TAG.FAILED]: (state, payload) => {
    state.isDeletingTag = false
    state.hasDeletedTag = false
    state.deleteTagError = payload?.error
  },
  [DELETE_TAG.RESET]: state => {
    state.isDeletingTag = false
    state.hasDeletedTag = false
    state.deleteTagError = ''
  }
}
