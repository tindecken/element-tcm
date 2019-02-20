/*
export function someGetter (state) {
}
*/
export const openedTCs = (state) => {
    return state.openedTCs
}

export const selectedNode = (state) => {
    return state.selectedNode
}

export const selectedCategory = (state) => {
    return state.selectedCategory
}

export const selectedTestSuite = (state) => {
    return state.selectedTestSuite
}

export const selectedTestGroup = (state) => {
    return state.selectedTestGroup
}

export const selectedTestCase = (state) => {
    return state.selectedTestCase
}

export const selectedNodeID = (state) => {
    return state.selectedNodeID
}

export const treeViewData = (state) => {
    return state.treeViewData
}

export const activeTab = (state) => {
    return state.activeTab
}

export const newCategoryModal = (state) => {
    return state.newCategoryModal
}

export const editCategoryModal = (state) => {
    return state.editCategoryModal
}

export const deleteCategoryModal = (state) => {
    return state.deleteCategoryModal
}

export const newTestSuiteModal = (state) => {
    return state.newTestSuiteModal
}

export const newTestGroupModal = (state) => {
    return state.newTestGroupModal
}

export const newTestCaseModal = (state) => {
    return state.newTestCaseModal
}

export const chooseEnvironmentModal = (state) => {
    return state.chooseEnvironmentModal
}
