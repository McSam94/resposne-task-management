import _lowerCase from 'lodash/lowerCase'

/**
 *
 * @param {String} str
 * @returns {Number}
 */
export const hashCode = str => {
  let hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

/**
 *
 * @param {String} str
 * @returns {String}
 */
export const pickColor = str => {
  return `hsl(${hashCode(str) % 360}, 80%, 20%)`
}

/**
 *
 * @returns {String}
 */
export const genUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 *
 * @param {File} file
 * @returns {String}
 */
export const getPreviewImageFromFile = file => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onload = ev => {
        const previewImage = ev.target.result
        resolve(previewImage)
      }

      reader.onerror = e => {
        reject(e)
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 *
 * @param {String | Number} text
 * @returns {String}
 */
export const neutralize = text => {
  return _lowerCase(text?.toString())
}

/**
 *
 * @param {Array} array
 * @param {Number} fromIndex
 * @param {Number} toIndex
 * @returns {Array}
 */
export const repositionArray = (array, fromIndex, toIndex) => {
  const newArrayRef = array
  const elementToPosition = array[fromIndex]

  newArrayRef.splice(fromIndex, 1)
  newArrayRef.splice(toIndex, 0, elementToPosition)

  return newArrayRef
}
