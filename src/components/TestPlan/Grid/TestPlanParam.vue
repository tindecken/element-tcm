<template>
  <div>
    <el-row align="middle" type="flex">
      <el-col><el-input size="small" v-model="value" @change="changedValueHandler"></el-input></el-col>
      <i class="el-icon-tickets" @click="setEnv"></i>
    </el-row>
    <choose-environment-modal></choose-environment-modal>
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
    }
  },
  created () {
    getValue(this.selectedTestSuite.environment, this.cellData.ref_node).then(res => {
      if(res) this.value = res
      else this.value = this.cellData.value
    })
  },
  computed: {
    ...mapGetters({
      selectedTestSuite: 'testplan/selectedTestSuite',
    }),
  }
};
</script>

<style scoped>

</style>
