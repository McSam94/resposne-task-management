import _truncate from 'lodash/truncate'

/**
 *
 * @param {String} text
 * @param {Number} length
 * @param {String} omission
 * @returns {String}
 */
export const truncate = (text, length, omission = '...') => {
  return _truncate(text, {
    length,
    omission
  })
}
