<template>
  <div>
    <el-table
      :height="tableHeight"
      stripe
      :data="steps"
      highlight-current-row
      style="width: 100%"
      @cell-mouse-enter="cellMouseEnter"
      @row-contextmenu="rowMenu"
      class="tc_table"
      ref="tlTable"
    >
      <template slot="append">
        <el-button type="primary" icon="el-icon-plus" plain @click="newStep" size="small"> New Step</el-button>
      </template>
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="client" label="Client" width="100">
        <template slot-scope="scope">
          <test-plan-client :client.sync="scope.row.client"></test-plan-client>
        </template>
      </el-table-column>
      <el-table-column resizable prop="name" label="Keyword" width="150">
        <template slot-scope="scope">
          <test-plan-keyword :keyword.sync="scope.row.keyword" :params.sync="scope.row.params"></test-plan-keyword>
          <!-- <vue-json-pretty v-if="scope.row.params"
            :data="scope.row.params"
            >
          </vue-json-pretty>-->
        </template>
      </el-table-column>
      <el-table-column resizable width="300" label="Param 1" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[0]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[0]" :cellData.sync="scope.row.params[0]"></test-plan-param>
          <!-- <vue-json-pretty v-if="scope.row.params[0]"
            :data="scope.row.params[0]"
            >
          </vue-json-pretty>-->
        </template>
      </el-table-column>
      <el-table-column resizable width="300" label="Param 2" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[1]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[1]" :cellData.sync="scope.row.params[1]"></test-plan-param>
          <!-- <vue-json-pretty v-if="scope.row.params[1]"
            :data="scope.row.params[1]"
            >
          </vue-json-pretty>-->
        </template>
      </el-table-column>
      <el-table-column resizable width="300" label="Param 3" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[2]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[2]" :cellData.sync="scope.row.params[2]"></test-plan-param>
          <!-- <vue-json-pretty v-if="scope.row.params[2]"
            :data="scope.row.params[2]"
            >
          </vue-json-pretty>-->
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 4" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[3]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[3]" :cellData.sync="scope.row.params[3]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 5" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[4]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[4]" :cellData.sync="scope.row.params[4]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 6" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[5]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[5]" :cellData.sync="scope.row.params[5]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 7" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[6]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[6]" :cellData.sync="scope.row.params[6]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 8" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[7]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[7]" :cellData.sync="scope.row.params[7]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 9" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[8]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[8]" :cellData.sync="scope.row.params[8]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 10" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[9]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[9]" :cellData.sync="scope.row.params[9]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 11" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[10]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[10]" :cellData.sync="scope.row.params[10]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 12" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[11]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[11]" :cellData.sync="scope.row.params[11]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 13" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[12]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[12]" :cellData.sync="scope.row.params[12]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 14" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[13]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[13]" :cellData.sync="scope.row.params[13]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 15" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[14]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[14]" :cellData.sync="scope.row.params[14]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 16" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[15]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[15]" :cellData.sync="scope.row.params[15]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 17" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[16]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[16]" :cellData.sync="scope.row.params[16]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 18" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[17]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[17]" :cellData.sync="scope.row.params[17]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 19" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[18]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[18]" :cellData.sync="scope.row.params[18]"></test-plan-param>
        </template>
      </el-table-column>
      <el-table-column resizable width="100" label="Param 20" class="el-column">
        <template slot="header" slot-scope="scope">
          <test-plan-header v-bind:headerData="headers[19]"></test-plan-header>
        </template>
        <template slot-scope="scope">
          <test-plan-param v-if="scope.row.params[19]" :cellData.sync="scope.row.params[19]"></test-plan-param>
        </template>
      </el-table-column>
    </el-table>
    <vue-json-pretty :data="steps"></vue-json-pretty>
  </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty"
import { getTestCaseDetail } from "../../backend/testplan"
import TestPlanParam from "./Grid/TestPlanParam"
import TestPlanHeader from "./Grid/TestPlanHeader"
import TestPlanClient from "./Grid/TestPlanClient"
import TestPlanKeyword from "./Grid/TestPlanKeyword"
import { StepMenu } from "../../menus/TestPlanGridMenus"
import { getValue } from "../../backend/testplan"
import _ from "lodash"
import { mapGetters } from "vuex"
import { EventHandler } from "../../utils/event_handler"
import { generateUUID } from "../../utils/index"

const menuStep = new StepMenu();

export default {
  components: {
    TestPlanParam,
    TestPlanHeader,
    TestPlanClient,
    TestPlanKeyword,
    VueJsonPretty
  },
  name: "test-plan-tab",
  props: ["testcase", "changed", "originTestCase"],
  data() {
    return {
      steps: [],
      originalTestCase: [],
      search: "",
      headers: [],
      change: false,
      tcUUID: '',
    };
  },
  watch: {
    steps: {
      handler: function(newValue) {
        if (_.isEqual(newValue, this.originalTestCase)) {
          if(this.change) {
            this.change = false
            this.$emit("updateChanged", this.change)
          }
        } else {
          if(!this.change) {
            this.change = true
            this.$emit("updateChanged", this.change)
          }
        }
      },
      deep: true
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    cellMouseEnter(row, column, cell, event) {
      this.headers = row.params;
    },
    rowMenu(row, column, event) {
      menuStep.toggle(row);
    },
    newStep() {
      let defaultStep = {
        name: `Step ${this.steps.length + 1}`,
        description: "defaultStep",
        enabled: true,
        status: "norun",
        type: "step",
        client: "",
        imgURL: "",
        keyword: "",
        params: [],
        startTime: "",
        endTime: ""
      };
      this.steps.push(defaultStep);
    },
    async asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }
  },
  async created() {
    const steps = await getTestCaseDetail(this.testcase._id);
    await this.asyncForEach(steps, async ({ params }) => {
      await this.asyncForEach(params, async param => {
        let retrievedValue = await getValue(
          this.selectedTestSuite.environment,
          param.ref_node
        );
        if (retrievedValue) param.value = retrievedValue;
      });
    });
    this.steps = steps;
    this.originalTestCase = _.cloneDeep(this.steps)
    this.$emit("updateOriginTestCase", this.originalTestCase)
  },
  mounted() {
    this.tcUUID = generateUUID()
  },
  computed: {
    ...mapGetters({
      selectedTestSuite: "testplan/selectedTestSuite"
    }),
    tableHeight: {
      get() {
        return this.$store.state.global.tableHeight;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tc_table {
  & /deep/ .el-table__body-wrapper {
    padding: 2px;
  }
}
.tc_table {
  & /deep/ .el-table__body-wrapper td {
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
</style>
