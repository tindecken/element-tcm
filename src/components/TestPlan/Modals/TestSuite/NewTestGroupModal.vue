<template>
  <el-dialog
		:visible.sync="newTestGroupModal.isVisible"
		:title="title"
		:show-close="true"
		:close-on-click-modal="false"
    :center="true"
    width="40%"
    :before-close="cancel">
    <el-form :model="form" label-position="right" ref="form">
      <el-form-item label="Name" :label-width="formLabelWidth">
        <el-input v-model.trim="form.group_name" clearable autofocus></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item label="Work Items" :label-width="formLabelWidth">
            <el-input v-model.trim="form.group_workitems" clearable placeholder="Separate by colon ','"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Author" :label-width="formLabelWidth">
            <el-input v-model.trim="currentUser.name" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Description" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="3" v-model.trim="form.group_description"></el-input>
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
  name: "new-test-group-modal",
  data() {
    return {
      selectedTestSuite: {},
      addFirst: false,
      formLabelWidth: '90px',
      form: {
        group_name: '',
        group_workitems: '',
        group_description: '',
      }
    };
  },
  validations: {
    form: {
      group_name: { required }
    }
  },
  methods: {
    ...mapActions({
      changeSelectedNodeID: 'testplan/changeSelectedNodeID',
      createTestGroup: 'testplan/createTestGroup',
    }),
    clearForm() {
      this.form.group_name = ''
      this.form.group_workitems = ''
      this.form.group_description = ''
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    cancel () {
      this.clearForm()
      this.$store.dispatch("testplan/hideNewTestGroupModal")
    },
    create (close) {
      let testgroup = {
        name: this.form.group_name,
        description: this.form.group_description,
        user: this.currentUser.email,
        type: 'testgroup',
        _id: utils.toCodeName('testgroup',this.form.group_name),
        testcases: [],
        testsuite: this.selectedTestSuite._id,
        status: '',
        work_items: this.arr_work_items,
        children: []
      }
      const isDuplicated = utils.findBy_id(this.tlTreeViewData, utils.toCodeName('testgroup', this.form.group_name))
      if(typeof isDuplicated === "undefined"){
        this.createTestGroup({
          group_id: utils.toCodeName('testgroup', this.form.group_name),
          testgroup: testgroup,
          addFirst: this.addFirst,
          testsuite_id: this.selectedTestSuite._id,
          category_id: this.selectedTestSuite.category
        })
        this.changeSelectedNodeID(utils.toCodeName('testgroup', this.form.group_name))
        this.$notify({
            title: 'Success',
            dangerouslyUseHTMLString: true,
            message: `Created Test Group <strong>${this.form.group_name}</strong>`,
            type: 'success',
            position: 'bottom-right'
          });
      }else{
        this.$notify({
          title: 'Error',
          dangerouslyUseHTMLString: true,
          message: `Duplicated Test Group Name <strong>${this.form.group_name}</strong>`,
          type: 'error',
          position: 'bottom-right'
        });
      }
      if(close) {
        this.cancel()
        this.changeSelectedNodeID(utils.toCodeName('testgroup', this.form.group_name))
      }else{
        this.clearForm()
      }
    }
  },
  created (){
  },
  beforeMount() {
    EventHandler.on("openNewTestGroupModalEvent", (testsuite) => {
      this.clearForm()
      console.log('testsuite', testsuite)
      this.selectedTestSuite = testsuite
    })
  },
  computed: {
    ...mapGetters({
      newTestGroupModal: 'testplan/newTestGroupModal',
      currentUser: 'auth/currentUser',
      tlTreeViewData: 'testplan/treeViewData'
    }),
    arr_work_items () {
      let temp = this.form.group_workitems.split(",")
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
    title () {
      return `Create new test group for testsuite ${this.selectedTestSuite.name}`
    }
  }
}
</script>

<style scoped lang="scss">
  .el-button {
    float: right;
    margin-left: 10px;
  }
</style>
