export const createRequestMutation = mutation => {
  return {
    REQUEST: `${mutation}_REQUEST`,
    SUCCESS: `${mutation}_SUCCESS`,
    FAILED: `${mutation}_FAILED`
  }
}
