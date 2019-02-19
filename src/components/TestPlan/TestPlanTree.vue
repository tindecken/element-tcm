<template>
  <div>
    <el-row v-if="tlTreeViewData.length === 0">
      <el-col :span="24">
        <el-button type="warning" plain @click="createNewCategory()">No Data, click to Creat New Category</el-button>
      </el-col>
    </el-row>
    <el-row v-if="tlTreeViewData.length > 0">
      <el-col :span="24">
        <el-input placeholder="Type to search" v-model="filterText" clearable>
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-row v-if="tlTreeViewData.length > 0">
      <el-tree
        :data="tlTreeViewData"
        :props="defaultProps"
        show-checkbox
        @node-click="nodeClick"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tlTree"
        :expand-on-click-node="false"
        highlight-current
        node-key="_id"
        :current-node-key="selectedNodeID"
        @node-contextmenu="contextMenu"
        >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span v-if="data.type === 'category'" v-bind:class="data.status">
            <font-awesome-icon :icon="['far', 'folder']"/>
          </span>
          <span v-else-if="data.type === 'testsuite'" v-bind:class="data.status">
            <font-awesome-icon :icon="['far', 'list-alt']" />
          </span>
          <span v-else-if="data.type === 'testgroup'" v-bind:class="data.status">
            <font-awesome-icon :icon="['far', 'object-group']" />
          </span>
          <span v-else-if="data.type === 'testcase'" v-bind:class="data.status">
            <font-awesome-icon :icon="['far', 'file-alt']" />
          </span>
          <span style="margin-left: 3px;" v-bind:class="[{primary: data.primary}, {dependency: data.dependency}]">{{ node.label }}</span>
        </span>
      </el-tree>
    </el-row>
    <new-category-modal></new-category-modal>
    <edit-category-modal></edit-category-modal>
    <delete-category-modal></delete-category-modal>
    <new-test-suite-modal></new-test-suite-modal>
    <new-test-group-modal></new-test-group-modal>
    <new-test-case-modal></new-test-case-modal>
  </div>
</template>

<script>
import { getTestPlanTree, createCategory } from "../../backend/testplan"
import { mapGetters, mapActions, mapState  } from "vuex";
import * as utils from "../../utils/index"
import { CategoryMenu, TestSuiteMenu, TestGroupMenu, TestCaseMenu } from "../../menus/TestPlanTreeMenus";
import NewCategoryModal from "./Modals/Category/NewCategoryModal"
import EditCategoryModal from "./Modals/Category/EditCategoryModal"
import DeleteCategoryModal from "./Modals/Category/DeleteCategoryModal"
import NewTestSuiteModal from "./Modals/Category/NewTestSuiteModal"
import NewTestGroupModal from "./Modals/TestSuite/NewTestGroupModal"
import NewTestCaseModal from "./Modals/TestSuite/NewTestCaseModal"

const menuCategory = new CategoryMenu()
const menuTestSuite = new TestSuiteMenu()
const menuTestGroup = new TestGroupMenu()
const menuTestCase = new TestCaseMenu()
import { EventHandler } from "../../utils/event_handler"

export default {
  name: "test-plan-tree",
  components: { NewCategoryModal, EditCategoryModal, NewTestSuiteModal, DeleteCategoryModal, NewTestGroupModal, NewTestCaseModal },
  data() {
    return {
      filterText: "",
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  created () {
    getTestPlanTree().then((result) => {
      this.tlTreeViewData = result
    })
  },
  updated (){
    if(this.tlTreeViewData.length > 0) this.$refs.tlTree.setCurrentKey(this.selectedNodeID)
    this.updateSelectedThing(this.$refs.tlTree.getNode(this.selectedNodeID))
  },
  watch: {
    filterText(val) {
      this.$refs.tlTree.filter(val)
    }
  },
  methods: {
    createNewCategory () {
      this.$store.dispatch('testplan/showNewCategoryModal')
    },
    nodeClick(nodeObject, treeNode) {
      switch(nodeObject.type){
        case 'testcase':
          if(!utils.isOpened(nodeObject._id, this.openedTCs)){
            this.$store.dispatch('testplan/pushOpenedTCs', nodeObject)
          }
          this.focusTCTab(nodeObject._id)
          this.debug = nodeObject
          break
        default:
          this.debug = nodeObject
          this.focusTCTab('debug')
          break
      }
      this.selectedNodeID = nodeObject._id
      this.changeSelectedNode(nodeObject)
    },
    focusTCTab(tcID){
      this.activeTab = tcID
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    updateSelectedThing(treeNode){
      if(treeNode) {
        switch(treeNode.level){
          case 1: //category
            this.changeSelectedCategory(treeNode.data)
            // this.changeSelectedTestSuite(null)
            // this.changeSelectedTestGroup(null)
            // this.changeSelectedTestCase(null)
            break
          case 2: //testsuite
            this.changeSelectedCategory(treeNode.parent.data)
            this.changeSelectedTestSuite(treeNode.data)
            // this.changeSelectedTestGroup(null)
            // this.changeSelectedTestCase(null)
            break
          case 3: //testgroup or testcase
            if(treeNode.data.type === 'testgroup') {
              this.changeSelectedTestGroup(treeNode.data)
              this.changeSelectedTestSuite(treeNode.parent.data)
              this.changeSelectedCategory(treeNode.parent.parent.data)
              // this.changeSelectedTestCase(null)
            }else{
              this.changeSelectedTestCase(treeNode.data)
              this.changeSelectedTestGroup(treeNode.parent.data)
              this.changeSelectedTestSuite(treeNode.parent.parent.data)
              this.changeSelectedCategory(treeNode.parent.parent.parent.data)
            }
            break
          case 4: //testcase
            this.changeSelectedTestCase(treeNode.data)
            this.changeSelectedTestGroup(treeNode.parent.data)
            this.changeSelectedTestSuite(treeNode.parent.parent.data)
            this.changeSelectedCategory(treeNode.parent.parent.parent.data)
            break
        }
      }

    },
    contextMenu(event, nodeObject, nodeTree) {
      this.changeSelectedNode(nodeObject)
      switch (nodeObject.type.toLowerCase()) {
        case "category":
          menuCategory.toggle(nodeObject);
          menuCategory.on("newCategory", () => {
            this.$store.dispatch('testplan/showNewCategoryModal')
          })
          menuCategory.on("editCategory", (nodeObject) => {
            EventHandler.emit('openEditCategoryModalEvent', nodeObject);
            this.$store.dispatch('testplan/showEditCategoryModal', nodeObject)
          })
          menuCategory.on("newTestSuite", (nodeObject) => {
            EventHandler.emit('openNewTestSuiteModalEvent', nodeObject);
            this.$store.dispatch('testplan/showNewTestSuiteModal', nodeObject)
          })
          menuCategory.on("deleteCategory", (nodeObject) => {
            EventHandler.emit('openDeleteCategoryModalEvent', nodeObject);
            this.$store.dispatch('testplan/showDeleteCategoryModal', nodeObject)
          })
          menuCategory.on("propertiesCategory", (nodeObject) => {
            this.$notify({
              title: 'Not implement yet',
              dangerouslyUseHTMLString: true,
              // message: `Not implement yet`,
              type: 'info',
              position: 'bottom-right'
            });
            //EventHandler.emit('openDeleteCategoryModalEvent', node);
            // this.$store.dispatch('testplan/showDeleteCategoryModal', node)
          })
          break
        case "testsuite":
          menuTestSuite.toggle(nodeObject)
          menuTestSuite.on("newTestGroup", (nodeObject) => {
            EventHandler.emit('openNewTestGroupModalEvent', nodeObject);
            this.$store.dispatch('testplan/showNewTestGroupModal')
          })
          menuTestSuite.on("newTestCase", (nodeObject) => {
            let lstPrimaries = utils.getPrimaries(nodeObject.children, '_id', 'testcase', 'children', [])
            let payload = {
              nodeObject: nodeObject,
              lstPrimaries: lstPrimaries
            }
            EventHandler.emit('openNewTestCaseModalEvent', payload);
            this.$store.dispatch('testplan/showNewTestCaseModal')
          })
          break
        case "testgroup":
          menuTestGroup.toggle(nodeObject)
          menuTestGroup.on("newTestCase", (nodeObject) => {
            let treeNode = this.$refs.tlTree.getNode(nodeObject)
            let lstPrimaries = utils.getPrimaries(treeNode.parent.data.children, '_id', 'testcase', 'children', [])
            let payload = {
              nodeObject: nodeObject,
              lstPrimaries: lstPrimaries,
              category_id: treeNode.parent.parent.data._id
            }
            // nodeObject.category_id = treeNode.parent.parent.key
            EventHandler.emit('openNewTestCaseModalEvent', payload)
            this.$store.dispatch('testplan/showNewTestCaseModal')
          })
          break
        case "testcase":
          menuTestCase.toggle(nodeObject);
          break
      }
    },
    ...mapActions({
      changeSelectedNode: 'testplan/changeSelectedNode',
      changeSelectedCategory: 'testplan/changeSelectedCategory',
      changeSelectedTestSuite: 'testplan/changeSelectedTestSuite',
      changeSelectedTestGroup: 'testplan/changeSelectedTestGroup',
      changeSelectedTestCase: 'testplan/changeSelectedTestCase',

    })
  },
  computed: {
    tlTreeViewData:{
      get () {
        return this.$store.state.testplan.treeViewData
      },
      set(value) {
        this.$store.dispatch("testplan/changeTreeViewData", value);
      }
    },
    selectedNodeID:{
      get () {
        return this.$store.state.testplan.selectedNodeID
      },
      set(value) {
        this.$store.dispatch("testplan/changeSelectedNodeID", value);
      }
    },
    selectedNode: {
      get () {
        return this.$store.state.testplan.selectedNode
      },
      set(value) {
        this.$store.dispatch("testplan/changeSelectedNode", value);
      }
    },
    selectedCategory: {
      get () {
        return this.$store.state.testplan.selectedCategory
      },
      set(value) {
        this.$store.dispatch("testplan/changeselectedCategory", value);
      }
    },
    selectedTestSuite: {
      get () {
        return this.$store.state.testplan.selectedTestSuite
      },
      set(value) {
        this.$store.dispatch("testplan/changeselectedTestSuite", value);
      }
    },
    selectedTestGroup: {
      get () {
        return this.$store.state.testplan.selectedTestGroup
      },
      set(value) {
        this.$store.dispatch("testplan/changeselectedTestGroup", value);
      }
    },
    selectedTestCase: {
      get () {
        return this.$store.state.testplan.selectedTestCase
      },
      set(value) {
        this.$store.dispatch("testplan/changeselectedTestCase", value);
      }
    },
    openedTCs: {
      get () {
        return this.$store.state.testplan.openedTCs
      },
      set(value) {
        this.$store.dispatch("testplan/changeOpenedTCs", value);
      }
    },
    debug: {
      set (value) {
        this.$store.dispatch('global/changeDebug', value)
      },
      get () {
        return this.$store.state.global.debug
      }
    },
    activeTab: {
      set (value) {
        this.$store.dispatch('testplan/changeActiveTab', value)
      },
      get () {
        return this.$store.state.testplan.activeTab
      }
    },
    ...mapGetters([
      { currentUser: 'auth/currentUser'},
      { tlTreeViewData: 'testplan/treeViewData'}
    ]),

  }

}
</script>

<style scoped>

.PASS {
  color: #67c23a;
}
.FAIL {
  color: #f56c6c;
}
.PARTIAL {
  color: #e6a23c;
}
.RUNNING {
  color: #909399;
}
.primary {
  color: #e6a23c;
}
.dependency {
  color: #4bc2c5
}
</style>
