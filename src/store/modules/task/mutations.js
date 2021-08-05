import {
  LOAD_TASK,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_TASK_DETAIL,
  ADD_COMMENT,
  SEARCH_TASK,
  UPDATE_STATUS
} from './actions'
import { searchTask } from '@/utils/task'

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
  [GET_TASK_DETAIL.REQUEST]: state => {
    state.isGettingTaskDetail = true
  },
  [GET_TASK_DETAIL.SUCCESS]: (state, payload) => {
    state.isGettingTaskDetail = false
    state.hasGotTaskDetail = true
    state.taskDetails = payload?.task
  },
  [GET_TASK_DETAIL.FAILED]: (state, payload) => {
    state.isGettingTaskDetail = false
    state.hasGotTaskDetail = false
    state.getTaskDetailError = payload?.error
  },
  [GET_TASK_DETAIL.RESET]: state => {
    state.isGettingTaskDetail = false
    state.hasGotTaskDetail = false
    state.taskDetails = {
      id: 0,
      title: '',
      description: '',
      status: 0,
      estimatedTime: '',
      images: '',
      tags: []
    }
    state.getTaskDetailError = ''
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
  [UPDATE_TASK.SUCCESS]: (state, payload) => {
    state.isUpdatingTask = false
    state.hasUpdatedTask = true
    state.tasks = [
      ...state?.tasks?.map(task =>
        task?.id === payload?.task?.id ? payload?.task : task
      )
    ]
    state.taskDetails = payload?.task
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
  },
  [ADD_COMMENT.REQUEST]: state => {
    state.isCommenting = true
  },
  [ADD_COMMENT.SUCCESS]: (state, payload) => {
    state.isCommenting = false
    state.hasCommented = true
    state.tasks = [
      ...state.tasks?.map(task =>
        task?.id === payload?.id
          ? {
              ...task,
              comments: [payload?.comment, ...task.comments]
            }
          : task
      )
    ]
    state.taskDetails = {
      ...state.taskDetails,
      comments: [payload?.comment, ...state.taskDetails.comments]
    }
  },
  [ADD_COMMENT.FAILED]: (state, payload) => {
    state.isCommenting = false
    state.hasCommented = false
    state.commentError = payload?.error
  },
  [ADD_COMMENT.RESET]: state => {
    state.isCommenting = false
    state.hasCommented = false
    state.commentError = ''
  },
  [SEARCH_TASK.SUCCESS]: (state, payload) => {
    state.shouldFilter = true
    state.filteredTasks = searchTask(payload?.param, state.tasks)
  },
  [SEARCH_TASK.RESET]: state => {
    state.shouldFilter = false
    state.filteredTasks = []
  },
  [UPDATE_STATUS.REQUEST]: state => {
    state.isUpdatingStatus = false
  },
  [UPDATE_STATUS.SUCCESS]: (state, payload) => {
    state.isUpdatingStatus = false
    state.hasUpdatedStatus = true
    state.tasks = [
      ...state.tasks?.map(task =>
        task?.id === payload?.id
          ? {
              ...task,
              status: payload?.status
            }
          : task
      )
    ]
  },
  [UPDATE_STATUS.FAILED]: (state, payload) => {
    state.isUpdatingStatus = false
    state.hasUpdatedStatus = false
    state.updateStatusError = payload?.error
  }
}
