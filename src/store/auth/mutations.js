/*
export function someMutation (state) {
}
*/

import User from '../../models/User'

export const login = (state) => {
    state.currentUser = User.from(localStorage.token)
  }
  
export const logout = (state) => {
  state.currentUser = null
}