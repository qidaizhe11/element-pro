<template>
  <page-header-layout
    title="分步表单"
    content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
    v-bind="$attrs"
  >
    <el-card>
      <el-steps
        class="steps"
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
import {
  Card,
  Steps,
  Step
} from 'element-ui'

import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'

Vue.use(Card)
Vue.use(Steps)
Vue.use(Step)

export default Vue.extend({
  components: {
    PageHeaderLayout
  }
})
</script>

<style lang="scss" scoped>

</style>
