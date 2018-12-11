<template>
  <q-modal v-model="newTestSuiteModal.isVisible" @escape-key="cancel()" no-backdrop-dismiss :content-css="{minWidth: '35vw', minHeight: '30vh'}" no-refocus>
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-toolbar-title>
          Create New Test Suite for Category: {{selectedCategory.name}}
        </q-toolbar-title>
      </q-toolbar>
      <div class="q-pa-sm">
        <div class="row gutter-xs">
          <div class="col-4"><q-input v-model="suite_name" float-label="Name *" ref="inputName" autofocus/></div>
          <div class="col-5"><q-input v-model="suite_workitems" float-label="Work Items" placeholder="comma separator, ex: 1001, 1102" /></div>
          <div class="col-3"><q-input :value="currentUser.name" float-label="Author" readonly/></div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-input
            v-model="suite_description"
            type="textarea"
            float-label="Description"
            :max-height="100"
            rows="2"
            class="q-mb-sm"
          />
          </div>
        </div>
        <div class="row justify-end">
          <div class="col-5 self-center">
            <q-checkbox v-model="addFirst" color="primary" label="Add First" />
          </div>
          <div class="col-7 self-center">
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
              label="Create"
              class="float-right q-mr-sm"
              @click="create(close=false)"
              :disable="$v.$invalid"
            />
            <q-btn
              outline
              color="primary"
              label="Create & Close"
              class="float-right q-mr-sm"
              @click="create(close=true)"
              :disable="$v.$invalid"
            />
          </div>
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import * as utils from '../../../utils/index'
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions, mapState  } from "vuex"
export default {
  name: "new-test-suite-modal",
  data() {
    return {
      opened: true,
      selectedCategory: {},
      suite_name: '',
      suite_workitems: '',
      suite_description: '',
      bLastPos: true,
      addFirst: false
    };
  },
  validations: {
    suite_name: { required }
  },
  methods: {
    ...mapActions({
      changeSelectedNodeID: 'testplan/changeSelectedNodeID',
      createTestSuite: 'testplan/createTestSuite',
    }),
    clearForm() {
      this.suite_name = ''
      this.suite_workitems = ''
      this.suite_description = ''
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    cancel () {
      this.$store.dispatch("testplan/hideNewTestSuiteModal")
    },
    create (close) {
      let testsuite = {
        name: this.suite_name,
          description: this.suite_description,
          user: this.currentUser.email,
          type: 'testsuite',
          _id: utils.toCodeName('testsuite',this.suite_name),
          testgroups: [],
          testcases: [],
          category: this.selectedCategory._id,
          status: '',
          work_items: this.arr_work_items
      }
      const isDuplicated = utils.findBy_id(this.tlTreeViewData, utils.toCodeName('testsuite', this.suite_name))
      if(typeof isDuplicated === "undefined"){
        this.createTestSuite({
          cat_id: this.selectedCategory._id,
          testsuite: testsuite,
          addFirst: this.addFirst
        })
        this.changeSelectedNodeID(utils.toCodeName('testsuite', this.suite_name))
        this.$q.notify({message: `Create Test Suite success`, position: "bottom-right", color: "positive"})
      }else{
        this.$q.notify({message: `Create Failed: Duplicated Test Suite id ${utils.toCodeName('testsuite', this.suite_name)}`, position: "bottom-right", color: "warning"})
      }
      if(close) {
        this.cancel()
        this.changeSelectedNodeID(utils.toCodeName('testsuite', this.suite_name))
      }else{
        this.clearForm()
        this.$refs.inputName.focus()
      }
    }
  },
  created (){
    this.$root.$on("openNewTestSuiteModalEvent", (category) => {
      this.clearForm()
      this.selectedCategory = category
      console.log('this.selectedCategory', this.selectedCategory)
    })
  },
  computed: {
    ...mapGetters({
      newTestSuiteModal: 'testplan/newTestSuiteModal',
      currentUser: 'auth/currentUser',
      tlTreeViewData: 'testplan/treeViewData'
    }),
    arr_work_items () {
      return this.suite_workitems.split(",")
    }
  }
}
</script>

<style scoped>
  .q-item-side {
    min-width: initial
  }
</style>
