<template>
  <div>
    <el-row :gutter="24">
      <el-col v-bind="topColResponsiveProps">
        <chart-card title="销售总额" :total="yuan(126566)" content-height="46px">
          <el-tooltip slot="action" content="指标说明" placement="top">
            <ant-icon type="infocirlceo"></ant-icon>
          </el-tooltip>
          <trend flag="up" :style="{marginRight: 16 + 'px'}">
            周同比
            <span class="trend-text">12%</span>
          </trend>
          <trend flag="down">
            日环比
            <span class="trend-text">11%</span>
          </trend>
          <field slot="footer" label="日均销售额" :value="yuan(12423)"></field>
        </chart-card>
      </el-col>
      <el-col v-bind="topColResponsiveProps">
        <chart-card title="访问量" :total="numeral(8846).format('0,0')"
          content-height="46px">
          <el-tooltip slot="action" content="指标说明" placement="top">
            <ant-icon type="infocirlceo"></ant-icon>
          </el-tooltip>
          <mini-area color="#975FE4" :data="visitData" height="46px">
          </mini-area>
          <field slot="footer" label="日访问量" :value="numeral(1234).format('0,0')"></field>
        </chart-card>
      </el-col>
      <el-col v-bind="topColResponsiveProps">
        <chart-card title="支付笔数" :total="numeral(6560).format('0,0')"
          content-height="46px">
          <el-tooltip slot="action" content="指标说明" placement="top">
            <ant-icon type="infocirlceo"></ant-icon>
          </el-tooltip>
          <mini-bar :data="visitData" height="46px"></mini-bar>
          <field slot="footer" label="转化率" value="60%"></field>
        </chart-card>
      </el-col>
      <el-col v-bind="topColResponsiveProps">
        <chart-card title="运营活动效果" total="78%" content-height="46px">
          <el-tooltip slot="action" content="指标说明" placement="top">
            <ant-icon type="infocirlceo"></ant-icon>
          </el-tooltip>
          <mini-progress :percent="78" :stroke-width="8" :target="80" color="#13c2c2">
          </mini-progress>
          <div slot="footer" :style="{whiteSpace: 'nowrap', overflow: 'hidden'}">
            <trend flag="up" :style="{marginRight: 16 + 'px'}">
              周同比
              <span class="trend-text">12%</span>
            </trend>
            <trend flag="down">
              日环比
              <span class="trend-text">11%</span>
            </trend>
          </div>
        </chart-card>
      </el-col>
    </el-row>

    <el-card :body-style="{padding: 0}">
      <div class="sales-card">
        <el-tabs v-model="salesTabName">
          <el-tab-pane label="销售额" name="sales">
            <el-row>
              <el-col :lg="16" :md="12" :sm="12" :xs="24">
                <div class="sales-bar">

                </div>
              </el-col>
              <el-col :lg="8" :md="12" :sm="12" :xs="24">
                <div class="sales-rank">
                  <h4 class="ranking-title">门店销售额排名</h4>
                  <ul class="ranking-list">
                    <template v-for="(item, i ) in rankingListData">
                      <li :key="item.title">
                        <span :class="{active: i < 3}">{{i + 1}}</span>
                        <span>{{item.title}}</span>
                        <span>{{numeral(item.total).format('0,0')}}</span>
                      </li>
                    </template>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="访问量" name="views"></el-tab-pane>
        </el-tabs>
        <div class="sales-extra-wrap">
          <div class="sales-extra">
            <a class="current-date">今日</a>
            <a>本周</a>
            <a>本月</a>
            <a>全年</a>
          </div>
          <el-date-picker class="date-range" type="daterange" v-model="rangePickerValue"
            range-separator="~">
          </el-date-picker>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Row, Col, Tooltip, Card, Tabs, TabPane, DatePicker } from 'element-ui'
import * as numeral from 'numeral'
import * as moment from 'moment'

import AntIcon from 'components/AntIcon/index.vue'
import {
  yuan,
  ChartCard,
  Field,
  Trend,
  MiniArea,
  MiniBar,
  MiniProgress
} from 'components/Charts'

import { getTimeDistance } from 'utils/utils'

Vue.use(Row)
Vue.use(Col)
Vue.use(Tooltip)
Vue.use(Card)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(DatePicker)

// mock data

const rankingListData: object[] = []
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234
  })
}

const visitData: object[] = []
const beginDay = new Date().getTime()

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
      'YYYY-MM-DD'
    ),
    y: fakeY[i]
  })
}

const salesData: object[] = []
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
}

export default Vue.extend({
  components: {
    AntIcon,
    ChartCard,
    Field,
    Trend,
    MiniArea,
    MiniBar,
    MiniProgress
  },
  data() {
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 6,
      xl: 6,
      style: { marginBottom: '24px' }
    }
    return {
      topColResponsiveProps,
      rankingListData,
      visitData,
      salesData,
      salesTabName: 'sales',
      salesType: 'all',
      rangePickerValue: getTimeDistance('year')
    }
  },
  methods: {
    yuan(value: number) {
      return yuan(value)
    },
    numeral(value: any) {
      return numeral(value)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.trend-text {
  margin-left: 8px;
  color: $heading-color;
}

.sales-extra-wrap {
  position: absolute;
  right: 0;
  top: 0;
  height: 40px;
  line-height: 55px;
  margin-bottom: -1px;
  padding-right: 24px;

  .sales-extra {
    display: inline-block;
    margin-right: 24px;
    a {
      color: $text-color;
      margin-left: 24px;
      cursor: pointer;
      &:hover {
        color: $primary-color;
      }
      &.current-date {
        color: $primary-color;
      }
    }
  }

  .date-range {
    width: 256px;
  }
}

.sales-card {
  position: relative;

  /deep/ .el-tabs {
    &__nav-wrap {
      padding-left: 16px;
    }

    &__item {
      // padding: 16px 0;
      height: 54px;
      line-height: 60px;
      font-size: 16px;
    }
  }
}
</style>


