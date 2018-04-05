<template>
  <page-header-layout
    title="基础详情页"
    v-bind="$attrs"
  >
    <el-card>
      <description-list
        size="large"
        title="退款申请"
        :style="{marginBottom: '32px'}"
      >
        <description term="取货单号">1000000000</description>
      </description-list>
    </el-card>
  </page-header-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Card } from 'element-ui'

import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'
import DescriptionList from 'components/DescriptionList'
import Description from 'components/Description'

Vue.use(Card)
Vue.use(DescriptionList)
Vue.use(Description)

export default Vue.extend({
  components: {
    PageHeaderLayout
  }
})
</script>

<style lang="scss" scoped>

</style>
