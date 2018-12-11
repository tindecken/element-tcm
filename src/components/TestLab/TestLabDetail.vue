<template>
  <div>
    Test Lab Detail
  </div>
</template>

<script>
export default {
  name: "test-lab-detail",
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
