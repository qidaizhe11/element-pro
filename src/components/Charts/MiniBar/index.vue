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
      default: '#1890ff'
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
        },
        formatter: (paramsList: any) => {
          const colorSpan = (color: string) => {
            return `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:8px;height:8px;background-color:${color};border: 1px solid #fff;"></span>`
          }
          return paramsList.map((item: any) => {
            return `${colorSpan(item.color)}${item.value[0]}: ${item.value[1]}`
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
          type: 'bar',
          itemStyle: {
            normal: {
              color: color
            }
          },
          barWidth: '50%',
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
