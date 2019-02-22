<template>
  <div>
    <el-row align="middle" type="flex">
      <el-col><el-input size="small" v-model="value" @change="changedValueHandler" v-bind:class="{ 'useEnv': useEnv, 'useBuffer': useBuffer}"></el-input></el-col>
      <i class="el-icon-tickets" @click="setEnv"></i>
    </el-row>
    <choose-environment-modal :ref_node.sync="cellData.ref_node"></choose-environment-modal>
  </div>
</template>

<script>
import ChooseEnvironmentModal from "../Modals/Environment/ChooseEnvironmentModal"
import VueJsonPretty from 'vue-json-pretty'
import { getValue } from '../../../backend/testplan'
import { mapGetters  } from 'vuex'
import { EventHandler } from "../../../utils/event_handler"
export default {
  props: ['cellData'],
  name: "test-plan-param",
  components: {
    VueJsonPretty,
    ChooseEnvironmentModal
  },
  data() {
    return {
      value: '',
      useEnv: false,
      useBuffer: false,
    }
  },
  methods: {
    setEnv () {
      EventHandler.emit('openChooseEnvironmentModalEvent', this.cellData);
      this.$store.dispatch('testplan/showChooseEnvironmentModal', null)
    },
    changedValueHandler(value) {
      let updatedCellData = this.cellData
      updatedCellData.value = value
      this.$emit("update:cellData", updatedCellData);
      if(value.match('^@.*@$')){
        this.useBuffer = true
      }else{
        this.useBuffer = false
      }
    }
  },
  created () {
    getValue(this.selectedTestSuite.environment, this.cellData.ref_node).then(res => {
      if(res) {
        this.value = res
        this.useEnv = true
      }
      else {
        if(this.cellData.value.match('^@.*@$')){
          this.useBuffer = true
        }else{
          this.useBuffer = false
        }
        this.value = this.cellData.value
        this.useEnv = false
      }
    })
  },
  computed: {
    ...mapGetters({
      selectedTestSuite: 'testplan/selectedTestSuite',
    }),
  }
};
</script>

<style lang="scss" scoped>
.useEnv {
  & /deep/ .el-input__inner {
    background-color: bisque;
  }
}

.useBuffer {
  & /deep/ .el-input__inner {
    background-color: #ceefe4;
  }
}

</style>
