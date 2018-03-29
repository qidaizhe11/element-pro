<template>
  <div>
    <el-row :gutter="24">
      <el-col :lg="18" :md="24" :sm="24" :xs="24">
        <el-card
          header="活动实时交易情况"
        >
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
              >
                <count-down
                  slot="total"
                  :target="targetTime"
                />
              </number-info>
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
      <el-col :lg="6" :md="24" :sm="24" :xs="24">
        <el-card
          :style="{marginBottom: '24px'}"
          header="活动情况预测"
        >
          <active-chart />
        </el-card>
        <el-card
          :style="{marginBottom: '24px'}"
          :body-style="{textAlign: 'center'}"
          header="券核效率"
        >
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
import CountDown from 'components/CountDown'
import ActiveChart from 'components/ActiveChart'

Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Tooltip)
Vue.use(NumberInfo)
Vue.use(CountDown)
Vue.use(ActiveChart)

export default Vue.extend({
  data() {
    return {
      targetTime: new Date().getTime() + 3900000
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
