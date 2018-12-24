<template>
  <el-dialog
    :visible.sync="deleteCategoryModal.isVisible"
    :title="title"
    :show-close="true"
    :close-on-click-modal="false"
    :center="true"
    width="40%"
    :before-close="cancel">
    <el-row type="flex">
      <el-col :span="24">
        <span>Do you want to delete category {{cat_name}}?</span>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="24">
        <el-button @click="cancel()">Cancel</el-button>
        <el-button type="danger" @click="deleteCategory()">Delete</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions, mapState  } from "vuex"
import * as utils from '../../../../utils/index'
import { EventHandler } from "../../../../utils/event_handler"

export default {
  name: "delete-category-modal",
  data() {
    return {
      opened: true,
      cat_id: '',
      cat_name: ''
    };
  },
  beforeMount() {
    EventHandler.on("openDeleteCategoryModalEvent", (selectedNode) => {
      this.cat_id = selectedNode._id
      this.cat_name = selectedNode.name
    })
  },
  methods: {
    ...mapActions({
      changeTreeViewData: 'testplan/changeTreeViewData',
      changeSelectedNodeID: 'testplan/changeSelectedNodeID'
    }),
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    cancel () {
      this.$store.dispatch("testplan/hideDeleteCategoryModal")
    },
    deleteCategory () {
      const updatedTLTreeData = utils.deleteCategory(this.tlTreeViewData, this.cat_id)
      this.changeTreeViewData(updatedTLTreeData)
      this.cancel()
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `Deleted category <strong>${this.cat_name}</strong>`,
        type: 'success',
        position: 'bottom-right'
      });
    }
  },
  created (){
    this.$root.$on("openDeleteCategoryModalEvent", (category) => {
      this.cat_id = utils.toCodeName('category',category.name)
      this.cat_name = category.name
    })
  },
  computed: {
    ...mapGetters({
      deleteCategoryModal: 'testplan/deleteCategoryModal',
      tlTreeViewData: 'testplan/treeViewData'
    }),
    title () {
      return `Delete category ${this.cat_name}`
    }
  }
}
</script>

<style scoped>
  .el-button {
    float: right;
    margin-left: 10px;
  }
</style>
