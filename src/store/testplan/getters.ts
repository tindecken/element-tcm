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
