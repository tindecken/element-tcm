<template>
  <el-dialog
    :visible.sync="newTestSuiteModal.isVisible"
    :title="title"
    :show-close="true"
    :close-on-click-modal="false"
    :center="true"
    width="40%">
    <el-form :model="form" label-position="right" ref="form">
      <el-form-item label="Name" :label-width="formLabelWidth">
        <el-input v-model.trim="form.suite_name" clearable autofocus></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item label="Work Items" :label-width="formLabelWidth">
            <el-input v-model.trim="form.suite_workitems" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Author" :label-width="formLabelWidth">
            <el-input v-model.trim="currentUser.name" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Description" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="3" v-model.trim="form.suite_description"></el-input>
        <el-checkbox v-model="addFirst">Add First</el-checkbox>
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
import { EventHandler } from "../../../../utils/event_handler"
export default {
  name: "new-test-suite-modal",
  data() {
    return {
      formLabelWidth: '90px',
      addFirst: false,
      opened: true,
      selectedCategory: {},
      form: {
        suite_name: '',
        suite_workitems: '',
        suite_description: '',
        bLastPos: true,
        addFirst: false
      }
    };
  },
  validations: {
    form: {
      suite_name: { required }
    }

  },
  methods: {
    ...mapActions({
      changeSelectedNodeID: 'testplan/changeSelectedNodeID',
      createTestSuite: 'testplan/createTestSuite',
    }),
    clearForm() {
      this.form.suite_name = ''
      this.form.suite_workitems = ''
      this.form.suite_description = ''
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    cancel () {
      this.$store.dispatch("testplan/hideNewTestSuiteModal")
    },
    create (close) {
      let testsuite = {
        name: this.form.suite_name,
        description: this.form.suite_description,
        user: this.currentUser.email,
        type: 'testsuite',
        _id: utils.toCodeName('testsuite',this.form.suite_name),
        testgroups: [],
        testcases: [],
        category: this.selectedCategory._id,
        status: '',
        work_items: this.form.arr_work_items,
        children: []
      }
      const isDuplicated = utils.findBy_id(this.tlTreeViewData, utils.toCodeName('testsuite', this.form.suite_name))
      if(typeof isDuplicated === "undefined"){
        this.createTestSuite({
          cat_id: this.selectedCategory._id,
          testsuite: testsuite,
          addFirst: this.addFirst,
        })
        this.changeSelectedNodeID(utils.toCodeName('testsuite', this.form.suite_name))
        this.$notify({
            title: 'Success',
            dangerouslyUseHTMLString: true,
            message: `Created Test Suite <strong>${this.form.suite_name}</strong>`,
            type: 'success',
            position: 'bottom-right'
          });
      }else{
        this.$notify({
          title: 'Error',
          dangerouslyUseHTMLString: true,
          message: `Duplicated Test Suite Name <strong>${this.form.suite_name}</strong>`,
          type: 'error',
          position: 'bottom-right'
        });
      }
      if(close) {
        this.cancel()
        this.changeSelectedNodeID(utils.toCodeName('testsuite', this.form.suite_name))
      }else{
        this.clearForm()
      }
    }
  },
  beforeMount() {
    EventHandler.on("openNewTestSuiteModalEvent", (category) => {
      this.clearForm()
      this.selectedCategory = category
    })
  },
  created (){
  },
  computed: {
    ...mapGetters({
      newTestSuiteModal: 'testplan/newTestSuiteModal',
      currentUser: 'auth/currentUser',
      tlTreeViewData: 'testplan/treeViewData'
    }),
    arr_work_items () {
      return this.suite_workitems.split(",")
    },
    title () {
      return `Create new test suite for category ${this.selectedCategory.name}`
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
