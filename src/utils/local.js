import Constants from '@/config/constants'

/**
 *
 * @param {String} key
 * @param item
 * @returns {Promise}
 */
export const storeItem = (key, item) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, JSON.stringify(item))
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

/**
 *
 * @param {String} key
 * @returns {Promise}
 */
export const getItem = key => {
  return new Promise((resolve, reject) => {
    if (!Object.values(Constants.LOCAL_STORAGE).includes(key)) {
      reject('Invalid key storage')
    }

    try {
      const item = JSON.parse(localStorage.getItem(key))
      if (item) {
        resolve(item)
      } else {
        reject()
      }
    } catch (error) {
      reject(error)
    }
  })
}
