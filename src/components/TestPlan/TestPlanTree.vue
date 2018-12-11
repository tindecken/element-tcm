<template>
  <div>
  <q-input
    color="secondary"
    v-model="tickFilter"
    class="q-mb-sm"
    clearable
    type="text"
    autofocus
    placeholder="Type to search"
    :before="[{icon: 'mdi-magnify', handler () {}}]"
  />
  <q-btn outline dense color="primary" icon="mdi-arrow-collapse-all" size="md"  v-on:click="collapseAll()"/>
  <q-btn outline dense color="primary" icon="mdi-arrow-expand-all" size="md"  v-on:click="expandAll()"/>
  <q-tree
    default-expand-all
    :nodes="tlTreeViewData"
    node-key="_id"
    label-key="name"
    tick-strategy="leaf"
    :ticked.sync="ticked"
    :filter="tickFilter"
    :selected.sync="selectedNodeID"
    ref="tlTree"
    :duration=10
    :expanded.sync="expandedNode"
    no-nodes-label="No Category"
  >
    <div slot="default-header" slot-scope="prop">
      <div v-on:click.stop="selectNode(prop.node)">
        <q-icon name="mdi-folder-outline" v-if="prop.node.type === 'category'" size="18px" class="q-mr-sm" v-bind:class="prop.node.status"/>
        <q-icon name="mdi-file-document-box-outline" v-else-if="prop.node.type === 'testsuite'" size="18px" class="q-mr-sm"  v-bind:class="prop.node.status"/>
        <q-icon name="mdi-animation-outline" v-else-if="prop.node.type === 'testgroup'" size="18px" class="q-mr-sm" v-bind:class="prop.node.status"/>
        <q-icon name="mdi-format-list-bulleted" v-else-if="prop.node.type === 'testcase'" size="18px" class="q-mr-sm" v-bind:class="prop.node.status"/>
        <span @contextmenu.prevent="rightClick(prop.node)" v-bind:class="[{'bg-orange-2' : prop.node.primary}, {'bg-light-blue-1': prop.node.dependency && prop.node.dependency !== ''}, {'text-light': prop.node.hasOwnProperty('enabled') && !prop.node.enabled}]">{{ prop.node.name }}</span>
        <category-menu v-if="prop.node.type === 'category'" :category="selectedNode"></category-menu>
        <test-suite-menu v-if="prop.node.type === 'testsuite'" :testsuite="selectedNode"></test-suite-menu>
        <test-group-menu v-if="prop.node.type === 'testgroup'" :testgroup="selectedNode"></test-group-menu>
        <test-case-menu v-if="prop.node.type === 'testcase'" :testcase="selectedNode"></test-case-menu>
      </div>
    </div>
  </q-tree>
  <new-category-modal></new-category-modal>
  <edit-category-modal></edit-category-modal>
  <delete-category-modal></delete-category-modal>
  <new-test-suite-modal></new-test-suite-modal>
  </div>
</template>

<script>
import CategoryMenu from "./ContextMenu/CategoryMenu"
import TestCaseMenu from "./ContextMenu/TestCaseMenu"
import TestSuiteMenu from "./ContextMenu/TestSuiteMenu"
import TestGroupMenu  from "./ContextMenu/TestGroupMenu"
import NewCategoryModal from "./Modal/NewCategoryModal"
import EditCategoryModal from "./Modal/EditCategoryModal"
import DeleteCategoryModal from "./Modal/DeleteCategoryModal"
import NewTestSuiteModal from "./Modal/NewTestSuiteModal"
import { mapGetters, mapActions, mapState  } from "vuex"
import { getTestPlanTree, createCategory } from "../../backend/testplan"
import { isOpened } from "../../utils/index"

export default {
  name: "test-plan-tree",
  components: { CategoryMenu, TestGroupMenu, TestCaseMenu, TestSuiteMenu, NewCategoryModal, EditCategoryModal, DeleteCategoryModal, NewTestSuiteModal },
  data() {
    return {
      ticked: [],
      tickFilter: '',
      expandedNode: []
    };
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    collapseAll: function () {
      this.$refs.tlTree.collapseAll()
    },
    expandAll: function () {
      this.$refs.tlTree.expandAll()
    },
    rightClick (node) {
      this.changeSelectedNode(node)
    },
    selectNode(node) {
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
    ...mapActions({
      changeSelectedNode: 'testplan/changeSelectedNode'
    })
  },
  created () {
    getTestPlanTree().then((result) => {
      this.tlTreeViewData = result
      console.log('tlTreeViewData', this.tlTreeViewData)
    })
  },
  computed: {
    ...mapGetters({
      selectedNode: 'testplan/selectedNode'
    }),
    tlTreeViewData:{
      get () {
        return this.$store.state.testplan.treeViewData
      },
      set(value) {
        this.$store.dispatch("testplan/changeTreeViewData", value);
      }
    },
    selectedNodeID: {
      get () {
        return this.$store.state.testplan.selectedNodeID
      },
      set (val) {
        this.$store.dispatch('testplan/changeSelectedNodeID', val)
      }
    },
    openedTCs: {
      set (value) {
        this.$store.dispatch('testplan/changeOpenedTCs', value)
      },
      get () {
        return this.$store.state.testplan.openedTCs
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
    debug: {
      set (value) {
        this.$store.dispatch('global/changeDebug', value)
      },
      get () {
        return this.$store.state.global.debug
      }
    },
  }
};
</script>

<!-- Notice lang="stylus" -->
<style lang="stylus">
@import '~variables'

.q-icon {
  vertical-align: baseline;
}

.q-tree-node-header {
  padding: 0px
}

.pass {
  color: $positive;
}
.fail {
  color: $negative;
}
.partial {
  color: $warning;
}
.running {
  color: $info;
}

</style>
