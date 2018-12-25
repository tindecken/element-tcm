<template>
	<el-row>
		<el-col :span="16" style="text-align: left">
			<el-button type="primary" @click="save">Save</el-button>
			<el-button type="primary" @click="push">Push</el-button>
		</el-col>
		<el-col :span="4" :offset="4" style="text-align: right">
			<span>Hi, {{ currentUser.name }}</span>
			<el-button type="primary" @click="logout">Logout</el-button>
		</el-col>
	</el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { push, saveTree } from '../backend/services'

  export default {
    name: 'app-header',
		data (){
			return {
			}
		},
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
			},
			logout () {
				this.$router.push('/logout')
			},
			push () {
				push().then(() => {
					console.log('PUSH OK')
				})
			},
			save () {
				saveTree(this.treeViewData)
			}
		},
		computed: {
			...mapGetters({ currentUser: 'auth/currentUser', treeViewData: 'testplan/treeViewData' })
		}
  }
</script>

<style scoped>
</style>
