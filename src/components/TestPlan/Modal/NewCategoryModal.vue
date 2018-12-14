<template>
  <el-dialog
		:visible.sync="newCategoryModal.isVisible"
		title="Create New Category"
		:show-close="true"
		:close-on-click-modal="false"
    :center="true"
    width="40%">
    <el-form :model="form" label-position="right">
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
            <el-button type="primary" @click="create(close=false)">Create</el-button>
            <el-button type="primary" @click="create(close=true)">Create & Close</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import * as utils from '../../../utils/index'
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions, mapState  } from "vuex"
export default {
  name: "new-category-modal",
  data() {
    return {
      formLabelWidth: '90px',
      form: {
        cat_name: '',
        cat_workitems: '',
        cat_description: '',
      },
    };
  },
  validations: {
    form: {
      cat_name: { required }
    }
  },
  methods: {
    ...mapActions({
      changeSelectedNodeID: 'testplan/changeSelectedNodeID'
    }),
    clearForm() {
      this.form.cat_name = ''
      this.form.cat_workitems = ''
      this.form.cat_description = ''
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    cancel () {
      this.$store.dispatch("testplan/hideNewCategoryModal")
    },
    create (close) {
      const isDuplicated = utils.findBy_id(this.tlTreeViewData, utils.toCodeName('category', this.form.cat_name))
      if(typeof isDuplicated === "undefined"){
        this.$store.dispatch('testplan/createCategory', {
          name: this.form.cat_name,
          description: this.form.cat_description,
          user: this.currentUser.email,
          type: 'category',
          _id: utils.toCodeName('category',this.form.cat_name),
          testsuites: [],
          status: '',
          work_items: this.form.arr_work_items,
          children: []
        })
        // this.$q.notify({message: `Create category success`, position: "bottom-right", color: "positive"})
      }else{
        // this.$q.notify({message: `Create Failed: Duplicated category id ${utils.toCodeName('category', this.cat_name)}`, position: "bottom-right", color: "warning"})
      }
      if(close) {
        this.cancel()
        this.changeSelectedNodeID(utils.toCodeName('category', this.form.cat_name))
      }else{
        this.clearForm()
      }
    }
  },
  created (){
    this.$root.$on("openNewCategoryModalEvent", this.clearForm)
  },
  computed: {
    ...mapGetters({
      newCategoryModal: 'testplan/newCategoryModal',
      currentUser: 'auth/currentUser',
      tlTreeViewData: 'testplan/treeViewData'
    }),
    arr_work_items () {
      return this.form.cat_workitems.split(",")
    }
  }
}
</script>

<style scoped lang="scss">
  .el-dialog__wrapper {
    &__body {
      padding: 0px;
    }
  }
  .el-button {
    float: right;
    margin-left: 10px;
  }
</style>
