import Constants from '@/config/constants'

export const storeItem = item => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(Buffer.from(item), 'base64')
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export const getItem = key => {
  return new Promise((resolve, reject) => {
    if (!Object.values(Constants.LOCAL_STORAGE).includes(key)) {
      reject('Invalid key storage')
    }

    try {
      localStorage.getItem(key)?.toString('base64')
    } catch (error) {
      reject(error)
    }
  })
}
