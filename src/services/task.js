import Constants from '@/config/constants'
import { storeItem, getItem } from '@/utils/local'

export const getTasks = async () => {
  try {
    return await JSON.parse(getItem(Constants.LOCAL_STORAGE.TASK_STORAGE))
  } catch (error) {
    return []
  }
}

export const getTask = async id => {
  try {
    return await JSON.parse(
      getItem(Constants.LOCAL_STORAGE.TASK_STORAGE)
    )?.find(item => item?.id === id)
  } catch (error) {
    return null
  }
}

export const appendTask = async item => {
  try {
    const tasks = getTasks()

    await storeItem([...tasks, item])
  } catch (error) {
    console.error(error)
  }
}

export const editTask = async item => {
  try {
    const tasks = getTasks()

    await storeItem(tasks?.map(task => (task?.id === item?.id ? item : task)))
  } catch (error) {
    console.error(error)
  }
}

export const removeTask = async item => {
  try {
    const tasks = getTasks()

    await storeItem([...tasks?.filter(task => task?.id !== item?.id)])
  } catch (error) {
    console.error(error)
  }
}
