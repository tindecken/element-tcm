<template>
  <div class="column">
    <q-tabs v-model="activeTab" animated color="transparent" text-color="primary" ref="tlTabs">
      <q-tab name="debug" slot="title" label="debug"></q-tab>
      <q-tab v-for="testcase in openedTCs" :key="testcase._id" :name="testcase._id" slot="title" class="q-pa-sm">
        <div>
          <span>{{testcase.name}}</span>
          <q-btn flat round dense icon="close" @click.stop="closeTab(testcase._id)"/>
        </div>
      </q-tab>
      <q-tab-pane v-for="testcase in openedTCs" :key="testcase._id" :name="testcase._id" keep-alive>
        <test-plan-tab :testcase="testcase"></test-plan-tab>
      </q-tab-pane>
      <q-tab-pane name="debug" keep-alive>
        <vue-json-pretty
          :data="debug" 
          >
        </vue-json-pretty>
      </q-tab-pane>
    </q-tabs>
  </div>
  
</template>

<script>
import TestPlanTab from './TestPlanTab'
import VueJsonPretty from 'vue-json-pretty'
export default {
  name: "test-plan-detail",
  components: { TestPlanTab, VueJsonPretty },
  data() {
    return {
    };
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    closeTab (tabID){   
      this.$store.dispatch('testplan/deleteOpenedTCs', tabID)
      if(this.activeTab === tabID){
          this.$refs.tlTabs.previous()
      }
    },
    test () {
      console.log('Test')
    }
  },
  created () {
  },
  computed: {
    openedTCs: {
      set (value) {
        this.$store.dispatch('testplan/changeOpenedTCs', value)
      },
      get () {
        return this.$store.state.testplan.openedTCs
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
    debug: {
      set (value) {
        this.$store.dispatch('global/changeDebug', value)
      },
      get () {
        return this.$store.state.global.debug
      }
    },
    selectedNodeID: {
      set (value) {
        this.$store.dispatch('testplan/changeSelectedNodeID', value)
      },
      get () {
        return this.$store.state.testplan.selectedNodeID
      }
    }
  }   
};
</script>

<style scoped>
  
</style>
