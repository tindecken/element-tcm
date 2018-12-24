<template>
  <el-dialog
		:visible.sync="newCategoryModal.isVisible"
		title="Create New Category"
		:show-close="true"
		:close-on-click-modal="false"
    :center="true"
    width="40%"
    :close-on-press-escape="true"
    :before-close="cancel">
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
            <el-button type="primary" @click="create(close=false)" :disabled="$v.$invalid" plain>Create</el-button>
            <el-button type="primary" @click="create(close=true)" :disabled="$v.$invalid" plain>Create & Close</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import * as utils from '../../../../utils/index'
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
      }
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
      this.clearForm()
      this.$store.dispatch("testplan/hideNewCategoryModal")
    },
    create (close) {
      let obj = {
        name: this.form.cat_name,
        description: this.form.cat_description,
        author: this.currentUser.email,
        type: 'category',
        _id: utils.toCodeName('category',this.form.cat_name),
        testsuites: [],
        status: '',
        work_items: this.arr_work_items,
        children: []
      }
      const isDuplicated = utils.findBy_id(this.tlTreeViewData, utils.toCodeName('category', this.form.cat_name))
      if(typeof isDuplicated === "undefined"){
        this.$store.dispatch('testplan/createCategory', obj)
        this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: `Created category <strong>${this.form.cat_name}</strong>`,
          type: 'success',
          position: 'bottom-right'
        });
      }else{
        this.$notify({
          title: 'Error',
          dangerouslyUseHTMLString: true,
          message: `Duplicated category <strong>${this.form.cat_name}</strong>`,
          type: 'error',
          position: 'bottom-right'
        });
      }
      if(close) {
        this.changeSelectedNodeID(utils.toCodeName('category', this.form.cat_name))
        this.debug = obj
        this.activeTab = 'debug'
        this.cancel()
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
      let temp = this.form.cat_workitems.split(",")
      temp = temp.map((workItem) => workItem.trim())
      return temp
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
  }
}
</script>

<style scoped lang="scss">
  .el-button {
    float: right;
    margin-left: 10px;
  }
</style>
