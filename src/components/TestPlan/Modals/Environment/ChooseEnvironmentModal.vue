<template>
  <el-dialog
		:visible.sync="chooseEnvironmentModal.isVisible"
		title="Select node"
		:show-close="true"
		:close-on-click-modal="false"
    :center="true"
    width="40%"
    :before-close="cancel">
    <el-table
    :data="environments.filter(data => !searchName || data.node.toLowerCase().includes(searchName.toLowerCase()))"
    stripe
    border
    highlight-current-row
    style="width: 100%">
    <el-table-column
      type="index"
      :index="indexMethod">
    </el-table-column>
    <el-table-column
      prop="node"
      label="Name"
      width="180">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="searchName"
          size="mini"
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
          size="mini"
          placeholder="Value"/>
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
          size="mini"
          placeholder="Description"/>
      </template>
      <template slot-scope="scope">
        <span>{{scope.row.description}}</span>
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
      searchDescription: ''
    }
  },
  methods: {
    cancel () {
      this.$store.dispatch("testplan/hideChooseEnvironmentModal")
    },
    indexMethod(index) {
      return index + 1;
    },
  },
  created() {
    EventHandler.on("openChooseEnvironmentModalEvent", (payload) => {
      getEnvironment(this.selectedTestSuite._id).then(env => {
        this.environments = env.nodes
      })
    })
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
