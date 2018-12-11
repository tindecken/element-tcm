/*
export function someAction (context) {
}
*/

export const changeTab = ({commit}, payload) => {
  commit('changeTab', payload)
}

export const changeDebug = ({commit}, payload) => {
  commit('changeDebug', payload)
}