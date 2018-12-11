import Vue from 'vue'
import Vuex from 'vuex'

import global from './global'
import testplan from './testplan'
import auth from './auth'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      global,
      testplan,
      auth
    },
    plugins: [createPersistedState({
      key: 'persistedstate'
    })],
    strict: true
  })
  return Store
}
