import Constants from '@/config/constants'

export default {
  allTaskCount: state => state.tasks?.length,
  pendingTask: state =>
    state.tasks?.filter?.(
      task => task.status === Constants.TASK_STATUS.PENDING
    ),
  processingTask: state =>
    state.tasks?.filter?.(
      task => task.status === Constants.TASK_STATUS.PROCESSING
    ),
  doneTask: state =>
    state.tasks?.filter?.(task => task.status === Constants.TASK_STATUS.DONE),
  doneTaskCount: (_, getters) => getters.doneTask.length,
  doneProgress: (_, getters) =>
    Math.round(
      (getters.doneTask?.length ?? 1 / getters.allTask?.length ?? 1) * 100
    ),
  unDoneTask: state =>
    state.tasks?.filter?.(task => task.status !== Constants.TASK_STATUS.DONE),
  unDoneTaskCount: (_, getters) => getters.unDoneTask?.length
}
