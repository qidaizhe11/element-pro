<template>
  <page-header-layout
    title="单号：234231029431"
    :tab-list="tabList"
    :tab-active-key="headerTabKey"
    v-bind="$attrs"
    @tab-change="onTabChange"
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
    <a-card
      title="流程进度"
      :style="{marginBottom: '24px'}"
      :bordered="false"
    >
      <el-steps
        :active="1"
        align-center
      >
        <el-step title="创建项目">
          <div
            slot="description"
            :class="['text-secondary', 'step-description']"
          >
            <div>
              曲丽丽
              <ant-icon
                type="dingding-o"
                :style="{marginLeft: '8px'}"
              />
            </div>
            <div>2016-12-12 12:32</div>
          </div>
        </el-step>
        <el-step title="部门初审">
          <div
            slot="description"
            :class="['text-secondary', 'step-description']"
          >
            <div>
              周毛毛
              <ant-icon
                type="dingding-o"
                :style="{color: '#00A0E9', marginLeft: '8px'}"
              />
            </div>
            <div>
              <a href="">催一下</a>
            </div>
          </div>
        </el-step>
        <el-step title="财务复核"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </a-card>
    <a-card
      title="用户信息"
      :style="{marginBottom: '24px'}"
      :bordered="false"
    >
      <description-list
        :style="{marginBottom: '24px'}"
      >
        <Description term="用户姓名">付小小</Description>
        <Description term="会员卡号">32943898021309809423</Description>
        <Description term="身份证">3321944288191034921</Description>
        <Description term="联系方式">18112345678</Description>
        <Description term="联系地址">
          曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
        </Description>
      </description-list>
      <description-list
        :style="{marginBottom: '24px'}"
        :title="信息组"
      >
        <Description term="某某数据">725</Description>
        <Description term="该数据更新时间">2017-08-08</Description>
        <Description>&nbsp;</Description>
        <description>
          <span slot="term">
            某某数据
            <el-tooltip
              content="数据说明"
              placement="top"
            >
              <ant-icon
                type="info-circle-o"
                :style="{color: 'rgba(0, 0, 0, 0.43)', marginLeft: '4px'}"
              />
            </el-tooltip>
          </span>
          725
        </description>
        <Description term="该数据更新时间">2017-08-08</Description>
      </description-list>
      <h4 :style="{marginBottom: '16px'}">
        信息组
      </h4>
      <a-card
        title="多层级信息组"
      >
        <description-list
          size="small"
          :style="{marginBottom: '16px'}"
          title="组名称"
        >
          <Description term="负责人">林东东</Description>
          <Description term="角色码">1234567</Description>
          <Description term="所属部门">XX公司 - YY部</Description>
          <Description term="过期时间">2017-08-08</Description>
          <Description term="描述">
            这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...
          </Description>
        </description-list>
        <divider :style="{margin: '16px 0'}" />
        <description-list
          size="small"
          :style="{marginBottom: '16px'}"
          title="组名称"
          :col="1"
        >
          <Description term="学名">
            Citrullus lanatus (Thunb.) Matsum. et
            Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
          </Description>
        </description-list>
        <divider :style="{margin: '16px 0'}" />
        <description-list
          size="small"
          title="组名称"
        >
          <Description term="负责人">付小小</Description>
          <Description term="角色码">1234568</Description>
        </description-list>
      </a-card>
    </a-card>
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
  Col,
  Steps,
  Step,
  Tooltip
} from 'element-ui'
import { Card } from 'vue-antd-ui'

import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'

import DescriptionList from 'components/DescriptionList'
import Description from 'components/Description'
import AntIcon from 'components/AntIcon'
import Divider from 'components/Divider'

Vue.use(ButtonGroup)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Tooltip)
Vue.use(DescriptionList)
Vue.use(Description)
Vue.use(AntIcon)
Vue.use(Divider)

Vue.component(Card.name, Card)

const tabList = [
  {
    key: 'detail',
    tab: '详情'
  },
  {
    key: 'rule',
    tab: '规则'
  }
]

export default Vue.extend({
  components: {
    PageHeaderLayout
  },
  data() {
    return {
      tabList: tabList,
      headerTabKey: 'detail'
    }
  },
  methods: {
    onTabChange(key: string) {
      this.headerTabKey = key
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.heading {
  color: $heading-color;
  font-size: 20px;
}

.step-description {
  font-size: 14px;
  position: relative;
  & > div {
    margin-top: 8px;
    margin-bottom: 4px;
  }
}

.text-secondary {
  color: $text-color-secondary;
}
</style>
