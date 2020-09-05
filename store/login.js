import Cookies from 'js-cookie'

const createState = () => ({
  dataToken: ''
})

const getters = {

}

const mutations = {
  SET_DATA_TOKEN(state, data) {
    state.dataToken = data
  }
}

const actions = {
  setToken(context, data) {
    Cookies.set('userToken', data)
    context.commit('SET_DATA_TOKEN', data)
  },
  removeToken(context, data) {
    Cookies.remove('userToken')
    context.commit('SET_DATA_TOKEN', '')
  }
}

const loginModule = () => ({
  namespaced: true,
  state: createState(),
  getters,
  mutations,
  actions
})

export default loginModule