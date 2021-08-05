import { createRequestMutation } from '@/utils/request'
import { getTags, appendTag, removeTag } from '@/services/tag'

export const GET_TAGS = createRequestMutation('GET_TAGS')
const loadTags = async ({ commit }) => {
  try {
    commit(GET_TAGS.REQUEST)

    const tags = await getTags()

    commit(GET_TAGS.SUCCESS, { tags })
  } catch (error) {
    commit(GET_TAGS.FAILED, { error })
  }
}

export const ADD_TAG = createRequestMutation('ADD_TAG')
const addTag = async ({ commit }, payload) => {
  try {
    commit(ADD_TAG.REQUEST)

    await appendTag(payload?.tag)

    commit(ADD_TAG.SUCCESS, payload)
  } catch (error) {
    commit(ADD_TAG.FAILED, { error })
  }
}
const resetAddTag = ({ commit }) => commit(ADD_TAG.RESET)

export const DELETE_TAG = createRequestMutation('DELETE_TAG')
const deleteTag = async ({ commit }, payload) => {
  try {
    commit(DELETE_TAG.REQUEST)

    await removeTag(payload?.item)

    commit(DELETE_TAG.SUCCESS, payload)
  } catch (error) {
    commit(DELETE_TAG.FAILED, { error })
  }
}
const resetDeleteTag = ({ commit }) => commit(DELETE_TAG.RESET)

export default {
  loadTags,
  addTag,
  resetAddTag,
  deleteTag,
  resetDeleteTag
}
