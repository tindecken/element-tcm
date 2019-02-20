<template>
  <el-dialog
		:visible.sync="chooseEnvironmentModal.isVisible"
		title="Select node"
		:show-close="true"
		:close-on-click-modal="false"
    :center="true"
    width="40%"
    :before-close="cancel">
    <el-button type="primary">Logout</el-button>
  </el-dialog>
</template>

<script>
import * as utils from '../../../../utils/index'
import { EventHandler } from "../../../../utils/event_handler"
import { mapGetters  } from 'vuex'

export default {
  name: "choose-environment-modal",
  data() {
    return {
    }
  },
  methods: {
    cancel () {
      this.$store.dispatch("testplan/hideChooseEnvironmentModal")
    }
  },
  created() {
    EventHandler.on("openChooseEnvironmentModalEvent", (payload) => {
      console.log('payload', payload)
    })
  },
  computed: {
    ...mapGetters({
      chooseEnvironmentModal: 'testplan/chooseEnvironmentModal',
    }),
  }
}
</script>

<style scoped>
</style>
