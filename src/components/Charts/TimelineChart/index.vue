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
          top: 60,
          right: 20,
          bottom: 40 + 30,
          left: 40
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
        legend: {
          show: true
        },
        dataset: {
          source: this.data
        },
        xAxis: {
          ...defaultOptions.xAxis,
          // type: 'category'
          type: 'time',
          axisLabel: {
            ...defaultOptions.xAxis.axisLabel,
            formatter: (value: any) => {
              return moment(value).format('HH:mm')
            }
          }
        },
        yAxis: {
          ...defaultOptions.yAxis,
          type: 'value'
        },
        dataZoom: {
          show: true,
          realtime: true
        },
        series: [
          {
            ...defaultOptions.series.line,
            itemStyle: defaultOptions.series.line.getItemStyle(defaultColors[0]),
            name: titleMap.y1,
            type: 'line',
            encode: {
              x: 'x',
              y: 'y1'
            }
          },
          {
            ...defaultOptions.series.line,
            itemStyle: defaultOptions.series.line.getItemStyle(defaultColors[1]),
            name: titleMap.y2,
            type: 'line',
            encode: {
              x: 'x',
              y: 'y2'
            }
          }
        ]
      }
    }
  }
})
</script>
