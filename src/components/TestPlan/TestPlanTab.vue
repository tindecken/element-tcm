<template>
  <div>
    <el-table
      :data="data"
      border
      highlight-current-row	
      style="width: 100%">
      <el-table-column
        type="index"
        :index="indexMethod">
      </el-table-column>
      <el-table-column
        prop="client"
        label="Client"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Keyword"
        width="200">
      </el-table-column>
      <el-table-column
         resizable width="100" label="Param 1" class="el-column">
        <template slot-scope="scope">
          <test-plan-cell v-if="scope.row.children[0]" :cellData="scope.row.children[0]"></test-plan-cell>
        </template>
      </el-table-column>
      <el-table-column
        resizable width="100" label="Param 2" class="el-column">
        <template slot-scope="scope">
          <test-plan-cell v-if="scope.row.children[1]" :cellData="scope.row.children[1]"></test-plan-cell>
        </template>
      </el-table-column>
      <el-table-column
        resizable width="100" label="Param 3" class="el-column">
        <template slot-scope="scope">
          <test-plan-cell v-if="scope.row.children[2]" :cellData="scope.row.children[2]"></test-plan-cell>
        </template>
      </el-table-column>
      <el-table-column
        resizable width="100" label="Param 4" class="el-column">
        <template slot-scope="scope">
          <test-plan-cell v-if="scope.row.children[3]" :cellData="scope.row.children[3]"></test-plan-cell>
        </template>
      </el-table-column>
      <el-table-column
        resizable width="100" label="Param 5" class="el-column">
        <template slot-scope="scope">
          <test-plan-cell v-if="scope.row.children[4]" :cellData="scope.row.children[4]"></test-plan-cell>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTestCaseDetail } from "../../backend/testplan"
import TestPlanCell from './TestPlanCell'
export default {
  components: {
    TestPlanCell
  },
  name: "test-plan-tab",
  props: {
    testcase: Object
  },
  data() {
    return {
      data: []
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    }
  },
  created () {
    getTestCaseDetail(this.testcase._id).then((result) => {
      this.data = result
    })
  },
};
</script>

<style lang="scss">
.el-table__row td{
  padding: 2px;
}
.el-table__row td .cell{
  padding: 0px;
}
.el-table__row td .cell .el-input__inner {
  padding-left: 2px
}
</style>
