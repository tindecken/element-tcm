<template>
  <span v-if="headerData">
    <el-tooltip :content="headerData.description" placement="top-start" effect="light" :open-delay="500">
      <span>{{headerData.name}}</span>
    </el-tooltip>
  </span>
</template>
<script>
import VueJsonPretty from 'vue-json-pretty'
import { mapGetters } from "vuex";
export default {
  name: "test-plan-client",
  components: {
    VueJsonPretty,
  },
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
    ...mapGetters([
      { clients: 'global/clients'},
    ]),
  }
};
</script>

<style scoped>

</style>
