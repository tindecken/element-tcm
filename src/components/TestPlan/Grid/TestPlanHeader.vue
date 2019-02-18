<template>
  <span v-if="headerData">
    <el-tooltip :content="headerData.description" placement="top-start" effect="light" :open-delay="500">
      <span>{{headerData.name}}</span>
    </el-tooltip>
  </span>
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
    };
  },
  methods: {
  }
};
</script>

<style scoped>

</style>
