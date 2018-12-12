<template>
    <Split :gutterSize="4">
        <SplitArea :size="99">
          <test-plan-grid style="height: 100%"></test-plan-grid>
        </SplitArea>
        <SplitArea :size="0">
          <test-plan-keyword></test-plan-keyword>
        </SplitArea>
      </Split>
</template>

<script>
import TestPlanKeyword from '@/components/Testplan/TestPlanKeyword'
import TestPlanGrid from '@/components/Testplan/TestPlanGrid'
import { mapGetters } from 'vuex'
  export default {
    name: 'test-plan',
    components: { TestPlanKeyword, TestPlanGrid },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
