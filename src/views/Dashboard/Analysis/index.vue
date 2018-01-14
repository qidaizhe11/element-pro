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
          <mini-area color="#975FE4"></mini-area>
          <field slot="footer" label="日访问量" :value="numeral(1234).format('0,0')"></field>
        </chart-card>
      </el-col>
      <el-col v-bind="topColResponsiveProps">
        <chart-card title="支付笔数" :total="numeral(6560).format('0,0')"
          content-height="46px">
          <el-tooltip slot="action" content="指标说明" placement="top">
            <ant-icon type="infocirlceo"></ant-icon>
          </el-tooltip>
          <field slot="footer" label="转化率" value="60%"></field>
        </chart-card>
      </el-col>
      <el-col v-bind="topColResponsiveProps">
        <chart-card title="运营活动效果" total="78%" content-height="46px">
          <el-tooltip slot="action" content="指标说明" placement="top">
            <ant-icon type="infocirlceo"></ant-icon>
          </el-tooltip>
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

import AntIcon from 'components/AntIcon/index.vue'
import { yuan, ChartCard, Field, Trend, MiniArea } from 'components/Charts'

Vue.use(Row)
Vue.use(Col)
Vue.use(Tooltip)

export default Vue.extend({
  components: {
    AntIcon,
    ChartCard,
    Field,
    Trend,
    MiniArea
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
      topColResponsiveProps
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


