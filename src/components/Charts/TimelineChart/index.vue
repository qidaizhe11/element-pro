<template>
  <div class="timeline-chart" ref="chart">
    <h4 v-if="title">{{title}}</h4>
    <e-chart :options="options" :auto-resize="true" :height="height">
    </e-chart>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as moment from 'moment'

import EChart from 'components/EChart/index.vue'

import { theme, defaultOptions, colorSpan } from 'components/Charts/default'

export default Vue.extend({
  components: {
    EChart
  },
  props: {
    title: String,
    data: {
      type: Array,
      default() {
        return [
          {
            x: 0,
            y1: 0,
            y2: 0
          }
        ]
      }
    },
    height: {
      type: String,
      default: '400px'
    },
    titleMap: {
      type: Object,
      default() {
        return {
          y1: 'y1',
          y2: 'y2'
        }
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    options(): any {
      const { data, titleMap } = this

      const defaultColors = theme.colors

      return {
        color: defaultColors,
        grid: {
          // ...defaultOptions.grid,
          containLabel: false
        },
        tooltip: {
          ...defaultOptions.tooltip,
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          },
          formatter: (paramsList: any) => {
            return paramsList.reduce((prev: any, curr: any) => {
              const currStr = `${colorSpan(curr.color)}${curr.seriesName}：${
                curr.data[`y${curr.seriesIndex + 1}`]
              }`
              return prev + '<br />' + currStr
            }, moment(paramsList[0].axisValue).format('HH:mm'))
          }
        },
        dataset: {
          source: this.data
        },
        xAxis: {
          // type: 'category'
          type: 'time',
          splitNumber: data.length,
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#797979',
            margin: 12,
            formatter: (value: any) => {
              return moment(value).format('HH:mm')
            }
          },
          axisTick: {
            show: true,
            alignWithLabel: true
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#bebebe'
            }
          },
          axisPointer: {
            status: 'hide'
          }
        },
        yAxis: {
          type: 'value',
          show: true,
          axisLabel: {
            color: '#797979'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dotted'
            }
          }
        },
        dataZoom: [
          {
            show: true,
            realtime: true
          }
        ],
        series: [
          {
            name: titleMap.y1,
            type: 'line',
            encode: {
              x: 'x',
              y: 'y1',
              tooltip: ['y1']
            },
            showSymbol: false
          },
          {
            name: titleMap.y2,
            type: 'line',
            encode: {
              x: 'x',
              y: 'y2'
            },
            showSymbol: false
          }
        ]
      }
    }
  }
})
</script>
