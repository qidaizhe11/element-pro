<template>
  <e-chart class="chart" :options="options" :auto-resize="true"
    :height="height"></e-chart>
</template>

<script lang="ts">
import Vue from 'vue'

import EChart from 'components/EChart/index.vue'

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
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              width: 0
            }
          },
          formatter: (paramsList: any) => {
            const colorSpan = (color: string) => {
              return `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:8px;height:8px;background-color:${color};border: 1px solid #fff;"></span>`
            }
            return paramsList.map((item: any) => {
              return `${colorSpan(item.color)}${item.value[0]}: ${
                item.value[1]
              }`
            })
          },
          confine: true,
          textStyle: {
            fontSize: 12
          },
          padding: [10, 5]
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
