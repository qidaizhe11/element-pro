<template>
  <page-header-layout
    title="单号：234231029431"
    v-bind="$attrs"
  >
    <div slot="content">
      <description-list
        class="header-list"
        size="small"
        :col="2"
      >
        <description term="创建人">曲丽丽</description>
        <Description term="订购产品">XX 服务</Description>
        <Description term="创建时间">2017-07-07</Description>
        <Description term="关联单据">
          <a href="">12421</a>
        </Description>
        <Description term="生效日期">2017-07-07 ~ 2017-08-08</Description>
        <Description term="备注">请于两个工作日内确认</Description>
      </description-list>
    </div>
    <div slot="action">

    </div>
  </page-header-layout>
</template>

<script lang="ts">
import Vue from 'vue'

import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'

import DescriptionList from 'components/DescriptionList'
import Description from 'components/Description'


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
