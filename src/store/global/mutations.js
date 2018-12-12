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
