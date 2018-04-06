<template>
  <page-header-layout
    title="单号：234231029431"
    v-bind="$attrs"
  >
    <img
      slot="logo"
      alt=""
      src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
    />
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
      <el-button-group>
        <el-button>操作</el-button>
        <el-button>操作</el-button>
        <el-dropdown>
          <el-button>
            <ant-icon type="ellipsis" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">选项一</el-dropdown-item>
            <el-dropdown-item command="2">选项二</el-dropdown-item>
            <el-dropdown-item command="3">选项三</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-button-group>
      <el-button type="primary">主操作</el-button>
    </div>
    <el-row slot="extra-content">
      <el-col :sm="24" :md="12">
        <div class="text-secondary">状态</div>
        <div class="heading">待审批</div>
      </el-col>
      <el-col :sm="24" :md="12">
        <div class="text-secondary">订单金额</div>
        <div class="heading">¥ 568.08</div>
      </el-col>
    </el-row>
  </page-header-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  ButtonGroup,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col
} from 'element-ui'

import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'

import DescriptionList from 'components/DescriptionList'
import Description from 'components/Description'
import AntIcon from 'components/AntIcon'

Vue.use(ButtonGroup)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(DescriptionList)
Vue.use(Description)
Vue.use(AntIcon)

export default Vue.extend({
  components: {
    PageHeaderLayout
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.heading {
  color: $heading-color;
  font-size: 20px;
}

.text-secondary {
  color: $text-color-secondary;
}
</style>
