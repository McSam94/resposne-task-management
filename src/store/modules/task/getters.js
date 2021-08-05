import Constants from '@/config/constants'

export default {
  allTasksCount: state => state.tasks?.length ?? 0,
  pendingTasks: state => {
    const taskToFilter = state.shouldFilter ? state.filteredTasks : state.tasks

    return [
      ...taskToFilter?.filter?.(
        task => task.status === Constants.TASK_STATUS.PENDING
      )
    ]
  },
  processingTasks: state => {
    const taskToFilter = state.shouldFilter ? state.filteredTasks : state.tasks

    return [
      ...taskToFilter?.filter?.(
        task => task.status === Constants.TASK_STATUS.PROCESSING
      )
    ]
  },
  doneTasks: state => {
    const taskToFilter = state.shouldFilter ? state.filteredTasks : state.tasks

    return [
      ...taskToFilter?.filter?.(
        task => task.status === Constants.TASK_STATUS.DONE
      )
    ]
  },
  doneTasksCount: (_, getters) => getters.doneTasks?.length ?? 0,
  doneProgress: (_, getters) =>
    Math.round(
      ((getters.doneTasksCount ?? 1) /
        ((getters.allTasksCount === 0 ? 1 : getters.allTasksCount) ?? 1)) *
        100
    ),
  unDoneTasks: state =>
    state.tasks?.filter?.(task => task.status !== Constants.TASK_STATUS.DONE),
  unDoneTasksCount: (_, getters) => getters.unDoneTasks?.length ?? 0
}
