<template>
  <page-header-layout
    title="查询表格"
    v-bind="$attrs"
  >
    <div class="standard-list">
      <el-card>
        
      </el-card>
    </div>
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
