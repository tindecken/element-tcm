<template>
  <el-container>
    <div v-shortkey="{win:['ctrl', 'w']}" @shortkey="removeTab(activeTab)"></div>
    <div v-shortkey="{win:['ctrl', 'tab']}" @shortkey="nextTab(activeTab)"></div>
    <el-main ref="tlDetail">
      <el-tabs v-model="activeTab" type="card" closable style="width: 100%" @tab-remove="removeTab">
        <el-tab-pane label="Debug" name="debug">
          <vue-json-pretty :data="debug"></vue-json-pretty>
        </el-tab-pane>
        <el-tab-pane v-for="testcase in openedTCs" :key="testcase._id" :name="testcase._id">
          <span slot="label" v-bind:class="{ 'italic': testcase.changed }">{{testcase.name}} <font-awesome-icon v-if="testcase.changed" :icon="['far', 'dot-circle']"/></span>
          <test-plan-tab :testcase="testcase" :changed="testcase.changed" @updateChanged="updateChanged(testcase, $event)" :originTestCase="testcase.origin" @updateOriginTestCase="updateOriginTestCase(testcase, $event)"></test-plan-tab>
        </el-tab-pane>
      </el-tabs>
      <choose-environment-modal></choose-environment-modal>
      <unsaved-test-case-modal></unsaved-test-case-modal>
    </el-main>
  </el-container>
</template>

<script>
import * as utils from "../../utils/index"
import TestPlanTab from "./TestPlanTab"
import VueJsonPretty from "vue-json-pretty"
import ChooseEnvironmentModal from "./Modals/Environment/ChooseEnvironmentModal"
import UnsavedTestCaseModal from "./Modals/TestPlanDetail/UnsavedTestCaseModal"
import { remote } from "electron"
import _ from "lodash"
import { EventHandler } from "../../utils/event_handler"

export default {
  name: "test-plan-detail",
  components: {
    VueJsonPretty,
    TestPlanTab,
    ChooseEnvironmentModal,
    UnsavedTestCaseModal
  },
  data() {
    return {};
  },
  methods: {
    updateChanged (testcase, data) {
      let temp = _.cloneDeep(testcase)
      temp.changed = data
      this.$store.dispatch("testplan/updateTestCase", temp)
    },
    updateOriginTestCase(testcase, originTestCase){
      let payload = {
        testcase_id: testcase._id,
        originTestCase: originTestCase
      }
      this.$store.dispatch("testplan/updateOriginTestCase", payload)
    },
    nextTab(targetName) {
      let tabs = this.openedTCs;
      let activeName = this.activeTab;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab._id === targetName) {
            let nextTab = tabs[index + 1] || tabs[0];
            if (nextTab) {
              activeName = nextTab._id;
            }
          }
        });
      }
      this.activeTab = activeName;
    },
    removeTab(targetName) {
      //if Tab is unsaved
      if(utils.isSavedTC(this.openedTCs, targetName)){
        let payload = {
          openedTCs: this.openedTCs,
          testcase_id: targetName
        }
        EventHandler.emit('openUnsavedTestCaseModalEvent', payload)
        this.$store.dispatch('testplan/showUnsavedTestCaseModal', null)
      }else{
        let tabs = this.openedTCs
        let activeName = this.activeTab
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab._id === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab._id
              }
            }
          })
        }
        this.activeTab = activeName;
        this.$store.dispatch("testplan/deleteOpenedTCs", targetName)
      }
    }
  },
  mounted() {
    let currentWindow = remote.getCurrentWindow().removeAllListeners()
    currentWindow.on("resize", () => {
      this.tableHeight = this.$refs.tlDetail.$el.clientHeight - 60
    });
  },
  computed: {
    activeTab: {
      get() {
        return this.$store.state.testplan.activeTab
      },
      set(value) {
        this.$store.dispatch("testplan/changeActiveTab", value)
      }
    },
    openedTCs: {
      get() {
        return this.$store.state.testplan.openedTCs
      },
      set(value) {
        this.$store.dispatch("testplan/changeOpenedTCs", value)
      }
    },
    debug: {
      set(value) {
        this.$store.dispatch("global/changeDebug", value)
      },
      get() {
        return this.$store.state.global.debug
      }
    },
    tableHeight: {
      set(value) {
        this.$store.dispatch("global/changeTableHeight", value)
      },
      get() {
        return this.$store.state.global.tableHeight
      }
    }
  }
};
</script>

<style scoped>
.el-container {
  height: 100%;
  padding: 0px;
}
.el-header {
  background: #d7e4cd;
  padding: 0px;
  animation: fadein 0.8s;
}
.el-main {
  background: rgb(234, 239, 241);
  width: 100%;
  padding: 0px;
  display: flex;
  height: 100%;
}
.italic {
  font-style: italic;
}
</style>
