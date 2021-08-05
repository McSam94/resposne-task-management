import Constants from '@/config/constants'
import { storeItem, getItem } from '@/utils/local'

const KEY = Constants.LOCAL_STORAGE.TAG_STORAGE

export const getTags = async () => {
  try {
    const tags = await getItem(KEY)
    return tags
  } catch (error) {
    return []
  }
}

export const appendTag = async item => {
  try {
    const tags = (await getTags()) ?? []

    await storeItem(KEY, [item, ...tags])
  } catch (error) {
    console.error(error)
  }
}

export const removeTag = async item => {
  try {
    const tags = (await getTags()) ?? []

    await storeItem(KEY, [...tags?.filter(tag => tag !== item)])
  } catch (error) {
    console.error(error)
  }
}
