<template>
  <el-container>
    <el-header style="height: 40px">
      <app-header></app-header>
    </el-header>
    <el-main>
      <Split :gutterSize="4">
        <SplitArea :size="25">
          <el-tabs v-model="selectedTab" stretch>
            <el-tab-pane label="TEST PLAN" name="testplan">
              <test-plan-tree></test-plan-tree>
            </el-tab-pane>
            <el-tab-pane label="TEST LAB" name="testlab">
              <test-lab-tree></test-lab-tree>
            </el-tab-pane>
          </el-tabs>
        </SplitArea>
        <SplitArea :size="75">
          <keep-alive>
            <component v-bind:is="currentTabComponent"></component>
          </keep-alive>
        </SplitArea>
      </Split>
    </el-main>
    <el-footer style="height: 22px; ">
      <app-footer></app-footer>
    </el-footer>
	</el-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import AppFooter from '@/components/AppFooter'
  import AppHeader from '@/components/AppHeader'
  import TestPlanTree from '@/components/TestPlan/TestPlanTree'
  import TestLabTree from '@/components/TestLab/TestLabTree'
	import TestPlanDetail from '@/components/TestPlan/TestPlanDetail'
  import TestLabDetail from '@/components/TestLab/TestLabDetail'
  import { getClients, getKeywords } from '../backend/services'

  export default {
    name: 'home',
    components: { AppHeader, AppFooter, TestPlanTree, TestLabTree, TestPlanDetail, TestLabDetail },
		data (){
			return {
			}
		},
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      logout () {
				this.$router.push('/logout')
      },
    },
    created () {
      getClients().then((result) => {
        this.clients = result
      })
      getKeywords().then((result) => {
        this.keywords = result
      })
    },
    computed: {
      currentTabComponent () {
        if(this.$store.state.global.selectedTab === 'testplan'){
					return TestPlanDetail
        }else if(this.$store.state.global.selectedTab === 'testlab'){
					return TestLabDetail
        }
      },
      selectedTab:{
        get () {
          return this.$store.state.global.selectedTab
        },
        set(value) {
          this.$store.dispatch("global/changeSelectedTab", value);
        }
      },
      clients:{
        get () {
          return this.$store.state.global.clients
        },
        set(value) {
          this.$store.dispatch("global/changeClients", value);
        }
      },
      keywords:{
        get () {
          return this.$store.state.global.keywords
        },
        set(value) {
          this.$store.dispatch("global/changeKeywords", value);
        }
      }
		}
  }
</script>
<style scoped>
.el-footer{
	background-color: rgb(0,122,204);
  color: rgb(255,255,255);
  font-size: 12px;
  padding: 0px 10px 0px 10px;
  line-height: 22px;
  animation: fadein 0.8s;
}
.el-container {
	height: 100%;
	padding: 0px
}
.el-main{
  background: rgb(244, 240, 255);
  width: 100%;
  padding: 0px;
  display: flex;
  height: 100%;
  animation: fadein 0.8s;
}
.el-header {
  background-color: rgb(0,122,204);
  color: rgb(255,255,255);
	padding: 0px;
  animation: fadein 0.8s;
}
.split {
  background:#F5F7FA;
    height: 100%;
}

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
</style>
