<template>
  <q-modal v-model="editCategoryModal.isVisible" @escape-key="cancel()" no-backdrop-dismiss :content-css="{minWidth: '35vw', minHeight: '30vh'}" no-refocus>
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-toolbar-title>
          Edit Category
        </q-toolbar-title>
      </q-toolbar>
      <div class="q-pa-sm">
        <div class="row gutter-xs">
          <div class="col-4"><q-input v-model="cat_name" float-label="Name *"/></div>
          <div class="col-5"><q-input v-model="cat_workitems" float-label="Work Items" placeholder="comma separator, ex: 1001, 1102" /></div>
          <div class="col-3"><q-input :value="currentUser.name" float-label="Author" readonly/></div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-input
            v-model="cat_description"
            type="textarea"
            float-label="Description"
            :max-height="100"
            rows="2"
            class="q-mb-sm"
          />
          </div>
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
              color="primary"
              label="Save"
              class="float-right q-mr-sm"
              @click="editCategory()"
              :disable="$v.$invalid"
            />
          </div>
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions, mapState  } from "vuex"
import * as utils from '../../../utils/index'

export default {
  name: "edit-category-modal",
  data() {
    return {
      opened: true,
      old_cat_name: '',
      cat_name: '',
      cat_workitems: '',
      cat_description: '',
      cat_id: '',
    };
  },
  validations: {
    cat_name: { required }
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
      this.$store.dispatch("testplan/hideEditCategoryModal")
    },
    editCategory () {
      let newCategory = {
        name: this.cat_name, 
        description: this.cat_description, 
        user: this.currentUser.email,
        work_items: this.cat_workitems
      }
      let checkDuplicate = true
      if(this.old_cat_name === this.cat_name){ //no need check duplicate id
        checkDuplicate = false
      }
      if(checkDuplicate){
        const isDuplicated = utils.findBy_id(this.tlTreeViewData, utils.toCodeName('category', this.cat_name))
        if(typeof isDuplicated === "undefined"){
          const updatedTLTreeData = utils.editCategory(this.tlTreeViewData, this.cat_id, newCategory)
          this.changeTreeViewData(updatedTLTreeData)
          this.cancel()
          this.changeSelectedNodeID(utils.toCodeName('category', this.cat_name))
          this.$q.notify({message: `Update category success`, position: "bottom-right", color: "positive"})
        }else {
          this.$q.notify({message: `Update Failed: Duplicated category id ${utils.toCodeName('category', this.cat_name)}`, position: "bottom-right", color: "warning"})
        }
      }else{
        const updatedTLTreeData = utils.editCategory(this.tlTreeViewData, this.cat_id, newCategory)
        this.changeTreeViewData(updatedTLTreeData)
        this.cancel()
        this.changeSelectedNodeID(utils.toCodeName('category', this.cat_name))
        this.$q.notify({message: `Update category success`, position: "bottom-right", color: "positive"})
      }
    }
  },
  created (){
    this.$root.$on("openEditCategoryModalEvent", (selectedNode) => { 
      this.old_cat_name = selectedNode.name
      this.cat_name = selectedNode.name
      this.cat_workitems = selectedNode.work_items
      this.cat_description = selectedNode.description
      this.cat_id = selectedNode._id
    })
  },
  computed: {
    ...mapGetters({ 
      editCategoryModal: 'testplan/editCategoryModal',
      currentUser: 'auth/currentUser',
      tlTreeViewData: 'testplan/treeViewData',
    })
  }
}
</script>

<style scoped>
  .q-item-side {
    min-width: initial
  }
</style>
