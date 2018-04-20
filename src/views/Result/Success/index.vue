<template>
  <page-header-layout
    v-bind="$attrs"
  >
    <el-card>
      <result
        type="success"
        title="提交成功"
        description="提交结果页用于反馈一系列操作任务的处理结果，
        如果仅是简单操作，使用 Message 全局提示反馈即可。
        本文字区域可以展示简单的补充说明，如果有类似展示
        “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"
        :style="{marginTop: '48px', marginBottom: '16px'}"
      >
      </result>
    </el-card>
  </page-header-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Card } from 'element-ui'

import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'
import Result from 'components/Result'

Vue.use(Card)
Vue.use(Result)

export default Vue.extend({
  components: {
    PageHeaderLayout
  }
})
</script>

<style lang="scss" scoped>

</style>
