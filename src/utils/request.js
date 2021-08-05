/**
 *
 * @param {String} mutation
 * @returns {Object}
 */
export const createRequestMutation = mutation => {
  return {
    REQUEST: `${mutation}_REQUEST`,
    SUCCESS: `${mutation}_SUCCESS`,
    FAILED: `${mutation}_FAILED`,
    RESET: `${mutation}_RESET`
  }
}
