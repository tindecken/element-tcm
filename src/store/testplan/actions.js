/*
export function someAction (context) {
}
*/
export const changeOpenedTCs = ({commit, state}, newValue) => {
  commit('changeOpenedTCs', newValue)
  return state.openedTCs
}

export const updateTestCase = ({commit, state}, newValue) => {
  commit('updateTestCase', newValue)
  return state.openedTCs
}

export const changeSelectedNode = ({commit}, payload) => {
  commit('changeSelectedNode', payload)
}

export const changeSelectedCategory = ({commit}, payload) => {
  commit('changeSelectedCategory', payload)
}

export const changeSelectedTestSuite = ({commit}, payload) => {
  commit('changeSelectedTestSuite', payload)
}

export const changeSelectedTestGroup = ({commit}, payload) => {
  commit('changeSelectedTestGroup', payload)
}

export const changeSelectedTestCase = ({commit}, payload) => {
  commit('changeSelectedTestCase', payload)
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

export const createTestGroup = ({commit}, payload) => {
  commit('createTestGroup', payload)
}

export const createTestCase = ({commit}, payload) => {
  commit('createTestCase', payload)
}

export const updateRev = async ({commit}, payload) => {
  console.log('1')
  await commit('updateRev', payload)
  console.log('2')
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

//New Test Group Category Modal
export const showNewTestGroupModal = ({commit}, payload) => {
  commit('showNewTestGroupModal', payload)
}

export const hideNewTestGroupModal = ({commit}, payload) => {
  commit('hideNewTestGroupModal', payload)
}

//New Test Case Category Modal
export const showNewTestCaseModal = ({commit}, payload) => {
  commit('showNewTestCaseModal', payload)
}

export const hideNewTestCaseModal = ({commit}, payload) => {
  commit('hideNewTestCaseModal', payload)
}

//Choose Environment Modal
export const showChooseEnvironmentModal = ({commit}, payload) => {
  commit('showChooseEnvironmentModal', payload)
}

export const hideChooseEnvironmentModal = ({commit}, payload) => {
  commit('hideChooseEnvironmentModal', payload)
}

//END - show/hidden dialogs
