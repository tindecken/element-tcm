<template>
  <div>
    <el-row align="middle" type="flex">
      <el-col>
        <el-input :readonly="useEnv" size="small" v-model="cellData.value"
        @change="changedValueHandler" v-bind:class="{ 'useEnv': useEnv, 'useBuffer': useBuffer}"
        ref="tlParam">
        </el-input>
      </el-col>
      <i class="el-icon-tickets hover" @click="setEnv"></i>
    </el-row>
  </div>
</template>

<script>

import VueJsonPretty from 'vue-json-pretty'
import { getValue } from '../../../backend/testplan'
import { mapGetters  } from 'vuex'
import { EventHandler } from "../../../utils/event_handler"
export default {
  props: ['cellData'],
  name: "test-plan-param",
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      useEnv: false,
      useBuffer: false,
      paramID: ''
    }
  },
  methods: {
    setEnv () {
      this.paramID = Math.random()
      let data = {
        ...this.cellData,
        id: this.paramID
      }
      EventHandler.emit('openChooseEnvironmentModalEvent', data);
      this.$store.dispatch('testplan/showChooseEnvironmentModal', null)
    },
    changedValueHandler(newValue) {
      let updatedCellData = this.cellData
      updatedCellData.value = newValue
      this.$emit("update:cellData", updatedCellData);
      if(newValue.match('^@.*@$')){
        this.useBuffer = true
      }else{
        this.useBuffer = false
      }
    }
  },
  created () {
    EventHandler.on("chooseChooseEnvironmentModalEvent", (envData) => {
      if(this.paramID === envData.paramID) {
        let updatedCellData = this.cellData
        updatedCellData.value = envData.value
        updatedCellData.ref_node = envData.node
        this.$emit("update:cellData", updatedCellData)
        this.useEnv = true
      }
    })
    EventHandler.on("unuseChooseEnvironmentModalEvent", (paramID) => {
      if(this.paramID === paramID) {
        let updatedCellData = this.cellData
        updatedCellData.ref_node = ''
        this.$emit("update:cellData", updatedCellData)
        this.useEnv = false
      }
    })
    EventHandler.on("resetParamClass", () => {
      this.useEnv = false
      this.useBuffer = false
    })
    getValue(this.selectedTestSuite.environment, this.cellData.ref_node).then(res => {
      if(res) {
        this.cellData.value = res
        this.useEnv = true
      }
      else {
        if(this.cellData.value.match('^@.*@$')){
          this.useBuffer = true
        }else{
          this.useBuffer = false
        }
        this.useEnv = false
      }
    })
  },
  computed: {
    ...mapGetters({
      selectedTestSuite: 'testplan/selectedTestSuite',
    })
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

i.hover {
  cursor: pointer;
}

</style>
