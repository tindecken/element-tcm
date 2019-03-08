<template>
  <el-dialog
		:visible.sync="chooseEnvironmentModal.isVisible"
		title="Select node"
		:show-close="true"
		:close-on-click-modal="false"
    :center="true"
    width="40%"
    :before-close="close">
    <el-button
      @click="unuse">UnUse
    </el-button>
    <el-table
    :data="environments.filter(data => !searchName || data.node.toLowerCase().includes(searchName.toLowerCase()))"
    stripe
    border
    highlight-current-row
    ref="dtEnvironment"
    row-key="node"
    style="width: 100%">
    <el-table-column
      type="index"
      :index="indexMethod">
    </el-table-column>
    <el-table-column
      prop="node"
      label="Name"
      width="160">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="searchName"
          placeholder="Name"/>
      </template>
      <template slot-scope="scope">
        <span>{{scope.row.node}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="value"
      label="Value"
      width="180">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="searchValue"
          placeholder="Value"
          :disabled="true"/>
      </template>
      <template slot-scope="scope">
        <span>{{scope.row.value}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="description"
      label="Description">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="searchDescription"
          placeholder="Description"
          :disabled="true"/>
      </template>
      <template slot-scope="scope">
        <span>{{scope.row.description}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Operation"
      width="100">
      <template slot-scope="scope">
        <el-button
          @click="choose(scope.$index, scope.row)">Choose</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-dialog>
</template>

<script>
import * as utils from '../../../../utils/index'
import { EventHandler } from "../../../../utils/event_handler"
import { mapGetters  } from 'vuex'
import { getEnvironment } from '../../../../backend/testplan'

export default {
  name: "choose-environment-modal",
  data() {
    return {
      environments: [],
      searchName: '',
      searchValue: '',
      searchDescription: '',
      paramID: '',
    }
  },
  methods: {
    close () {
      this.$store.dispatch("testplan/hideChooseEnvironmentModal")
    },
    indexMethod(index) {
      return index + 1;
    },
    choose (index, cellData) {
      let data = {
        ...cellData,
        paramID: this.paramID
      }
      EventHandler.emit('chooseChooseEnvironmentModalEvent', data);
      this.close()
    },
    unuse () {
      EventHandler.emit('unuseChooseEnvironmentModalEvent', this.paramID);
    }
  },
  created () {
    EventHandler.on("openChooseEnvironmentModalEvent", (paramData) => {
      this.paramID = paramData.id
      getEnvironment(this.selectedTestSuite._id).then(env => {
        this.environments = env.nodes
        let tgt = this.environments.filter(item => {
          if (item.node === paramData.ref_node) return item;
        });
        if (tgt[0]) {
          this.$refs.dtEnvironment.setCurrentRow(tgt[0]);
        }else {
          this.$refs.dtEnvironment.setCurrentRow(null);
        }
      })
    })
  },
  destroyed () {
    console.log("openChooseEnvironmentModalEvent destroyed")
  },
  computed: {
    ...mapGetters({
      chooseEnvironmentModal: 'testplan/chooseEnvironmentModal',
      selectedTestSuite: 'testplan/selectedTestSuite',
    }),
  }
}
</script>

<style scoped>
</style>
