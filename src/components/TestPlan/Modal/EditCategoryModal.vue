<template>
  <el-dialog
    :visible.sync="editCategoryModal.isVisible"
    title="Edit Category"
    :show-close="true"
    :close-on-click-modal="false"
    :center="true"
    width="40%">
    <el-form :model="form" label-position="right" ref="form">
      <el-form-item label="Name" :label-width="formLabelWidth">
        <el-input v-model.trim="form.cat_name" clearable autofocus></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item label="Work Items" :label-width="formLabelWidth">
            <el-input v-model.trim="form.cat_workitems" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Author" :label-width="formLabelWidth">
            <el-input v-model.trim="currentUser.name" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Description" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="3" v-model.trim="form.cat_description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="end">
          <el-col :span="24">
            <el-button @click="cancel()">Cancel</el-button>
            <el-button type="primary" @click="editCategory()" :disabled="$v.$invalid" plain>Save</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions, mapState  } from "vuex"
import * as utils from '../../../utils/index'

export default {
  name: "edit-category-modal",
  data() {
    return {
      formLabelWidth: '90px',
      opened: true,
      old_cat_name: '',
      form: {
        cat_name: '',
        cat_workitems: '',
        cat_description: '',
      },
      cat_id: '',
    };
  },
  validations: {
    form: {
      cat_name: { required }
    }
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
      this.$store.dispatch("testplan/hideEditCategoryModal")
    },
    editCategory () {
      let newCategory = {
        name: this.cat_name, 
        description: this.cat_description, 
        user: this.currentUser.email,
        work_items: this.cat_workitems
      }
      let checkDuplicate = true
      if(this.old_cat_name === this.cat_name){ //no need check duplicate id
        checkDuplicate = false
      }
      if(checkDuplicate){
        const isDuplicated = utils.findBy_id(this.tlTreeViewData, utils.toCodeName('category', this.cat_name))
        if(typeof isDuplicated === "undefined"){
          const updatedTLTreeData = utils.editCategory(this.tlTreeViewData, this.cat_id, newCategory)
          this.changeTreeViewData(updatedTLTreeData)
          this.cancel()
          this.changeSelectedNodeID(utils.toCodeName('category', this.cat_name))
          this.$q.notify({message: `Update category success`, position: "bottom-right", color: "positive"})
        }else {
          this.$q.notify({message: `Update Failed: Duplicated category id ${utils.toCodeName('category', this.cat_name)}`, position: "bottom-right", color: "warning"})
        }
      }else{
        const updatedTLTreeData = utils.editCategory(this.tlTreeViewData, this.cat_id, newCategory)
        this.changeTreeViewData(updatedTLTreeData)
        this.cancel()
        this.changeSelectedNodeID(utils.toCodeName('category', this.cat_name))
        this.$q.notify({message: `Update category success`, position: "bottom-right", color: "positive"})
      }
    }
  },
  created (){
    this.$root.$on("openEditCategoryModalEvent", (selectedNode) => { 
      this.old_cat_name = selectedNode.name
      this.cat_name = selectedNode.name
      this.cat_workitems = selectedNode.work_items
      this.cat_description = selectedNode.description
      this.cat_id = selectedNode._id
    })
  },
  computed: {
    ...mapGetters({ 
      editCategoryModal: 'testplan/editCategoryModal',
      currentUser: 'auth/currentUser',
      tlTreeViewData: 'testplan/treeViewData',
    })
  }
}
</script>

<style scoped>
  .el-button {
    float: right;
    margin-left: 10px;
  }
</style>
