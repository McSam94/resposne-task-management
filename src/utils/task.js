import { convertTimeToInt } from '@/utils/time'
import { neutralize } from '@/utils/common'

export const searchTask = (params, tasks) => {
  const filteredTasks = tasks?.filter(task => {
    const { keywords, startTime, endTime, tags, status } = params

    // Tag and status (value is array)
    if (tags.length) {
      const hasTags = task?.tags?.some(tag => tags?.some(t => t === tag))

      if (!hasTags) {
        return false
      }
    }

    if (status.length) {
      const hasStatus = status?.includes(task.status)

      if (!hasStatus) {
        return false
      }
    }

    // Within time range
    if (startTime && endTime) {
      const isWithinTimeRange =
        convertTimeToInt(endTime) >= convertTimeToInt(task.estimatedTime) &&
        convertTimeToInt(task.estimatedTime) >= convertTimeToInt(startTime)

      if (!isWithinTimeRange) {
        return false
      }
    }

    // keywords in title, description or tags
    if (keywords) {
      const neutralizeKeyword = neutralize(keywords)
      const hasKeywords =
        neutralize(task?.title)?.includes(neutralizeKeyword) ||
        neutralize(task?.description)?.includes(neutralizeKeyword) ||
        task?.tags?.some(tag => neutralize(tag)?.includes(neutralizeKeyword))

      if (!hasKeywords) {
        return false
      }
    }

    return true
  })

  return [...filteredTasks]
}
