<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import * as Database from './backend/Database'
  import { mapGetters } from 'vuex'
  export default {
    name: 'App',
    updated () {
      this.checkCurrentLogin()
    },
    async created () {
      await Database.get().then(() => {
      })
      this.checkCurrentLogin()
    },
    methods: {
      checkCurrentLogin(){
        if(!this.currentUser && this.$router.path !== '/'){
          this.$router.push('/login')
        }else if(this.currentUser){
          this.$router.push('/home')
        }
      }
    },
    computed: {
      ...mapGetters({
        currentUser: 'auth/currentUser',
      })
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%
}
html,body { height: 100%; margin: 0px; padding: 0px; font-family: 'Roboto', sans-serif;}
</style>
