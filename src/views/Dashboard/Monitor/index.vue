<template>
  <div>
    <el-row :gutter="24">
      <el-col
        :lg="18" :md="24" :sm="24" :xs="24"
        :style="{marginBottom: '24px'}"
      >
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
          <gauge
            title="跳出率"
            height="180px"
            :percent="87"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :lg="12" :md="24" :sm="24" :xs="24">
        <el-card
          header="各品类占比"
          class="pie-card"
        >
          <el-row :style="{padding: '16px 0'}">
            <el-col :span="8">
              <pie
                :percent="28"
                sub-title="中式快餐"
                total="28%"
                height="128px"
                :line-width="2"
              />
            </el-col>
            <el-col :span="8">
              <pie
                color="#5DDECF"
                :percent="22"
                sub-title="西餐"
                total="22%"
                height="128px"
                :line-width="2"
              />
            </el-col>
            <el-col :span="8">
              <pie
                color="#2FC25B"
                :percent="32"
                sub-title="火锅"
                total="32%"
                height="128px"
                :line-width="2"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xs="24">
        <el-card
          header="热门搜索"
          :body-style="{overflow: 'hidden'}"
        >
          <tag-cloud
            :data="tags"
            height="161px"
          />
        </el-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xs="24">
        <el-card
          header="资源剩余"
          :body-style="{textAlign: 'center', fontSize: 0}"
        >
          <water-wave
            height="161px"
            title="补贴资金剩余"
            :percent="34"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Row, Col, Card, Tooltip } from 'element-ui'
import * as numeral from 'numeral'

import { yuan, Gauge, Pie, TagCloud, WaterWave } from 'components/Charts'
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
Vue.use(Gauge)
Vue.use(Pie)
Vue.use(TagCloud)
Vue.use(WaterWave)

export default Vue.extend({
  data() {
    return {
      targetTime: new Date().getTime() + 3900000
    }
  },
  computed: {
    tags(): any[] {
      return this.$store.state.monitor.tags
    }
  },
  mounted() {
    this.$store.dispatch('monitor/fetchTags')
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

.pie-card {
  /deep/ .pie-stat {
    font-size: 24px;
  }
}

@media screen and (max-width: $screen-lg) {
  .map-chart {
    height: auto;
  }
}
</style>
