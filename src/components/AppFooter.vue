<template>
	<el-container>
		FOOTER
	</el-container>
</template>

<script>
  export default {
    name: 'app-footer',
		data (){
			return {
			}
		},
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>
</style>
