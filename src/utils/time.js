/**
 * @param {number} time
 * @returns {string}
 */
export function formatTime(time) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return 'Just now'
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + 'minutes ago'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + 'hours ago'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }

  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
}

/**
 *
 * @param {String} time
 * @return {Number}
 */
export const convertTimeToInt = time => {
  return +time?.replace(':', '')
}
