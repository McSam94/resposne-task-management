import { searchTask } from '@/utils/task'
import SampleTasks from '../__mock__/tasks'

describe('Task Utils', () => {
  it('Search task with keyword should work correctly', () => {
    const filteredTasks = searchTask(
      {
        keywords: 'sample',
        startTime: null,
        endTime: null,
        tags: [],
        status: []
      },
      SampleTasks
    )

    expect(filteredTasks.length).toBe(1)

    const filteredTasks2 = searchTask(
      {
        keywords: 'Task',
        startTime: null,
        endTime: null,
        tags: [],
        status: []
      },
      SampleTasks
    )

    expect(filteredTasks2.length).toBe(3)
  })

  it('Search task with time between should work correctly', () => {
    const filteredTasks = searchTask(
      {
        keywords: '',
        startTime: '00:00',
        endTime: '02:00',
        tags: [],
        status: []
      },
      SampleTasks
    )

    expect(filteredTasks.length).toBe(1)

    const filteredTasks2 = searchTask(
      {
        keywords: '',
        startTime: '00:00',
        endTime: '14:00',
        tags: [],
        status: []
      },
      SampleTasks
    )

    expect(filteredTasks2.length).toBe(2)
  })

  it('Search task with tags should work correctly', () => {
    const filteredTasks = searchTask(
      {
        keywords: '',
        startTime: '',
        endTime: '',
        tags: ['tag1', 'tag3'],
        status: []
      },
      SampleTasks
    )

    expect(filteredTasks.length).toBe(3)

    const filteredTasks2 = searchTask(
      {
        keywords: '',
        startTime: '',
        endTime: '',
        tags: ['tag1'],
        status: []
      },
      SampleTasks
    )

    expect(filteredTasks2.length).toBe(2)
  })

  it('Search task with status should work correctly', () => {
    const filteredTasks = searchTask(
      {
        keywords: '',
        startTime: '',
        endTime: '',
        tags: [],
        status: [1]
      },
      SampleTasks
    )

    expect(filteredTasks.length).toBe(1)

    const filteredTasks2 = searchTask(
      {
        keywords: '',
        startTime: '',
        endTime: '',
        tags: [],
        status: [0, 1]
      },
      SampleTasks
    )

    expect(filteredTasks2.length).toBe(2)
  })
})
