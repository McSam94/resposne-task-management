export default {
  isLoadingTasks: false,
  hasLoadedTask: false,
  loadTasksError: '',

  isGettingTaskDetail: false,
  hasGotTaskDetail: false,
  taskDetails: {
    id: 0,
    title: '',
    description: '',
    status: 0,
    estimatedTime: '',
    images: '',
    tags: []
  },
  getTaskDetailError: '',

  isGettingTasks: false,
  hasGotTasks: false,
  tasks: [],
  getTasksError: '',

  isUpdatingTask: false,
  hasUpdatedTask: false,
  updateTaskError: '',

  isDeletingTask: false,
  hasDeletedTask: false,
  deleteTaskError: '',

  isCommenting: false,
  hasCommented: false,
  commentError: '',

  shouldFilter: false,
  filteredTasks: [],

  isUpdatingStatus: false,
  hasUpdatedStatus: false,
  updateStatusError: '',

  isUpdatingStatusTasks: false,
  hasUpdatedStatusTasks: false,
  updateStatusTasksError: ''
}
