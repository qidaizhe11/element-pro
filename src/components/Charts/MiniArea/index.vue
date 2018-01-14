<template>
  <e-chart class="chart" :options="options" :auto-resize="true"></e-chart>
</template>

<script lang="ts">
import Vue from 'vue'

import EChart from 'components/EChart/index.vue'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

export default Vue.extend({
  components: {
    EChart
  },
  props: {
    color: {
      type: String,
      default: 'rgba(24, 144, 255, 0.2)'
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    const { color, data } = this
    const options = {
      grid: {
        left: 0,
        right: 0,
        top: '10%',
        bottom: 0
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            width: 0
          }
        }
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisPointer: {
            status: 'hide'
          },
          data: data.map(item => {
            return item.x
          })
        }
      ],
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'line',
          smooth: true,
          areaStyle: {
            normal: { color: color, opacity: 1 }
          },
          showSymbol: false,
          lineStyle: {
            normal: { width: 0 }
          },
          data: data.map(item => {
            return [item.x, item.y]
          })
        }
      ]
    }
    return {
      options
    }
  }
})
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>

