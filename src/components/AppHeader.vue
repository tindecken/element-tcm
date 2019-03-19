<template>
	<div class="header">
		<div class="header_item">
			<font-awesome-icon :icon="['far', 'save']" class="fa-2x"/>
			<el-button type="primary" @click="saveTestSuite">Save</el-button>
			<el-button type="primary" @click="push">Push</el-button>
		</div>
		<div class="header_item_right">
			<span style="margin-right: 10px">Hi, {{ currentUser.name }}</span>
			<el-button type="primary" @click="logout">Logout</el-button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { push, saveTestSuite } from '../backend/services'
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
			saveTestSuite () {
				// saveTestSuite(this.treeViewData)
				this.debug = this.selectedTestSuite
			}
		},
		computed: {
			...mapGetters({ currentUser: 'auth/currentUser', treeViewData: 'testplan/treeViewData', selectedTestSuite: 'testplan/selectedTestSuite' }),
			debug: {
		  set (value) {
			this.$store.dispatch('global/changeDebug', value)
		  },
		  get () {
			return this.$store.state.global.debug
		  }
		},
		}
	}
</script>

<style scoped>
	.header {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}
	.header_item_right {
		align-self: auto;
	}
</style>
