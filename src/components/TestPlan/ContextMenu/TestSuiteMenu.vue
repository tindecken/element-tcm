<template>
  <q-context-menu>
    <q-list link>
      <q-item v-close-overlay>
        <q-item-side icon="mdi-plus">
        </q-item-side>
        <q-item-main label="New Test Group"/>
      </q-item>
      <q-item v-close-overlay>
        <q-item-side icon="mdi-plus">
        </q-item-side>
        <q-item-main label="New Test Case"/>
      </q-item>
      <q-item v-close-overlay>
        <q-item-side icon="mdi-square-edit-outline">
        </q-item-side>
        <q-item-main label="Edit"/>
      </q-item>
      <q-item v-close-overlay>
        <q-item-side icon="mdi-trash-can-outline">
        </q-item-side>
        <q-item-main label="Delete"/>
      </q-item>
      <q-item v-close-overlay>
        <q-item-side icon="mdi-information-variant">
        </q-item-side>
        <q-item-main label="Properties"/>
      </q-item>
    </q-list>
  </q-context-menu>
</template>

<script>
export default {
  name: "test-suite-menu",
  data() {
    return {};
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  } 
}
</script>

<style scoped>
  .q-item-side {
    min-width: initial
  }
</style>
