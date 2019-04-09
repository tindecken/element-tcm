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
          <span slot="label" v-bind:class="{ 'italic': testcase.changed }">{{testcase.name}} <i v-if="testcase.changed" class="el-icon-more-outline"></i></span>
          <test-plan-tab :testcase="testcase" :changed="testcase.changed" @updateChanged="updateChanged(testcase, $event)"></test-plan-tab>
        </el-tab-pane>
      </el-tabs>
      <choose-environment-modal></choose-environment-modal>
    </el-main>
  </el-container>
</template>

<script>
import TestPlanTab from "./TestPlanTab";
import VueJsonPretty from "vue-json-pretty";
import ChooseEnvironmentModal from "./Modals/Environment/ChooseEnvironmentModal";
import { remote } from "electron";
import _ from "lodash";

export default {
  name: "test-plan-detail",
  components: {
    VueJsonPretty,
    TestPlanTab,
    ChooseEnvironmentModal
  },
  data() {
    return {};
  },
  methods: {
    updateChanged (testcase, data) {
      console.log('testcase', testcase, 'data', data)
      // testcase.changed = data
      let temp = _.cloneDeep(testcase);
      temp.changed = data
      this.$store.dispatch("testplan/updateTestCase", temp);
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
      let tabs = this.openedTCs;
      let activeName = this.activeTab;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab._id === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab._id;
            }
          }
        });
      }
      this.activeTab = activeName;
      this.$store.dispatch("testplan/deleteOpenedTCs", targetName);
    }
  },
  mounted() {
    let currentWindow = remote.getCurrentWindow().removeAllListeners();
    currentWindow.on("resize", () => {
      this.tableHeight = this.$refs.tlDetail.$el.clientHeight - 60;
    });
  },
  computed: {
    activeTab: {
      get() {
        return this.$store.state.testplan.activeTab;
      },
      set(value) {
        this.$store.dispatch("testplan/changeActiveTab", value);
      }
    },
    openedTCs: {
      get() {
        return this.$store.state.testplan.openedTCs;
      },
      set(value) {
        this.$store.dispatch("testplan/changeOpenedTCs", value);
      }
    },
    debug: {
      set(value) {
        this.$store.dispatch("global/changeDebug", value);
      },
      get() {
        return this.$store.state.global.debug;
      }
    },
    tableHeight: {
      set(value) {
        this.$store.dispatch("global/changeTableHeight", value);
      },
      get() {
        return this.$store.state.global.tableHeight;
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
  font-weight: bold;
}
</style>
