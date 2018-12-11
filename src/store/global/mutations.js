/*
export function someMutation (state) {
}
*/

export const changeTab = (state, payload) => {
    state.selectedTab = payload
}

export const changeDebug = (state, payload) => {
    state.debug = payload
  }