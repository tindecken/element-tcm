<template>
  <el-select v-model="selectedKeyword" filterable placeholder="Select" default-first-option	no-data-text="No Keyword">
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
export default {
  name: "test-plan-keyword",
  props: ['keyword'],
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
