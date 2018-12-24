<template>
  <el-dialog
		:visible.sync="newTestCaseModal.isVisible"
		:title="title"
		:show-close="true"
		:close-on-click-modal="false"
    :center="true"
    width="40%"
    :before-close="cancel">
    <el-form :model="form" label-position="right" ref="form">
      <el-form-item label="Name" :label-width="formLabelWidth">
        <el-input v-model.trim="form.case_name" clearable autofocus></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item label="Work Items" :label-width="formLabelWidth">
            <el-input v-model.trim="form.case_workitems" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Author" :label-width="formLabelWidth">
            <el-input v-model.trim="currentUser.name" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="Description" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="3" v-model.trim="form.case_description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end" style="margin-top: 5px;">
          <el-form-item>
            <el-checkbox v-model="addFirst">Add First</el-checkbox>
            <el-checkbox v-model="primaryCase" @change="primaryChange(primaryCase)">is Primary?</el-checkbox>
            <el-checkbox v-model="dependencyCase" @change="dependChange(dependencyCase)">is Dependency?</el-checkbox>
            <el-select v-model="dependOn" no-data-text="No primary case in this testsuite" placeholder="Depend on" :disabled="!dependencyCase" class="depend" >
              <el-option
                v-for="item in lstPrimaries"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
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
  name: "new-test-case-modal",
  data() {
    return {
      group_categoryID: '',
      dependOn: '',
      lstPrimaries: [],
      primaryCase: false,
      dependencyCase: false,
      selectedTestSuite: {},
      selectedTestGroup: {},
      addFirst: false,
      formLabelWidth: '90px',
      form: {
        case_name: '',
        case_workitems: '',
        case_description: '',
      }
    };
  },
  validations: {
    form: {
      case_name: { required }
    }
  },
  methods: {
    ...mapActions({
      changeSelectedNodeID: 'testplan/changeSelectedNodeID',
      createTestCase: 'testplan/createTestCase',
    }),
    primaryChange (value) {
      if(this.dependencyCase) this.dependencyCase = !value
    },
    dependChange (value) {
      if(this.primaryCase) this.primaryCase = !value
    },
    clearForm() {
      this.form.case_name = ''
      this.form.case_workitems = ''
      this.form.case_description = ''
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    cancel () {
      this.clearForm()
      this.$store.dispatch("testplan/hideNewTestCaseModal")
    },
    create (close) {
      let testcase = {
        name: this.form.case_name,
        description: this.form.case_description,
        author: this.currentUser.email,
        type: 'testcase',
        _id: utils.toCodeName('testcase',this.form.case_name),
        keywords: [],
        testgroup: this.groupOfCase,
        testsuite: this.suiteOfCase,
        status: '',
        work_items: this.arr_work_items,
        enabled: true,
        primary: this.primaryCase,
        dependency: this.dependCase
      }
      const isDuplicated = utils.findBy_id(this.tlTreeViewData, utils.toCodeName('testcase', this.form.case_name))
      if(typeof isDuplicated === "undefined"){
        if(this.selectedTestSuite){ //Right click on Test Suite
          this.createTestCase({
            case_id: utils.toCodeName('testcase', this.form.case_name),
            testcase: testcase,
            addFirst: this.addFirst,
            testsuite_id: this.selectedTestSuite._id,
            category_id: this.selectedTestSuite.category,
            testgroup_id: null
          })
        }else { //Right click on Test Group
          this.createTestCase({
            case_id: utils.toCodeName('testcase', this.form.case_name),
            testcase: testcase,
            addFirst: this.addFirst,
            category_id: this.group_categoryID,
            testsuite_id: this.selectedTestGroup.testsuite,
            testgroup_id: this.selectedTestGroup._id
          })
        }
        this.changeSelectedNodeID(utils.toCodeName('testcase', this.form.case_name))
        this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: `Created Test Case <strong>${this.form.case_name}</strong>`,
          type: 'success',
          position: 'bottom-right'
        })
      }else{
        this.$notify({
          title: 'Error',
          dangerouslyUseHTMLString: true,
          message: `Duplicated Test Case Name <strong>${this.form.case_name}</strong>`,
          type: 'error',
          position: 'bottom-right'
        });
      }
      if(close) {
        this.cancel()
        this.changeSelectedNodeID(utils.toCodeName('testcase', this.form.case_name))
      }else{
        this.lstPrimaries = utils.getPrimaries(this.tlTreeViewData, '_id', 'testcase', 'children', [])
        this.clearForm()
      }
    }
  },
  created (){

  },
  created() {
    EventHandler.on("openNewTestCaseModalEvent", (parent) => {
      if(parent.type === 'testsuite'){
        this.selectedTestSuite = parent
        this.selectedTestGroup = null
        console.log('Test Suite - this.lstPrimaries', this.lstPrimaries)
      }else if (parent.type === 'testgroup') {
        this.selectedTestGroup = parent
        this.group_categoryID = parent.category_id
        this.selectedTestSuite = null
      }
      this.lstPrimaries = utils.getPrimaries(parent.children, '_id', 'testcase', 'children', [])
      this.clearForm()
    })
  },
  computed: {
    ...mapGetters({
      newTestCaseModal: 'testplan/newTestCaseModal',
      currentUser: 'auth/currentUser',
      tlTreeViewData: 'testplan/treeViewData'
    }),
    arr_work_items () {
      let temp = this.form.case_workitems.split(",")
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
      if(this.selectedTestGroup) return `Create new test case for testgroup ${this.selectedTestGroup.name}`
      else return `Create new test case for testsuite ${this.selectedTestSuite.name}`
    },
    dependCase () {
      if(this.dependencyCase) return this.dependOn
      else return ""
    },
    suiteOfCase () {
      if(this.selectedTestSuite) return this.selectedTestSuite._id
      else return ""
    },
    groupOfCase () {
      if(this.selectedTestGroup) return this.selectedTestGroup._id
      else return ""
    }
  }
}
</script>

<style scoped>
  .depend { 
    margin-left: 5px;
   }
  .el-button {
    float: right;
    margin-left: 10px;
  }

</style>
