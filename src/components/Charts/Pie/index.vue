<template>
  <div class="pie">
    <div class="chart" ref="chart">
      <e-chart :options="options" :auto-resize="true" :height="height">
      </e-chart>
    </div>
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
    return {
      legendData: [],
      legendBlock: false
    }
  },
  computed: {
    options(): any {
      const { data } = this
      return {
        grid: {
          left: 0,
          right: 0,
          top: 10,
          bottom: 5,
          containLabel: true
        },
        tooltip: {
          formatter: (params: any) => {
            const colorSpan = (color: string) => {
              return `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:8px;height:8px;background-color:${color};border: 1px solid #fff;"></span>`
            }
            return `${colorSpan(params.color)}${params.data.label}: ${params.percent}%`
          },
          textStyle: {
            fontSize: 12
          },
          padding: [10, 5]
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            label: {
              show: false
            },
            data: data.map(item => {
              return {
                value: item.y,
                label: item.x
              }
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

      // const canvasWidth = chartRef.clientWidth
      // if (!this.autoLabel) {
      //   return
      // }
      // const minWidth = this.data.length * 30
      // if (canvasWidth <= minWidth) {
      //   if (!this.autoHideXLabels) {
      //     this.autoHideXLabels = true
      //   }
      // } else if (this.autoHideXLabels) {
      //   this.autoHideXLabels = false
      // }
    }
  }
})
</script>
