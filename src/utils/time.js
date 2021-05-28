const getTime = (time, format) => {
  const date = new Date(time * 1)
  if (/(y+|Y+)/.test(format)) {
    format = format.replace(RegExp.$1, date.getFullYear() + '')
  }
  const obj = {
    'M+': date.getMonth() + 1,
    'd+|D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let key in obj) {
    if (new RegExp(`(${key})`).test(format)) {
      const str = obj[key] + ''
      format = format.replace(
        RegExp.$1, (RegExp.$1.length === 1) ?
        str : ('00' + str).substr(str.length)
      )
    }
  }
  return format
}

module.exports = {
  getTime
}
