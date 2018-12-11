<template>
	<q-layout class="row justify-center items-center">
			<div class="col-5">
				<q-field>
					<q-input type="email" v-model="email" float-label="Email" autofocus :error="$v.email.$error" @blur="$v.email.$touch"/>
					<q-input v-model="password" type="password" float-label="Password" no-pass-toggle	:error="$v.password.$error" @blur="$v.password.$touch" @keyup.enter.native="login"/>
					<q-btn icon="mdi-login-variant" color="primary" @click="login" class="q-mt-sm" :disable="$v.$invalid" size="lg" label="Login"></q-btn>
				</q-field>
			</div>
	</q-layout>
	
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators'
	import { mapGetters } from 'vuex'
	import { authen } from '../backend/services'
	
  export default {
    name: 'login',
		data: () => ({
      email: 'thaihoang.nguyen@acomsolutions.com',
      password: 'rivaldo'
    }),
    validations: {
      email: { required, email },
      password: {required}
    },
		updated () {
			this.checkCurrentLogin()
		},
		created () {
      this.checkCurrentLogin()
		},
    methods: {
      clear () {
        this.$refs.form.reset()
      },
			login() {
				authen(this.email, this.password).then((result)=> {
					if(result) this.loginSuccessful(result.token)
					else {
						this.loginFailed()
						this.$q.notify({message: "Login error", position: "bottom-right", color: "negative", icon:"mdi-alert-box"})
					}
				}).catch((err) => {
					this.$q.notify({message: err, position: "bottom-right", color: "negative", icon:"mdi-alert-box"})
        })
			},
			loginSuccessful (token) {
				if (!token) {
					this.loginFailed()
					return
				}
				localStorage.token = token
				this.$store.dispatch('auth/login')
				this.$router.replace(this.$route.query.redirect || '/home')
			},
			loginFailed () {
				this.$store.dispatch('logout')
				delete localStorage.token
			},
			checkCurrentLogin () {
				if (this.currentUser) this.$router.replace(this.$route.query.redirect || '/home')
			},
		},
		computed: {
			selectedTab: {
				get () {
					return this.$store.state.testplan.selectedTab
				},
				set (val) {
					this.$store.commit('testplan/changeTab', val)
				}
			}
		}
  }
</script>

<style scoped>

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
</style>
