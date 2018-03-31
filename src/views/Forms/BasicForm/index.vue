<template>
  <page-header-layout
    title="基础表单"
    content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
    v-bind="$attrs"
  >

  </page-header-layout>
</template>

<script lang="ts">
import Vue from 'vue'

import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'

export default Vue.extend({
  components: {
    PageHeaderLayout
  }
})
</script>

<style lang="scss" scoped>

</style>
