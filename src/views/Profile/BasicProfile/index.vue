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
        <description term="状态">已取货</description>
        <description term="销售单号">1234123421</description>
        <description term="子订单">3214321432</description>
      </description-list>
      <description-list
        size="large"
        title="用户信息"
        :style="{marginBottom: '32px'}"
      >
        <description term="用户姓名">付小小</description>
        <description term="联系电话">18100000000</description>
        <description term="常用快递">菜鸟仓储</description>
        <description term="取货地址">浙江省杭州市西湖区万塘路18号</description>
        <description term="备注">无</description>
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
