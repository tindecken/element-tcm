/*
export function someAction (context) {
}
*/

export const changeSelectedTab = ({commit}, payload) => {
  commit('changeSelectedTab', payload)
}

export const changeDebug = ({commit}, payload) => {
  commit('changeDebug', payload)
}
