import Vue from 'vue'
const bytes = require('bytes')
export default ({
  app
}) => {
  Vue.filter('byteToCommon', function (size) {
    if (size) {
      return bytes(size, {
        thousandsSeparator: ','
      })
    } else {
      return 'None'
    }
  })
  Vue.filter('dateFormat', function (timestamp) {
    if (timestamp) {
      const date = new Date(timestamp * 1000)
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    } else {
      return 'Unknown'
    }
  })
}
