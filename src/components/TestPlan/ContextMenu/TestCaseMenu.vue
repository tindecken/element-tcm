<template>
  <q-context-menu>
    <q-list link>
      <q-item v-close-overlay v-if="!tc.enabled">
        <q-item-side icon="mdi-label-outline">
        </q-item-side>
        <q-item-main label="Enable"/>
      </q-item>
      <q-item v-close-overlay v-else>
        <q-item-side icon="mdi-label-off-outline">
        </q-item-side>
        <q-item-main label="Disable"/>
      </q-item>
      <q-item-separator />
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
      <q-item-separator />
      <q-item v-close-overlay @click="tc.primary = !tc.primary">
        <q-item-side>
          <q-checkbox keep-color color="black" v-model="tc.primary" @input="onChange(tc.primary)" label="Primary" class="text-black"/>
        </q-item-side>
        <q-item-main/>
      </q-item>
      <q-item v-close-overlay @click="tc.primary = !tc.primary">
        <q-item-side icon="mdi-format-horizontal-align-right" />
        <q-item-main label="Set depend"/>
      </q-item>
      <q-item-separator />
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
  props: ['testcase'],
  name: "test-case-menu",
  data() {
    return {
      tc: this.testcase
    };
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    onChange(value){
      console.log('Event', value)
    }
  } 
}
</script>

<style scoped>
  .q-item-side {
    min-width: initial
  }
</style>
