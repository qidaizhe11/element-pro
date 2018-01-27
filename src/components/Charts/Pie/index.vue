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

import { theme, defaultOptions, colorSpan } from 'components/Charts/default'

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
        color: data.length > 8 ? theme.colorsPie16 : theme.colorsPie,
        grid: defaultOptions.grid,
        tooltip: {
          ...defaultOptions.tooltip,
          formatter: (params: any) => {
            return `${colorSpan(params.color)}${params.data.label}: ${
              params.percent
            }%`
          }
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
