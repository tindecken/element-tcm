<template>
</template>
<script>
  export default {
    name: 'logout',
		created () {
			delete localStorage.token
			this.$store.dispatch('auth/logout')
			this.$router.push('/')
		}
  }
</script>

<style scoped>

</style>