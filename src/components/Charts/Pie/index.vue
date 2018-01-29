<template>
  <div class="pie">
    <div class="chart" ref="chart">
      <e-chart ref="echart" :options="options" :auto-resize="true"
        :height="height">
      </e-chart>
      <div class="total" v-if="subTitle || $slots.subTitle || total">
        <h4 class="pie-sub-title" v-if="subTitle || $slots.subTitle">
          {{ subTitle && subTitle}}
          <slot v-if="$slots.subTitle" name="subTitle"></slot>
        </h4>
        <div class="pei-stat" v-html="total"></div>
      </div>
    </div>
    <template v-if="hasLegend">
      <ul class="legend">
        <template v-for="item in legendData">
          <li :key="item.x">
            <span class="dot" :style="{backgroundColor: !item.checked ? '#aaa' : item.color}">
            </span>
            <span class="legend-title">{{item.x}}</span>
            <span class="percent">
              {{`${(isNan(item.percent) ? 0 : item.percent * 100).toFixed(2)}%`}}
            </span>
            <span class="value" v-html="item.y"></span>
          </li>
        </template>
      </ul>
    </template>
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
    total: String,
    hasLegend: {
      type: Boolean,
      default: false
    },
    inner: {
      type: String,
      default: '75%'
    },
    colors: Array,
    lineWidth: {
      type: Number,
      default: 1
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
      const { data, inner, colors, lineWidth } = this
      const defaultColors =
        data.length > 8 ? theme.colorsPie16 : theme.colorsPie
      return {
        color: colors || defaultColors,
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
            radius: [inner, '100%'],
            label: {
              show: false
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: lineWidth
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
  watch: {
    data: {
      immediate: true,
      handler: function(val) {
        this.$nextTick(() => {
          this.getLegendData()
        })
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
    },
    getLegendData() {
      const echartRef = this.$refs.echart
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
