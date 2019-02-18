<template>
  <el-tooltip :content="headerData.description" placement="top-start" effect="light" :open-delay="500">
    <span>{{headerData.name}}</span>
  </el-tooltip>
</template>
<script>
import VueJsonPretty from 'vue-json-pretty'
export default {
  props: ['headerData'],
  name: "test-plan-header",
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      data: {}
    };
  },
  methods: {
  }
};
</script>

<style scoped>

</style>
