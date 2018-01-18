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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Row, Col, Tooltip } from 'element-ui'
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

Vue.use(Row)
Vue.use(Col)
Vue.use(Tooltip)

// mock data
const visitData: any[] = []
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
      visitData
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
</style>


