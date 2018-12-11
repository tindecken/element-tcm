<template>
  <div>TestLabTree</div>
</template>

<script>

export default {
  name: "test-lab-tree",
  data() {
    return {};
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  },
};
</script>

<style scoped>
  
</style>
