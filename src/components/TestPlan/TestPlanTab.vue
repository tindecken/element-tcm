<template>
  <div>
    <el-input
      v-model="search"
      size="mini"
      placeholder="Type to search"/>
    <el-table
      :data="data"
      border
      highlight-current-row
      style="width: 100%"
      @row-click="rowClick">
      <el-table-column
        type="index"
        :index="indexMethod">
      </el-table-column>
      <el-table-column
        prop="client"
        label="Client"
        width="100"
        >
        <template slot-scope="scope">
          <test-plan-client></test-plan-client>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Keyword"
        width="200">
      </el-table-column>
      <el-table-column
         resizable width="100" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[0]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[0]" :cellData="scope.row.params[0]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column
        resizable width="100" label="Param 2" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[1]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[1]" :cellData="scope.row.params[1]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column
        resizable width="100" label="Param 3" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[2]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[2]" :cellData="scope.row.params[2]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column
        resizable width="100" label="Param 4" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[3]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[3]" :cellData="scope.row.params[3]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column
        resizable width="100" label="Param 5" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[4]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[4]" :cellData="scope.row.params[4]"></test-plan-param>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTestCaseDetail } from "../../backend/testplan"
import TestPlanParam from './Grid/TestPlanParam'
import TestPlanHeader from './Grid/TestPlanHeader'
import TestPlanClient from './Grid/TestPlanClient'
export default {
  components: {
    TestPlanParam,
    TestPlanHeader,
    TestPlanClient
  },
  name: "test-plan-tab",
  props: {
    testcase: Object
  },
  data() {
    return {
      data: [],
      search: '',
      headers: [],
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    rowClick(row, event, column) {
      console.log(row)
      this.headers = row.params
    },
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
