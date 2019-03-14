<template>
  <el-select v-model="selectedKeyword" filterable placeholder="Select" default-first-option	no-data-text="No Keyword" @change="changeKeyword">
    <el-option
      v-for="keyword in options"
      :key="keyword._id"
      :label="keyword.name"
      :value="keyword._id">
    </el-option>
  </el-select>
</template>
<script>
import VueJsonPretty from 'vue-json-pretty'
import { mapGetters } from "vuex"
import { getParams } from "../../../backend/testplan"
import { EventHandler } from "../../../utils/event_handler"
export default {
  name: "test-plan-keyword",
  props: ['keyword', 'params'],
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      options: [],
      selectedKeyword: ''
    }
  },
  methods: {
    changeKeyword (selectedKW) {
      getParams(selectedKW).then((params) => {
        this.$emit("update:keyword", selectedKW)
        this.$emit("update:params", params)
        EventHandler.emit('resetParamClass', {})
      })
      
    }
  },
  created () {
    this.options = this.keywords
    this.selectedKeyword = this.keyword
  },
  computed: {
    keywords:{
      get () {
        return this.$store.state.global.keywords
      },
      set(value) {
        this.$store.dispatch("global/changeKeywords", value);
      }
    },
  }
};
</script>

<style scoped>

</style>
