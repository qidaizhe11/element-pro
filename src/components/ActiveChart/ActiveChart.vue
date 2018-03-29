<template>
  <div class="active-chart">
    <number-info
      sub-title="目标评估"
      total="有望达到预期"
    />
    <div :style="{marginTop: '32px'}">
      <mini-area
        line
        height="84px"
        :data="activeData"
      />
    </div>
    <template v-if="activeData">
      <div class="active-chart-grid">
        <p>{{[...activeData].sort()[activeData.length - 1].y + 200}} 亿元</p>
        <p>{{[...activeData].sort()[Math.floor(activeData.length / 2)].y}} 亿元</p>
      </div>
    </template>
    <template v-if="activeData">
      <div class="active-chart-legend">
        <span>00:00</span>
        <span>{{activeData[Math.floor(activeData.length / 2)].x}}</span>
        <span>{{activeData[activeData.length - 1].x}}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { MiniArea } from '../Charts/MiniArea'
import { NumberInfo } from '../NumberInfo'

function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val
}

function getActiveData() {
  const activeData = []
  for (let i = 0; i < 24; i += 1) {
    activeData.push({
      x: `${fixedZero(i)}:00`,
      y: Math.floor(Math.random() * 200) + i * 50
    })
  }
  return activeData
}

export default Vue.extend({
  components: {
    MiniArea,
    NumberInfo
  },
  data() {
    const timer: any = null
    return {
      activeData: getActiveData(),
      timer
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.activeData = getActiveData()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
})
</script>

<style lang="scss">
.active-chart {
  position: relative;
}
.active-chart-grid {
  p {
    position: absolute;
    top: 80px;
  }
  p:last-child {
    top: 115px;
  }
}
.active-chart-legend {
  position: relative;
  font-size: 0;
  margin-top: 8px;
  height: 20px;
  line-height: 20px;
  span {
    display: inline-block;
    font-size: 12px;
    text-align: center;
    width: 33.33%;
  }
  span:first-child {
    text-align: left;
  }
  span:last-child {
    text-align: right;
  }
}
</style>
