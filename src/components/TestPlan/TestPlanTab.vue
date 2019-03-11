<template>
  <div>
    <el-table
      stripe
      :data="data"
      border
      highlight-current-row
      style="width: 100%"
      @cell-mouse-enter	="cellMouseEnter"
      @row-contextmenu="rowMenu"
      class="tc_table"
      ref="tlTable">
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
          <test-plan-client :client="scope.row.client"></test-plan-client>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Keyword"
        width="150">
        <template slot-scope="scope">
          <test-plan-keyword :keyword="scope.row.keyword" :params.sync="scope.row.params"></test-plan-keyword>
        </template>
      </el-table-column>
      <el-table-column
         resizable width="100" label="Param 1" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[0]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[0]" :cellData.sync="scope.row.params[0]"></test-plan-param>
          <vue-json-pretty
            :data="scope.row.params[0]"
            >
          </vue-json-pretty>
        </template>
      </el-table-column>
      <el-table-column
        resizable width="100" label="Param 2" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[1]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[1]" :cellData.sync="scope.row.params[1]"></test-plan-param>
          <vue-json-pretty
            :data="scope.row.params[1]"
            >
          </vue-json-pretty>
        </template>
      </el-table-column>
      <el-table-column
        resizable width="100" label="Param 3" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[2]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[2]" :cellData.sync="scope.row.params[2]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column
        resizable width="100" label="Param 4" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[3]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[3]" :cellData.sync="scope.row.params[3]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column
        resizable width="100" label="Param 5" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[4]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[4]" :cellData.sync="scope.row.params[4]"></test-plan-param>
        </template>
      </el-table-column>
    </el-table>
    <vue-json-pretty
      :data="data"
      >
    </vue-json-pretty>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import { getTestCaseDetail } from "../../backend/testplan"
import TestPlanParam from './Grid/TestPlanParam'
import TestPlanHeader from './Grid/TestPlanHeader'
import TestPlanClient from './Grid/TestPlanClient'
import TestPlanKeyword from './Grid/TestPlanKeyword'
import { EventHandler } from "../../utils/event_handler"
export default {
  components: {
    TestPlanParam,
    TestPlanHeader,
    TestPlanClient,
    TestPlanKeyword,
    VueJsonPretty
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
    cellMouseEnter(row, column, cell, event) {
      // console.log('current row', row)
      this.headers = row.params
    },
    rowMenu(row, column, event) {
      console.log(row, column, event)
    }
  },
  created () {
    getTestCaseDetail(this.testcase._id).then((result) => {
      this.data = result
    })
  },
};
</script>

<style lang="scss" scoped>
.tc_table {
  & /deep/ .el-table__body-wrapper {
    padding: 2px;
  }
}
.tc_table {
  & /deep/ .el-table__body-wrapper td{
    padding: 0px;
  }
}
.tc_table {
  & /deep/ .el-table__body-wrapper .cell {
    padding: 0px;
  }
}

.tc_table {
  & /deep/ .el-input__inner {
    padding-left: 2px;
  }
}
// .el-table__row {
//   & /deep/ td .cell {
//     padding: 0px;
//   }
// }

// .el-table__row {
//   & /deep/ td .cell .el-input__inner {
//     padding: 0px;
//   }
// }
</style>
