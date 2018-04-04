<template>
  <page-header-layout
    title="基础详情页"
    v-bind="$attrs"
  >
    <el-card>
      11
    </el-card>
  </page-header-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Card } from 'element-ui'

import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'

Vue.use(Card)

export default Vue.extend({
  components: {
    PageHeaderLayout
  }
})
</script>

<style lang="scss" scoped>

</style>
