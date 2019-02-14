<template>
    <el-container>
      <div v-shortkey="{win:['ctrl', 'w']}" @shortkey="removeTab(activeTab)"></div>
      <div v-shortkey="{win:['ctrl', 'tab']}" @shortkey="nextTab(activeTab)"></div>
      <el-main>
        <el-tabs v-model="activeTab" type="card" closable style="width: 100%" @tab-remove="removeTab">
          <el-tab-pane label="Debug" name="debug">
            <vue-json-pretty
              :data="debug"
              >
            </vue-json-pretty>
          </el-tab-pane>
          <el-tab-pane v-for="testcase in openedTCs" :key="testcase._id" :label="testcase.name" :name="testcase._id">
            <test-plan-tab :testcase="testcase"></test-plan-tab>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
</template>

<script>
import TestPlanTab from './TestPlanTab'
import VueJsonPretty from 'vue-json-pretty'
import { mapGetters } from 'vuex'
  export default {
    name: 'test-plan-detail',
    components: {
      VueJsonPretty,
      TestPlanTab
    },
    data () {
      return {
      }
    },
    methods: {
      nextTab (targetName) {
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
      removeTab (targetName) {
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
        this.$store.dispatch('testplan/deleteOpenedTCs', targetName)
      }
    },
    computed: {
      activeTab: {
        get () {
          return this.$store.state.testplan.activeTab
        },
        set (value) {
          this.$store.dispatch('testplan/changeActiveTab', value)
        }
      },
      openedTCs: {
        get () {
          return this.$store.state.testplan.openedTCs
        },
        set (value) {
          this.$store.dispatch('testplan/changeOpenedTCs', value)
        }
      },
      debug: {
        set (value) {
          this.$store.dispatch('global/changeDebug', value)
        },
        get () {
          return this.$store.state.global.debug
        }
      },
    }
  }
</script>

<style scoped>
.el-container {
	height: 100%;
	padding: 0px
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
</style>
