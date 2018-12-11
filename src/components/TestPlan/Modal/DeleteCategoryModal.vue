<template>
  <q-modal v-model="deleteCategoryModal.isVisible" @escape-key="cancel()" no-backdrop-dismiss :content-css="{minWidth: '35vw', minHeight: '16vh'}" no-refocus>
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-toolbar-title>
          Delete Category
        </q-toolbar-title>
      </q-toolbar>
      <div class="q-pa-sm">
        <div class="row">
          <div class="col-auto">Do you want to delete category {{cat_name}}?</div>
        </div>
        <div class="row justify-end">
          <div class="col-7">
            <q-btn
              outline 
              color="primary"
              label="Cancel"
              class="float-right"
              @click="cancel()"
            />
            <q-btn
              outline 
              color="negative"
              label="Delete"
              class="float-right q-mr-sm"
              @click="deleteCategory()"
            />
          </div>
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import { mapGetters, mapActions, mapState  } from "vuex"
import * as utils from '../../../utils/index'

export default {
  name: "delete-category-modal",
  data() {
    return {
      opened: true,
      cat_id: '',
      cat_name: ''
    };
  },
  methods: {
    ...mapActions({
      changeTreeViewData: 'testplan/changeTreeViewData',
      changeSelectedNodeID: 'testplan/changeSelectedNodeID'
    }),
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    cancel () {
      this.$store.dispatch("testplan/hideDeleteCategoryModal")
    },
    deleteCategory () {
      const updatedTLTreeData = utils.deleteCategory(this.tlTreeViewData, this.cat_id)
      this.changeTreeViewData(updatedTLTreeData)
      this.cancel()
      this.$q.notify({message: `Delete category success`, position: "bottom-right", color: "positive"})
    }
  },
  created (){
    this.$root.$on("openDeleteCategoryModalEvent", (category) => { 
      this.cat_id = utils.toCodeName('category',category.name)
      this.cat_name = category.name
    })
  },
  computed: {
    ...mapGetters({ 
      deleteCategoryModal: 'testplan/deleteCategoryModal',
      tlTreeViewData: 'testplan/treeViewData'
    })
  }
}
</script>

<style scoped>
  .q-item-side {
    min-width: initial
  }
</style>
