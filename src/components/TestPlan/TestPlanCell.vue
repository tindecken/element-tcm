<template>
  <div>
    <div style="font-size: 12px">{{data.name}}</div>
    <el-input size="mini" v-model="data.value"></el-input>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
export default {
  props: ['cellData'],
  name: "test-plan-cell",
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      data: {}
    };
  },
  methods: {
  },
  created () {
    this.data = this.cellData
  },
};
</script>

<style scoped>

</style>
