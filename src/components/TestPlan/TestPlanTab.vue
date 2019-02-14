<template>
  <div>
    <el-table
      :data="data"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="Keyword"
        width="150">
      </el-table-column>
      <el-table-column
        prop="client"
        label="Client"
        width="150">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import { getTestCaseDetail } from "../../backend/testplan"
export default {
  components: {
    VueJsonPretty
  },
  name: "test-plan-tab",
  props: ['testcase'],
  data() {
    return {
      data: {}
    };
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  },
  created () {
    
    getTestCaseDetail(this.testcase._id).then((result) => {
      this.data = result
    })
  },
};
</script>

<style scoped>

</style>
