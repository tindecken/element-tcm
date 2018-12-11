/*
export function someAction (context) {
}
*/
export const changeOpenedTCs = ({commit, state}, newValue) => {
  commit('changeOpenedTCs', newValue)
  return state.openedTCs
}

export const changeSelectedNode = ({commit}, payload) => {
  commit('changeSelectedNode', payload)
}

export const changeSelectedNodeID = ({commit}, payload) => {
  commit('changeSelectedNodeID', payload)
}

export const changeTreeViewData = ({commit}, payload) => {
  commit('changeTreeViewData', payload)
}

export const changeActiveTab = ({commit}, payload) => {
  commit('changeActiveTab', payload)
}

export const pushOpenedTCs = ({commit}, payload) => {
  commit('pushOpenedTCs', payload)
}

export const deleteOpenedTCs = ({commit}, payload) => {
  commit('deleteOpenedTCs', payload)
}

export const createCategory = ({commit}, payload) => {
  commit('createCategory', payload)
}

export const createTestSuite = ({commit}, payload) => {
  commit('createTestSuite', payload)
}




//START - show/hidden dialogs

//New Category Modal
export const showNewCategoryModal = ({commit}, payload) => {
  commit('showNewCategoryModal', payload)
}

export const hideNewCategoryModal = ({commit}, payload) => {
  commit('hideNewCategoryModal', payload)
}

export const toogleNewCategoryModal = ({commit}) => {
  commit('toogleNewCategoryModal')
}

//Edit Category Modal
export const showEditCategoryModal = ({commit}, payload) => {
  commit('showEditCategoryModal', payload)
}

export const hideEditCategoryModal = ({commit}, payload) => {
  commit('hideEditCategoryModal', payload)
}

export const toogleEditCategoryModal = ({commit}) => {
  commit('toogleEditCategoryModal')
}

//Delete Category Modal
export const showDeleteCategoryModal = ({commit}, payload) => {
  commit('showDeleteCategoryModal', payload)
}

export const hideDeleteCategoryModal = ({commit}, payload) => {
  commit('hideDeleteCategoryModal', payload)
}

//New Test Suite Category Modal
export const showNewTestSuiteModal = ({commit}, payload) => {
  commit('showNewTestSuiteModal', payload)
}

export const hideNewTestSuiteModal = ({commit}, payload) => {
  commit('hideNewTestSuiteModal', payload)
}

//END - show/hidden dialogs
