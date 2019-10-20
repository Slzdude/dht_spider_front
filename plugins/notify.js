import VueNotifications from 'vue-notifications'
import Vue from 'vue'
import VueToasted from 'vue-toasted' // https://github.com/shakee93/vue-toasted
export default () => {
  function toast ({
    message,
    type,
    timeout
  }) {
    if (type === VueNotifications.types.warn) type = 'show'
    return Vue.toasted[type](message, {
      duration: timeout
    })
  }

  Vue.use(VueToasted)

  const options = {
    success: toast,
    error: toast,
    info: toast,
    warn: toast
  }

  Vue.use(VueNotifications, options)
}
