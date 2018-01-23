<template>
  <div class="chart" ref="chart">
    <h4 v-if="title" :style="{marginBottom: '20px'}">{{title}}</h4>
    <e-chart :options="options" :auto-resize="true" :height="title ? `calc(${height} - 41px)` : height">
    </e-chart>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from 'lodash'

import EChart from 'components/EChart/index.vue'

export default Vue.extend({
  components: {
    EChart
  },
  props: {
    color: {
      type: String,
      default: 'rgba(24, 144, 255, 0.85)'
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
    title: String,
    autoLabel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      autoHideXLabels: false
    }
  },
  computed: {
    options(): any {
      const { color, data, autoHideXLabels } = this
      return {
        grid: {
          left: 0,
          right: 0,
          top: 10,
          bottom: 5,
          containLabel: true
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
              console.log('echarts, formatter, item:', item)
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
            axisLabel: {
              show: !autoHideXLabels,
              color: '#797979',
              margin: 12
            },
            axisTick: {
              show: !autoHideXLabels,
              alignWithLabel: true
            },
            axisLine: {
              show: !autoHideXLabels,
              lineStyle: {
                color: '#bebebe'
              }
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
    }
  },
  mounted() {
    window.addEventListener('resize', debounce(this.resize, 400))
  },
  beforeDestroy() {
    window.removeEventListener('resize', debounce(this.resize, 400))
  },
  methods: {
    resize() {
      const chartRef: any = this.$refs.chart
      if (!chartRef) {
        return
      }

      const canvasWidth = chartRef.clientWidth
      if (!this.autoLabel) {
        return
      }
      const minWidth = this.data.length * 30
      if (canvasWidth <= minWidth) {
        if (!this.autoHideXLabels) {
          this.autoHideXLabels = true
        }
      } else if (this.autoHideXLabels) {
        this.autoHideXLabels = false
      }
    }
  }
})
</script>
