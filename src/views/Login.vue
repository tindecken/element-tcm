<template>
	<el-container>
		<el-main>
			<el-row type="flex" justify="center" style="height: 50px">
			</el-row>
			<el-row type="flex" justify="center">
				<el-col :span="10" class="center">
					<el-form ref="form" :model="form" label-width="120px" @submit.prevent="login">
						<el-form-item label="Email">
							<el-input v-model="form.email"></el-input>
						</el-form-item>
						<el-form-item label="Password">
							<el-input
								type="password"
								v-model="form.password"
								@keyup.enter.native="login"
							></el-input>
						</el-form-item>
						<el-form-item v-if="form.error">
							<el-alert
								:closable="closable"
								:title="form.error"
								type="error">
							</el-alert>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="login" :disabled="$v.$invalid">Login</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
	import { required, email } from 'vuelidate/lib/validators'
	import { mapGetters } from 'vuex'
	import { authen } from '../backend/services'

  export default {
    name: 'login',
		data (){
			return {
				form: {
          email: 'thaihoang.nguyen@acomsolutions.com',
					password: 'rivaldo',
					error: false
        },
				closable: false
			}
		},
		validations: {
			form: {
				email: {
					required,
					email
				},
				password: {
					required
				}
			}
		},
		updated () {
			this.checkCurrentLogin()
		},
		created () {
			this.checkCurrentLogin()
		},
    methods: {
      open (link) {
				this.form.error = false
        this.$electron.shell.openExternal(link)
      },
			login() {
				authen(this.form.email, this.form.password).then((result)=> {
					if(result) this.loginSuccessful(result.token)
					else this.loginFailed()
				})
			},
			loginSuccessful (token) {
				if (!token) {
					this.loginFailed()
					return
				}

				localStorage.token = token
				this.form.error = false
				this.$store.dispatch('auth/login')
				this.$router.replace(this.$route.query.redirect || '/home')
			},
			loginFailed () {
				this.form.error = 'Login failed!'
				this.$store.dispatch('logout')
				delete localStorage.token
			},
			checkCurrentLogin () {
				if (this.currentUser) this.$router.replace(this.$route.query.redirect || '/home')
			},
		},
		computed: {
			...mapGetters({ currentUser: 'auth/currentUser'})
		}
  }
</script>

<style scoped>
.el-container {
	height: 100%;
	padding: 0px
}

.el-main {
  background: #fff;
  width: 70%;
  margin: 12% auto;
  animation: fadein 0.8s;
	padding: 0px
}
@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
</style>
