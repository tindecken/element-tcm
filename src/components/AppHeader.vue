<template>
  <q-toolbar
    color="primary"
  >
    <q-toolbar-title>
      <!-- Quasar App
      <div slot="subtitle">Running on Quasar v{{ $q.version }}</div> -->
    </q-toolbar-title>
    <span>Hi, {{ currentUser.name }}</span>
    <q-btn
      flat
      dense
      round
      @click="openLeftDrawer"
      aria-label="Menu"
    >
      <q-icon name="mdi-settings" />
    </q-btn>
  </q-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "app-header",
  data() {
    return {};
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    openLeftDrawer() {
      this.$root.$emit("openLeftDrawer");
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'auth/currentUser' })
  }  
};
</script>

<style scoped>
  
</style>
