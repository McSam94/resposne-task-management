import Constants from '@/config/constants'
import { storeItem, getItem } from '@/utils/local'

const KEY = Constants.LOCAL_STORAGE.TASK_STORAGE

export const getTasks = async () => {
  try {
    return await getItem(KEY)
  } catch (error) {
    return []
  }
}

export const getTask = async id => {
  try {
    const task = (await getItem(Constants.LOCAL_STORAGE.TASK_STORAGE))?.find(
      item => item?.id === id
    )
    return task
  } catch (error) {
    return null
  }
}

export const appendTask = async item => {
  try {
    const tasks = (await getTasks()) ?? []

    await storeItem(KEY, [...tasks, item])
  } catch (error) {
    console.error(error)
  }
}

export const editTask = async item => {
  try {
    const tasks = await getTasks()

    await storeItem(
      KEY,
      tasks?.map(task => (task?.id === item?.id ? item : task))
    )
  } catch (error) {
    console.error(error)
  }
}

export const appendComment = async (id, comment) => {
  try {
    const tasks = await getTasks()

    await storeItem(
      KEY,
      tasks?.map(task =>
        task?.id === id
          ? {
              ...task,
              comments: [comment, ...task.comments]
            }
          : task
      )
    )
  } catch (error) {
    console.error(error)
  }
}

export const removeTask = async item => {
  try {
    const tasks = await getTasks()

    await storeItem(KEY, [...tasks?.filter(task => task?.id !== item?.id)])
  } catch (error) {
    console.error(error)
  }
}

export const editStatus = async (id, status) => {
  try {
    const tasks = await getTasks()

    await storeItem(KEY, [
      ...tasks?.map(task =>
        task?.id === id
          ? {
              ...task,
              status
            }
          : task
      )
    ])
  } catch (error) {
    console.error(error)
  }
}
