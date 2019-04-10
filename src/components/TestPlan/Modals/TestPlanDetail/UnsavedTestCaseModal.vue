<template>
  <el-dialog
    :visible.sync="unsavedTestCaseModal.isVisible"
    :title="title"
    :show-close="true"
    :close-on-click-modal="false"
    :center="true"
    width="30%"
    :before-close="cancel">
    <el-row type="flex">
      <el-col :span="24">
        <span>Do you want to save this test case?</span>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="24">
        <el-button @click="cancel()">Cancel</el-button>
        <el-button @click="notSave()">Not Save</el-button>
        <el-button @click="save()">Save</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions, mapState  } from "vuex"
import * as utils from '../../../../utils/index'
import { EventHandler } from "../../../../utils/event_handler"

export default {
  name: "unsaved-test-case-modal",
  data() {
    return {
      opened: true,
      cat_id: '',
      cat_name: ''
    };
  },
  beforeMount() {
    
  },
  methods: {
    cancel () {
      this.$store.dispatch("testplan/hideUnsavedTestCaseModal")
    },
    notSave () {
      console.log('not save')
    },
    save () {
      console.log('save')
    },
  },
  created (){
    
  },
  computed: {
    ...mapGetters({
      unsavedTestCaseModal: 'testplan/unsavedTestCaseModal',
    }),
    title () {
      return `Test Case is unsaved yet`
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
