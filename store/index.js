export const state = ({
  data: {}
})
export const mutations = {
  set (state, data) {
    state.data = {}
    Object.assign(state.data, data)
  }
}
