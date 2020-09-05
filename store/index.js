import Vuex from 'vuex'
import loginModule from "~/store/login";


const createStore = () => {
  return new Vuex.Store({
    strict: true,
    modules: {
      login: loginModule()
    }
  })
}

export default createStore