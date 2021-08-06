import { createRequestMutation } from '@/utils/request'
import {
  getTask,
  getTasks,
  appendTask,
  editTask,
  removeTask,
  appendComment,
  editStatus,
  updateStatusTasks
} from '@/services/task'

export const LOAD_TASK = createRequestMutation('LOAD_TASK')
const loadTask = async ({ commit }) => {
  try {
    commit(LOAD_TASK.REQUEST)

    const tasks = await getTasks()

    commit(LOAD_TASK.SUCCESS, { tasks })
  } catch (error) {
    commit(LOAD_TASK.FAILED, { error })
  }
}

export const GET_TASK_DETAIL = createRequestMutation('GET_TASK_DETAIL')
const getTaskDetail = async ({ commit }, payload) => {
  try {
    commit(GET_TASK_DETAIL.REQUEST)

    const task = await getTask(payload?.id)

    if (task) {
      commit(GET_TASK_DETAIL.SUCCESS, { task })
    } else {
      commit(GET_TASK_DETAIL.FAILED, { error: 'Task not found' })
    }
  } catch (error) {
    commit(GET_TASK_DETAIL.FAILED, { error })
  }
}
const resetTaskDetail = ({ commit }) => commit(GET_TASK_DETAIL.RESET)

export const CREATE_TASK = createRequestMutation('CREATE_TASK')
const createTask = async ({ commit }, payload) => {
  try {
    commit(CREATE_TASK.REQUEST)

    await appendTask(payload?.task)

    commit(CREATE_TASK.SUCCESS, payload)
  } catch (error) {
    commit(CREATE_TASK.FAILED, { error })
  }
}

export const UPDATE_TASK = createRequestMutation('UPDATE_TASK')
const updateTask = async ({ commit }, payload) => {
  try {
    commit(UPDATE_TASK.REQUEST)

    await editTask(payload?.task)

    commit(UPDATE_TASK.SUCCESS, payload)
  } catch (error) {
    commit(UPDATE_TASK.FAILED, { error })
  }
}

export const ADD_COMMENT = createRequestMutation('ADD_COMMENT')
const addComment = async ({ commit }, payload) => {
  try {
    commit(ADD_COMMENT.REQUEST)

    await appendComment(payload?.id, payload?.comment)

    commit(ADD_COMMENT.SUCCESS, payload)
  } catch (error) {
    commit(ADD_COMMENT.FAILED, { error })
  }
}
const resetAddComment = ({ commit }) => commit(ADD_COMMENT.RESET)

export const DELETE_TASK = createRequestMutation('DELETE_TASK')
const deleteTask = async ({ commit }, payload) => {
  try {
    commit(DELETE_TASK.REQUEST)

    await removeTask(payload?.id)

    commit(DELETE_TASK.SUCCESS, payload)
  } catch (error) {
    commit(DELETE_TASK.FAILED, { error })
  }
}

export const SEARCH_TASK = createRequestMutation('SEARCH_TASK')
const searchTask = ({ commit }, payload) => commit(SEARCH_TASK.SUCCESS, payload)
const resetSearch = ({ commit }) => commit(SEARCH_TASK.RESET)

export const UPDATE_STATUS = createRequestMutation('UPDATE_STATUS')
const updateStatus = async ({ commit }, payload) => {
  try {
    commit(UPDATE_STATUS.REQUEST)

    await editStatus(payload?.id, payload?.status)

    commit(UPDATE_STATUS.SUCCESS, payload)
  } catch (error) {
    commit(UPDATE_STATUS.FAILED, { error })
  }
}

export const UPDATE_STATUS_TASKS = createRequestMutation('UPDATE_STATUS_TASKS')
const replaceStatusTasks = async ({ commit }, payload) => {
  try {
    commit(UPDATE_STATUS_TASKS.REQUEST)

    await updateStatusTasks(
      payload?.tasks,
      payload?.status,
      payload?.idToRemove
    )

    commit(UPDATE_STATUS_TASKS.SUCCESS, payload)
  } catch (error) {
    commit(UPDATE_STATUS_TASKS.FAILED)
  }
}

export default {
  createTask,
  updateTask,
  deleteTask,
  loadTask,
  getTaskDetail,
  resetTaskDetail,
  addComment,
  resetAddComment,
  searchTask,
  resetSearch,
  updateStatus,
  replaceStatusTasks
}
