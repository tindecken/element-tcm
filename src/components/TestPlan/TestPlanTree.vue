<template>
  <div>
    <el-row v-if="!tlTreeViewData">
      <el-col :span="24">
        <el-button type="primary" plain>Creat New Category</el-button>
      </el-col>
    </el-row>
    <el-row v-if="tlTreeViewData">
      <el-col :span="24">
        <el-input placeholder="Type to search" v-model="filterText" clearable>
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-row v-if="tlTreeViewData">
      <el-tree
        :data="tlTreeViewData"
        :props="defaultProps"
        show-checkbox
        @node-click="nodeClick"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tpTree"
        :expand-on-click-node="false"
        highlight-current
        node-key="_id"
        :current-node-key="selectedNodeID"
        >
        <span class="custom-tree-node" slot-scope="{ node, data }"  @contextmenu.stop="context(data)">
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
          <span style="margin-left: 3px;">{{ node.label }}</span>
        </span>
      </el-tree>
    </el-row>
    <new-category-modal></new-category-modal>
    <edit-category-modal></edit-category-modal>
  </div>
</template>

<script>

import { getTestPlanTree, createCategory } from "../../backend/testplan"
import { getPrimaries } from "../../utils/index"
import { mapGetters, mapActions, mapState  } from "vuex";
import { isOpened } from "../../utils/index"
import { CategoryMenu, TestCaseMenu } from "../../menus/TestPlanTreeMenus";
import NewCategoryModal from "./Modal/NewCategoryModal"
import EditCategoryModal from "./Modal/EditCategoryModal"

const menuCategory = new CategoryMenu()
const menuTestCase = new TestCaseMenu()
import { EventHandler } from "../../utils/event_handler"

export default {
  name: "test-plan-tree",
  components: { NewCategoryModal, EditCategoryModal },
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
    this.$refs.tpTree.setCurrentKey(this.selectedNodeID)
  },
  watch: {
    filterText(val) {
      this.$refs.tpTree.filter(val);
    }
  },
  methods: {
    nodeClick(node) {
      switch(node.type){
        case 'testcase':
          if(!isOpened(node._id, this.openedTCs)){
            this.$store.dispatch('testplan/pushOpenedTCs', node)
          }
          this.focusTCTab(node._id)
          break
        default:
          this.debug = node
          this.focusTCTab('debug')
          break
      }
      this.selectedNodeID = node._id
      this.changeSelectedNode(node)
    },
    focusTCTab(tcID){
      this.activeTab = tcID
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    context(node) {
      this.changeSelectedNode(node)
      switch (node.type.toLowerCase()) {
        case "category":
          menuCategory.toggle(node);
          menuCategory.on("newCategory", () => {
            this.$store.dispatch('testplan/showNewCategoryModal')
          })
          menuCategory.on("editCategory", (node) => {
            EventHandler.emit('openEditCategoryModalEvent', node);
            this.$store.dispatch('testplan/showEditCategoryModal', node)
          })
          break
        case "testsuite":
          break
        case "testgroup":
          break
        case "testcase":
          menuTestCase.toggle(node);
          break
      }
    },
    ...mapActions({
      changeSelectedNode: 'testplan/changeSelectedNode'
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
</style>
