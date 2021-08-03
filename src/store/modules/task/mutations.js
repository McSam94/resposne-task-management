import { LOAD_TASK, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from './actions'

export default {
  [LOAD_TASK.REQUEST]: state => {
    state.isLoadingTasks = true
  },
  [LOAD_TASK.SUCCESS]: (state, payload) => {
    state.isLoadingTasks = false
    state.hasLoadedTasks = true
    state.tasks = payload?.tasks
  },
  [LOAD_TASK.FAILED]: (state, payload) => {
    state.isLoadingTasks = false
    state.hasLoadedTasks = false
    state.loadTasksError = payload?.error
  },
  [CREATE_TASK.REQUEST]: state => {
    state.isGettingTasks = true
  },
  [CREATE_TASK.SUCCESS]: (state, payload) => {
    state.isGettingTasks = false
    state.hasGotTasks = true
    state.tasks = [...state?.tasks, payload?.task]
  },
  [CREATE_TASK.FAILED]: (state, payload) => {
    state.isGettingTasks = false
    state.hasGotTasks = false
    state.getTasksError = payload?.error
  },
  [UPDATE_TASK.REQUEST]: state => {
    state.isUpdatingTask = true
  },
  [UPDATE_TASK.SUCCESS]: state => {
    state.isUpdatingTask = false
    state.hasUpdatedTask = true
  },
  [UPDATE_TASK.FAILED]: (state, payload) => {
    state.isUpdatingTask = false
    state.hasUpdatedTask = false
    state.updateTaskError = payload?.error
  },
  [DELETE_TASK.REQUEST]: state => {
    state.isDeletingTask = true
  },
  [DELETE_TASK.SUCCESS]: state => {
    state.isDeletingTask = false
    state.hasDeletedTask = true
  },
  [DELETE_TASK.FAILED]: (state, payload) => {
    state.isDeletingTask = false
    state.hasDeletedTask = false
    state.deleteTaskError = payload?.error
  }
}
