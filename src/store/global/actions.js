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

export const changeClients = ({commit}, payload) => {
  commit('changeClients', payload)
}

export const changeKeywords = ({commit}, payload) => {
  commit('changeKeywords', payload)
}

export const changeTableHeight = ({commit}, payload) => {
  commit('changeTableHeight', payload)
}

