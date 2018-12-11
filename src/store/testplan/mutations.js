/*
export function someMutation (state) {
}
*/
import Vue from 'vue'
import * as utils from '../../utils/index'

export const changeOpenedTCs = (state, payload) => {
  state.openedTCs = payload
}

export const changeSelectedNodeID = (state, payload) => {
  state.selectedNodeID = payload
}

export const changeSelectedNode = (state, payload) => {
  state.selectedNode = payload
}

export const changeTreeViewData = (state, payload) => {
  state.treeViewData = payload
}

export const changeActiveTab = (state, payload) => {
  state.activeTab = payload
}

export const pushOpenedTCs = (state, payload) => {
  Vue.set(state.openedTCs, state.openedTCs.length, payload);
}

export const deleteOpenedTCs = (state, payload) => {
  Vue.delete(state.openedTCs, state.openedTCs.findIndex((tc)=> tc._id === payload));
}


export const createCategory = (state, payload) => {
  Vue.set(state.treeViewData, state.treeViewData.length, payload)
}

export const createTestSuite = (state, payload) => {
  debugger
  const cat_id = payload.cat_id
  const addFirst = payload.addFirst
  const testsuite = payload.testsuite
  const catIndex = _.findIndex(state.treeViewData, cat => cat._id === cat_id)
  if(catIndex === -1) console.log('Error', 'createTestSuite, catIndex = -1')
  if(addFirst) state.treeViewData[catIndex].children.unshift(testsuite)
	else state.treeViewData[catIndex].children.push(testsuite)
}

//START - show/hidden dialogs

//New Category Modal
export const showNewCategoryModal = (state, payload) => {
  state.newCategoryModal.isVisible = true
}

export const hideNewCategoryModal = (state, payload) => {
  state.newCategoryModal.isVisible = false
}

//Edit Category Modal
export const showEditCategoryModal = (state, payload) => {
  state.editCategoryModal.isVisible = true
}

export const hideEditCategoryModal = (state, payload) => {
  state.editCategoryModal.isVisible = false
}

//Delete Category Modal
export const showDeleteCategoryModal = (state, payload) => {
  state.deleteCategoryModal.isVisible = true
}

export const hideDeleteCategoryModal = (state, payload) => {
  state.deleteCategoryModal.isVisible = false
}

//New Test Suite Modal
export const showNewTestSuiteModal = (state, payload) => {
  state.newTestSuiteModal.isVisible = true
}

export const hideNewTestSuiteModal = (state, payload) => {
  state.newTestSuiteModal.isVisible = false
}

//END - show/hidden dialogs
