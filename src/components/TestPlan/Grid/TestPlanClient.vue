<template>
  <el-select v-model="selectedClient" filterable placeholder="Select">
    <el-option
      v-for="client in options"
      :key="client.value"
      :label="client.name"
      :value="client.value">
    </el-option>
  </el-select>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  name: "test-plan-client",
  data() {
    return {
      selectedClient: '',
      options: []
    }
  },
  methods: {
  },
  created () {
    this.options = this.clients
  },
  computed: {
    clients:{
      get () {
        return this.$store.state.global.clients
      },
      set(value) {
        this.$store.dispatch("global/changeClients", value);
      }
    }
  }
};
</script>

<style scoped>

</style>
