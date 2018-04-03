<template>
  <page-header-layout
    title="分步表单"
    content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
    v-bind="$attrs"
  >
    <el-card>
      <el-steps
        class="steps"
        :active="currentStep"
      >
        <el-step title="填写转账信息"></el-step>
        <el-step title="确认转账信息"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <router-view />
    </el-card>
  </page-header-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Card, Steps, Step } from 'element-ui'

import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'

Vue.use(Card)
Vue.use(Steps)
Vue.use(Step)

export default Vue.extend({
  components: {
    PageHeaderLayout
  },
  computed: {
    currentStep() {
      const path = this.$route.path
      const pathList = path.split('/')
      switch (pathList[pathList.length - 1]) {
        case 'info':
          return 0
        case 'confirm':
          return 1
        case 'result':
          return 2
        default:
          return 0
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.steps {
  max-width: 750px;
  margin: 16px auto;
}
</style>
