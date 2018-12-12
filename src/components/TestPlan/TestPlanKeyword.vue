<template>
    <el-container>
      <el-header style="height: 40px">Keywords</el-header>
      <el-main>Main</el-main>
    </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name: 'test-plan-keyword',
    data () {
      return {
      }
    },
    methods: {
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
