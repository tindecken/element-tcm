<template>
    <el-container>
      <el-header style="height: 40px">Header</el-header>
      <el-main>
        <el-tabs v-model="selectedCase" stretch closable @tab-remove="removeTab" style="width: 100%">
          <el-tab-pane v-for="testcase in openedCases" :key="testcase.id" :label="testcase" :name="testcase">
            
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name: 'test-plan-grid',
    data () {
      return {
      }
    },
    methods: {
      removeTab(targetName) {
        let tabs = this.openedCases;
        let activeName = this.selectedCase;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab;
              }
            }
          });
        }
        this.selectedCase = activeName;
        this.openedCases = tabs.filter(tab => tab !== targetName);
      }
    },
    computed: {
      selectedCase: {
        get () {
          return this.$store.state.testplan.selectedCase
        },
        set (value) {
          this.$store.dispatch('testplan/changeTab', value)
        }
      },
      openedCases: {
        get () {
          return this.$store.state.testplan.openedCases
        },
        set (value) {
          this.$store.dispatch('testplan/changeOpenedCases', value)
        }
      }
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
