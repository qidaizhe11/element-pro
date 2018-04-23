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
            <ant-icon type="info-circle-o"></ant-icon>
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
            <ant-icon type="info-circle-o"></ant-icon>
          </el-tooltip>
          <mini-bar :data="visitData" height="46px"></mini-bar>
          <field slot="footer" label="转化率" value="60%"></field>
        </chart-card>
      </el-col>
      <el-col v-bind="topColResponsiveProps">
        <chart-card title="运营活动效果" total="78%" content-height="46px">
          <el-tooltip slot="action" content="指标说明" placement="top">
            <ant-icon type="info-circle-o"></ant-icon>
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
                <div class="sales-bar" v-if="salesTabName === 'sales'">
                  <bar height="292px" title="销售额趋势" :data="salesData"></bar>
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
          <el-tab-pane label="访问量" name="views">
            <el-row>
              <el-col :lg="16" :md="12" :sm="12" :xs="24">
                <div class="sales-bar" v-if="salesTabName === 'views'">
                  <bar height="292px" title="访问量趋势" :data="salesData"></bar>
                </div>
              </el-col>
              <el-col :lg="8" :md="12" :sm="12" :xs="24">
                <div class="sales-rank">
                  <h4 class="ranking-title">门店访问量排名</h4>
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

    <el-row :gutter="24">
      <el-col :lg="12" :md="24" :sm="24" :xs="24">
        <el-card :style="{marginTop: '24px'}">
          <div slot="header">
            <span :style="{fontSize: '16px'}">线上热门搜索</span>
          </div>
          <el-row :gutter="68">
            <el-col :sm="12" :xs="24" :style="{marginBottom: '24px'}">
              <number-info :gap="8" :total="numeral(12321).format('0,0')" status="up"
                :sub-total="17.1">
                <span slot="subTitle">
                  搜索用户数
                  <el-tooltip content="指标文案" placement="top">
                    <ant-icon :style="{marginLeft: '8px'}" type="info-circle-o">
                    </ant-icon>
                  </el-tooltip>
                </span>
              </number-info>
              <mini-area line height="45px" :data="visitData2"></mini-area>
            </el-col>
            <el-col :sm="12" :xs="24" :style="{marginBottom: '24px'}">
              <number-info :gap="8" :total="2.7" status="down" sub-title="人均搜索次数"
                :sub-total="17.1">
              </number-info>
              <mini-area line height="45px" :data="visitData2"></mini-area>
            </el-col>
          </el-row>
          <el-table-wrapper size="small" :data="searchData" :columns="columns"
            :pagination="pagination">
            <template slot-scope="scope" slot="keyword-slot">
              <a href="/">{{scope.row.keyword}}</a>
            </template>
            <template slot-scope="scope" slot="range-slot">
              <trend :flag="scope.row.status === 1 ? 'down' : 'up'">
                <span :style="{marginRight: '4px'}">{{scope.row.range}}%</span>
              </trend>
            </template>
          </el-table-wrapper>
        </el-card>
      </el-col>
      <el-col :lg="12" :md="24" :sm="24" :xs="24">
        <el-card class="sales-card" :style="{marginTop: '24px', minHeight: '538px'}"
          :body-style="{padding: '24px'}">
          <div slot="header" class="sales-type-header">
            <div class="top">
              <span class="title">销售额类别占比</span>
              <span class="icon-group">
                <el-dropdown placement="bottom-end">
                  <ant-icon type="ellipsis"></ant-icon>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>操作一</el-dropdown-item>
                    <el-dropdown-item>操作二</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </div>
            <div class="sales-type-radio">
              <el-radio-group v-model="salesType">
                <el-radio-button label="all">全部渠道</el-radio-button>
                <el-radio-button label="online">线上</el-radio-button>
                <el-radio-button label="offline">门店</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <h4 :style="{marginTop: '8px', marginBottom: '32px'}">销售额</h4>
          <pie has-legend sub-title="销售额" :data="salesPieData" height="248px"
            :line-width="4" :total="yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))"
            :value-format="val => yuan(val)">
          </pie>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="offline-card" :body-style="{padding: '0 0 32px 0'}"
      :style="{marginTop: '32px'}">
      <el-tabs v-model="currentTabKey">
        <!-- <el-tab-pane ></el-tab-pane> -->
        <template v-for="shop in offlineData">
          <el-tab-pane :key="shop.name" :name="shop.name">
            <el-row slot="label" :style="{width: '138px', margin: '8px 0'}">
              <el-col :span="12">
                <number-info :title="shop.name" sub-title="转化率" :gap="2" :total="`${shop.cvr * 100}%`">
                </number-info>
              </el-col>
              <el-col :span="12" :style="{paddingTop: '36px'}">
                <pie :color="currentTabKey !== shop.name ? '#bde4ff' : null"
                  inner="55%" :percent="shop.cvr * 100" height="64px"></pie>
              </el-col>
            </el-row>
            <div v-if="currentTabKey === shop.name" :style="{padding: '0 24px'}">
              <timeline-chart height="400px" :data="offlineChartData" :title-map="{y1: '客流量', y2: '支付笔数'}">
              </timeline-chart>
            </div>
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  Row,
  Col,
  Tooltip,
  Card,
  Tabs,
  TabPane,
  DatePicker,
  Table,
  TableColumn,
  Pagination,
  RadioGroup,
  RadioButton,
  Dropdown,
  DropdownItem,
  DropdownMenu
} from 'element-ui'
import * as numeral from 'numeral'
import * as moment from 'moment'
import ElTableWrapper from 'el-table-wrapper'

import AntIcon from 'components/AntIcon'
import {
  yuan,
  ChartCard,
  Field,
  Trend,
  MiniArea,
  MiniBar,
  MiniProgress,
  Bar,
  Pie,
  TimelineChart
} from 'components/Charts'
import NumberInfo from 'components/NumberInfo'

import { getTimeDistance } from 'utils/utils'

Vue.use(Row)
Vue.use(Col)
Vue.use(Tooltip)
Vue.use(Card)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(DatePicker)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(ElTableWrapper)
Vue.use(AntIcon)
Vue.use(NumberInfo)
Vue.use(ChartCard)
Vue.use(Field)
Vue.use(Trend)
Vue.use(MiniArea)
Vue.use(MiniBar)
Vue.use(MiniProgress)
Vue.use(Bar)
Vue.use(Pie)
Vue.use(TimelineChart)

const rankingListData: any[] = []
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234
  })
}

export default Vue.extend({
  data() {
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 6,
      xl: 6,
      style: { marginBottom: '24px' }
    }
    const columns = [
      {
        prop: 'index',
        label: '排名'
      },
      {
        prop: 'keyword',
        label: '搜索关键词',
        scopedSlot: 'keyword-slot'
      },
      {
        prop: 'count',
        label: '用户数',
        sortable: true
      },
      {
        prop: 'range',
        label: '周涨幅',
        sortable: true,
        align: 'right',
        scopedSlot: 'range-slot'
      }
    ]
    const pagination = {
      pageSize: 5,
      small: true
    }
    return {
      topColResponsiveProps,
      salesTabName: 'sales',
      salesType: 'all',
      rangePickerValue: getTimeDistance('year'),
      columns,
      pagination,
      rankingListData,
      currentTabKey: ''
    }
  },
  computed: {
    chart(): any {
      return this.$store.state.chart.chartData
    },
    loading(): any {
      return this.$store.state.chart.loading
    },
    visitData() {
      const chart: any = this.chart
      return chart.visitData
    },
    visitData2() {
      const chart: any = this.chart
      return chart.visitData2
    },
    salesData() {
      const chart: any = this.chart
      return chart.salesData
    },
    searchData() {
      const chart: any = this.chart
      return chart.searchData
    },
    offlineData() {
      const chart: any = this.chart
      return chart.offlineData
    },
    offlineChartData() {
      const chart: any = this.chart
      return chart.offlineChartData
    },
    salesTypeData() {
      const chart: any = this.chart
      return chart.salesTypeData
    },
    salesTypeDataOnline() {
      const chart: any = this.chart
      return chart.salesTypeDataOnline
    },
    salesTypeDataOffline() {
      const chart: any = this.chart
      return chart.salesTypeDataOffline
    },
    salesPieData() {
      const { salesType } = this
      const { salesTypeData, salesTypeDataOnline, salesTypeDataOffline } = this
      switch (salesType) {
        case 'all':
          return salesTypeData
        case 'online':
          return salesTypeDataOnline
        default:
          return salesTypeDataOffline
      }
    }
    // activeKey(): any {
    //   const { currentTabKey, offlineData } = this
    //   return currentTabKey || (offlineData[0] && offlineData[0].name)
    // }
  },
  watch: {
    offlineData: function(val) {
      if (val && val[0]) {
        this.currentTabKey = val[0].name
      }
    }
  },
  mounted() {
    this.$store.dispatch('chart/fetch')
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
@import '~utils/utils.scss';

.trend-text {
  margin-left: 8px;
  color: $heading-color;
}

.ranking-list {
  margin: 25px 0 0;
  padding: 0;
  list-style: none;
  li {
    @extend %clearfix;
    margin-top: 16px;
    span {
      color: $text-color;
      font-size: 14px;
      line-height: 22px;
    }
    span:first-child {
      background-color: $background-color-base;
      border-radius: 20px;
      display: inline-block;
      font-size: 12px;
      font-weight: 600;
      margin-right: 24px;
      height: 20px;
      line-height: 20px;
      width: 20px;
      text-align: center;
    }
    span.active {
      //background-color: @primary-color;
      background-color: #314659;
      color: #fff;
    }
    span:last-child {
      float: right;
    }
  }
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
    width: 288px;
  }
}

.sales-card {
  position: relative;
  color: rgba(0, 0, 0, 0.65);

  .sales-bar {
    padding: 0 0 32px 32px;
  }

  .sales-rank {
    padding: 0 32px 32px 72px;
  }

  /deep/ .el-tabs {
    &__nav-wrap {
      padding-left: 16px;
      &::after {
        height: 1px;
      }
    }

    &__item {
      height: 54px;
      line-height: 60px;
      font-size: 16px;
    }
  }
}

.sales-type-header {
  .top {
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 16px;
    }

    .icon-group {
      i {
        cursor: pointer;
      }
    }
  }
}

.sales-type-radio {
  margin-top: 15px;

  /deep/ label {
    margin-bottom: 0;
  }
}

.offline-card {
  /deep/ .el-tabs {
    &__active-bar {
      top: 0;
      bottom: auto;
    }
    &__item {
      height: 100%;
      line-height: inherit;
    }
    &__nav-wrap::after {
      display: none;
    }
    &__nav-wrap.is-scrollable {
      padding-left: 40px;
      padding-right: 40px;
    }
    &__nav-prev,
    &__nav-next {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
    }
    &__nav-prev {
      left: 14px;
    }
    &__nav-next {
      right: 14px;
    }
  }
}

@media screen and (max-width: $screen-lg) {
  .sales-extra-wrap {
    .sales-extra {
      display: none;
    }
  }

  .ranking-list {
    li {
      span:first-child {
        margin-right: 8px;
      }
    }
  }
}

@media screen and (max-width: $screen-md) {
  .ranking-title {
    margin-top: 16px;
  }

  .sales-card .sales-bar {
    padding: 16px;
  }
}

@media screen and (max-width: $screen-sm) {
  .sales-extra-wrap {
    display: none;
  }

  .sales-card {
    /deep/ .el-tabs__content {
      padding-top: 30px;
    }
  }
}
</style>
