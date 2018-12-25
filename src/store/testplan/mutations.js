/*
export function someMutation (state) {
}
*/
import Vue from 'vue'
import * as utils from '../../utils/index'
import _ from 'lodash'

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
  const cat_id = payload.cat_id
  const addFirst = payload.addFirst
  const testsuite = payload.testsuite
  const catIndex = _.findIndex(state.treeViewData, cat => cat._id === cat_id)
  if(addFirst) {
    state.treeViewData[catIndex].children.unshift(testsuite)
    state.treeViewData[catIndex].testsuites.unshift(testsuite._id)
  }
  else {
    state.treeViewData[catIndex].children.push(testsuite)
    state.treeViewData[catIndex].testsuites.push(testsuite._id)
  }
}

export const createTestGroup = (state, payload) => {
  const group_id = payload.group_id
  const addFirst = payload.addFirst
  const testgroup = payload.testgroup
  const suite_id = payload.testsuite_id
  const cat_id = payload.category_id
  const catIndex = _.findIndex(state.treeViewData, cat => cat._id === cat_id)
  const suiteIndex = _.findIndex(state.treeViewData[catIndex].children, suite => suite._id === suite_id)
  if(addFirst) {
    state.treeViewData[catIndex].children[suiteIndex].children.unshift(testgroup)
    state.treeViewData[catIndex].children[suiteIndex].testgroups.unshift(group_id)
  }
	else {
    state.treeViewData[catIndex].children[suiteIndex].children.push(testgroup)
    state.treeViewData[catIndex].children[suiteIndex].testgroups.push(group_id)
  }
}

export const createTestCase = (state, payload) => {
  console.log('createTestCase payload', payload)
  const testcase = payload.testcase
  const addFirst = payload.addFirst
  const case_id = payload.case_id
  const group_id = payload.testgroup_id
  const suite_id = payload.testsuite_id
  const cat_id = payload.category_id
  const catIndex = _.findIndex(state.treeViewData, cat => cat._id === cat_id)
  const suiteIndex = _.findIndex(state.treeViewData[catIndex].children, suite => suite._id === suite_id)
  if(group_id){ //If New TestCase is come from TestGroup
    const groupIndex = _.findIndex(state.treeViewData[catIndex].children[suiteIndex].children, group => group._id === group_id)
    if(addFirst) {
      state.treeViewData[catIndex].children[suiteIndex].children[groupIndex].children.unshift(testcase)
      state.treeViewData[catIndex].children[suiteIndex].children[groupIndex].testcases.unshift(case_id)
    }
    else {
      state.treeViewData[catIndex].children[suiteIndex].children[groupIndex].children.push(testcase)
      state.treeViewData[catIndex].children[suiteIndex].children[groupIndex].testcases.push(case_id)
    }
    delete state.treeViewData[catIndex].children[suiteIndex].children[groupIndex].category_id
  }else{ //If New TestCase is come from TestSuite
    if(addFirst) {
      state.treeViewData[catIndex].children[suiteIndex].children.unshift(testcase)
      state.treeViewData[catIndex].children[suiteIndex].testcases.unshift(case_id)
    }
    else {
      state.treeViewData[catIndex].children[suiteIndex].children.push(testcase)
      state.treeViewData[catIndex].children[suiteIndex].testcases.push(case_id)
    }
  }
}

export const updateRev = (state, payload) => {
  const id = payload._id
  const rev = payload._rev
  const type = payload.type
  console.log('id', id)
  console.log('rev', rev)
  console.log('type', type)
  _.chain(state.treeViewData)
   .find({_id: id})
   .merge({_rev: rev})
  // switch(type){
  //   case 'category':
  //     const catIndex = _.findIndex(state.treeViewData, cat => cat._id === id)
  //     state.treeViewData[catIndex]._rev = '10000000000000'
  //     console.log('state.treeViewData[catIndex]._rev', state.treeViewData[catIndex]._rev)
  //     break
  // }
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

//New Test Group Modal
export const showNewTestGroupModal = (state, payload) => {
  state.newTestGroupModal.isVisible = true
}

export const hideNewTestGroupModal = (state, payload) => {
  state.newTestGroupModal.isVisible = false
}

//New Test Case Modal
export const showNewTestCaseModal = (state, payload) => {
  state.newTestCaseModal.isVisible = true
}

export const hideNewTestCaseModal = (state, payload) => {
  state.newTestCaseModal.isVisible = false
}
//END - show/hidden dialogs
