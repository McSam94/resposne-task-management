import { createRequestMutation } from '@/utils/request'
import { getTasks, appendTask, editTask, removeTask } from '@/services/task'

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

    commit(UPDATE_TASK.SUCCESS)
  } catch (error) {
    commit(UPDATE_TASK.FAILED, { error })
  }
}

export const DELETE_TASK = createRequestMutation('DELETE_TASK')
const deleteTask = async ({ commit }, payload) => {
  try {
    commit(DELETE_TASK.REQUEST)

    await removeTask(payload?.id)

    commit(DELETE_TASK.SUCCESS)
  } catch (error) {
    commit(DELETE_TASK.FAILED, { error })
  }
}

export default {
  createTask,
  updateTask,
  deleteTask,
  loadTask
}
