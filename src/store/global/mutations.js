/*
export function someMutation (state) {
}
*/

export const changeSelectedTab = (state, payload) => {
  state.selectedTab = payload
}

export const changeDebug = (state, payload) => {
  state.debug = payload
}

export const changeClients = (state, payload) => {
  state.clients = payload
}

export const changeKeywords = (state, payload) => {
  state.keywords = payload
}

export const changeTableHeight = (state, payload) => {
  state.tableHeight = payload
}
