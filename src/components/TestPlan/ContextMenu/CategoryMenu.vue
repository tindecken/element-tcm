<template>
  <q-context-menu>
    <q-list link>
      <q-item v-close-overlay @click.native="openNewCategoryModal()">
        <q-item-side icon="mdi-folder-plus-outline">
        </q-item-side>
        <q-item-main label="New Category"/>
      </q-item>
      <q-item v-close-overlay  @click.native="openNewTestSuiteModal()">
        <q-item-side icon="mdi-plus">
        </q-item-side>
        <q-item-main label="New Test Suite"/>
      </q-item>
      <q-item v-close-overlay @click.native="openEditCategoryModal()">
        <q-item-side icon="mdi-square-edit-outline">
        </q-item-side>
        <q-item-main label="Edit"/>
      </q-item>
      <q-item v-close-overlay @click.native="openDeleteCategoryModal()">
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
import { mapGetters, mapActions, mapState  } from "vuex"
export default {
  props: ['category'],
  name: "category-menu",
  data() {
    return {
      cat: this.category
    };
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    openNewCategoryModal () {
      this.$root.$emit("openNewCategoryModalEvent");
      this.$store.dispatch("testplan/showNewCategoryModal");
    },
    openEditCategoryModal () {
      this.$root.$emit("openEditCategoryModalEvent", this.selectedNode)
      this.$store.dispatch("testplan/showEditCategoryModal");
    },
    openDeleteCategoryModal () {
      this.$root.$emit("openDeleteCategoryModalEvent", this.cat)
      this.$store.dispatch("testplan/showDeleteCategoryModal");
    },
    openNewTestSuiteModal () {
      this.$root.$emit("openNewTestSuiteModalEvent", this.cat)
      this.$store.dispatch("testplan/showNewTestSuiteModal");
    },
    ...mapActions({
      changeSelectedNode: 'testplan/changeSelectedNode'
    })
  },
  computed: {
    ...mapGetters({ 
      selectedNode: 'testplan/selectedNode' 
    }),
  }
}
</script>

<style scoped>
  .q-item-side {
    min-width: initial
  }
</style>
