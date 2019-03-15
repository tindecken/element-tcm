<template>
  <div>
    <el-select v-model="selectedClient" placeholder="Select" no-data-text="No Client"  @change="changeClient"  class="selectClient">
      <el-option
        v-for="client in options"
        :key="client._id"
        :label="client.name"
        :value="client._id">
      </el-option>
    </el-select>
  </div>
</template>
<script>
import VueJsonPretty from 'vue-json-pretty'
import { mapGetters } from "vuex"
export default {
  name: "test-plan-client",
  props: ['client'],
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      options: [],
      selectedClient: ''
    }
  },
  methods: {
    changeClient (selectedClient) {
      this.$emit("update:client", selectedClient)
    }
  },
  created () {
    this.options = this.clients
    this.selectedClient = this.client
  },
  computed: {
    clients:{
      get () {
        return this.$store.state.global.clients
      },
      set(value) {
        this.$store.dispatch("global/changeClients", value);
      }
    },
  }
};
</script>

<style scoped>
.selectClient {
  display: inherit;
}
</style>
