<template>
  <div
    class="chart" 
    ref="chart"
  >
    <e-chart
      :options="options" 
      :auto-resize="true" 
      :height="height"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from 'lodash'

import EChart from 'components/EChart/index.vue'

import { defaultOptions, colorSpan } from 'components/Charts/default'

const defaultFormatter = (val: number) => {
  switch (val) {
    case 20:
      return '差'
    case 40:
      return '中'
    case 60:
      return '良'
    case 80:
      return '优'
    default:
      return ''
  }
}

export default Vue.extend({
  components: {
    EChart
  },
  props: {
    color: {
      type: String,
      default: '#2F9CFF'
    },
    bgColor: {
      type: String,
      default: '#F0F2F5'
    },
    height: {
      type: String,
      default: '100%'
    },
    title: String,
    percent: Number,
    formatter: Function
  },
  data() {
    return {
      autoHideXLabels: false
    }
  },
  computed: {
    options(): any {
      const { color, bgColor, title, percent, formatter } = this
      return {
        grid: {
          ...defaultOptions.grid
        },
        tooltip: {
          ...defaultOptions.tooltip,
          confine: true
        },
        series: [
          {
            type: 'gauge',
            itemStyle: {
              color: color
            },
            splitNumber: 5,
            radius: '85%',
            axisLine: {
              lineStyle: {
                color: [[0, color], [percent * 0.01, color], [1, bgColor]],
                width: 10
              }
            },
            splitLine: {
              length: 10
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: formatter || defaultFormatter,
              color: 'rgba(0, 0, 0, 0.65)',
              distance: 8
            },
            pointer: {
              length: '70%',
              width: 5
            },
            title: {
              offsetCenter: [0, '50%'],
              color: 'rgba(0, 0, 0, 0.43)',
              fontSize: 14
            },
            detail: {
              formatter: '{value}%',
              offsetCenter: [0, '90%'],
              color: 'rgba(0, 0, 0, 0.85)',
              fontSize: 24
            },
            silent: true,
            data: [
              {
                value: percent,
                name: title
              }
            ]
          }
        ]
      }
    }
  }
})
</script>
