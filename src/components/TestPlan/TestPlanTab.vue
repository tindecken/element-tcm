<template>
  <div>
    <vue-json-pretty
      :data="testcase" 
      >
    </vue-json-pretty>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'

export default {
  components: {
    VueJsonPretty
  },
  name: "test-plan-tab",
  props: ['testcase'],
  data() {
    return {};
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  },
  created () {
  },   
};
</script>

<style scoped>
  
</style>
