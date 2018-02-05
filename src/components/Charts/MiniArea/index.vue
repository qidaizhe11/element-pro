<template>
  <e-chart class="chart" :options="options" :auto-resize="true"
    :height="height"></e-chart>
</template>

<script lang="ts">
import Vue from 'vue'

import EChart from 'components/EChart/index.vue'

import { defaultOptions, colorSpan } from 'components/Charts/default'

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
    },
    height: {
      type: String,
      default: '100%'
    },
    line: Boolean,
    borderColor: {
      type: String,
      default: '#1089ff'
    },
    borderWidth: {
      type: Number,
      default: 2
    }
  },
  computed: {
    options(): any {
      const { color, data, line, borderColor, borderWidth } = this
      return {
        grid: {
          left: 0,
          right: 0,
          top: '10%',
          bottom: 0
        },
        tooltip: {
          ...defaultOptions.tooltip,
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              width: 0
            }
          },
          formatter: (paramsList: any) => {
            return paramsList.map((item: any) => {
              return `${colorSpan(item.color)}${item.value[0]}: ${
                item.value[1]
              }`
            })
          },
          confine: true
        },
        xAxis: {
          ...defaultOptions.miniXAxis,
          type: 'category',
          boundaryGap: false,
          data: data.map(item => {
            return item.x
          })
        },
        yAxis: {
          show: false
        },
        series: [
          {
            type: 'line',
            smooth: true,
            itemStyle: {
              color: color,
              shadowColor: color,
              shadowBlur: 15,
              borderWidth: 1,
              borderColor: '#fff'
            },
            areaStyle: {
              color: color,
              opacity: 1
            },
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 2,
            lineStyle: {
              width: line ? borderWidth : 0,
              color: borderColor
            },
            data: data.map(item => {
              return [item.x, item.y]
            })
          }
        ]
      }
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
