<template>
  <div>
    <el-input size="small" v-model="data.value"></el-input>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
export default {
  props: ['cellData'],
  name: "test-plan-param",
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
