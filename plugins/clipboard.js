import VueClipboard from 'vue-clipboard2'
import Vue from 'vue'

export default () => {
  VueClipboard.config.autoSetContainer = true
  Vue.use(VueClipboard)
}
