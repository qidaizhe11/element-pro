<template>
  <div>
    <el-row :gutter="24">
      <el-col :lg="18" :md="24" :sm="24" :xs="24">
        <el-card>
          <div slot="header">
            活动实时交易情况
          </div>
          <el-row>
            <el-col :sm="6" :xs="24">
              <number-info
                sub-title="今日交易总额"
                suffix="元"
                :total="numeral(124543233).format('0,0')"
              />
            </el-col>
            <el-col :sm="6" :xs="24">
              <number-info
                sub-title="销售目标完成率"
                total="92%"
              />
            </el-col>
            <el-col :sm="6" :xs="24">
              <number-info
                sub-title="活动剩余时间"
                :total="numeral(124543233).format('0,0')"
              />
            </el-col>
            <el-col :sm="6" :xs="24">
              <number-info
                sub-title="每秒交易总额"
                suffix="元"
                :total="numeral(234).format('0,0')"
              />
            </el-col>
          </el-row>
          <div class="map-chart">
            <el-tooltip content="等待后期实现" placement="top">
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                alt="map"
              />
            </el-tooltip>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Row, Col, Card, Tooltip } from 'element-ui'
import * as numeral from 'numeral'

import { yuan } from 'components/Charts'
import NumberInfo from 'components/NumberInfo'

Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Tooltip)
Vue.use(NumberInfo)

export default Vue.extend({
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

.map-chart {
  padding-top: 24px;
  height: 457px;
  text-align: center;
  img {
    display: inline-block;
    max-width: 100%;
    max-height: 437px;
  }
}

@media screen and (max-width: $screen-lg) {
  .map-chart {
    height: auto;
  }
}
</style>
