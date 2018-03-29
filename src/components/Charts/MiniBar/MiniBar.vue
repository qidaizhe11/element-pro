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
            return `${colorSpan(item.color)}${item.value[0]}: ${item.value[1]}`
          })
        },
        confine: true
      },
      xAxis: {
        ...defaultOptions.miniXAxis,
        type: 'category',
        data: data.map(item => {
          return item.x
        })
      },
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
