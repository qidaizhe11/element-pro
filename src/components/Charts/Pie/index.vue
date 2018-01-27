<template>
  <div class="pie">
    <div class="chart" ref="chart">
      <e-chart :options="options" :auto-resize="true" :height="height">
      </e-chart>
    </div>
    <div class="total" v-if="subTitle || $slots.subTitle || total">
      <h4 class="pie-sub-title" v-if="subTitle || $slots.subTitle">
        {{ subTitle && subTitle}}
        <slot v-if="$slots.subTitle" name="subTitle"></slot>
      </h4>
      <div class="pei-stat" v-html="total"></div>
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
    },
    subTitle: String,
    total: String
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

<style lang="scss" scoped>
@import '~theme/theme.scss';

.pie {
  position: relative;
  .chart {
    position: relative;
  }
  &.hasLegend .chart {
    width: calc(100% - 240px);
  }
  .legend {
    position: absolute;
    right: 0;
    min-width: 200px;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 20px;
    list-style: none;
    padding: 0;
    li {
      cursor: pointer;
      margin-bottom: 16px;
      height: 22px;
      line-height: 22px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .dot {
    border-radius: 8px;
    display: inline-block;
    margin-right: 8px;
    position: relative;
    top: -1px;
    height: 8px;
    width: 8px;
  }
  .line {
    background-color: $border-color-split;
    display: inline-block;
    margin-right: 8px;
    width: 1px;
    height: 16px;
  }
  .legendTitle {
    color: $text-color;
  }
  .percent {
    color: $text-color-secondary;
  }
  .value {
    position: absolute;
    right: 0;
  }
  .title {
    margin-bottom: 8px;
  }
  .total {
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    height: 62px;
    transform: translate(-50%, -50%);
    & > h4 {
      color: $text-color-secondary;
      font-size: 14px;
      line-height: 22px;
      height: 22px;
      margin-bottom: 8px;
      font-weight: normal;
    }
    & > p {
      color: $heading-color;
      display: block;
      font-size: 1.2em;
      height: 32px;
      line-height: 32px;
      white-space: nowrap;
    }
  }
}

.legendBlock {
  &.hasLegend .chart {
    width: 100%;
    margin: 0 0 32px 0;
  }
  .legend {
    position: relative;
    transform: none;
  }
}
</style>
