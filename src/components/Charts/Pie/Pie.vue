<template>
  <div class="pie" ref="root" :class="{'has-legend': hasLegend, 'legend-block': legendBlock}">
    <div class="chart" ref="chart">
      <e-chart ref="echart" :options="options" :auto-resize="true"
        :height="height">
      </e-chart>
      <div class="total" v-if="subTitle || $slots.subTitle || total">
        <h4 class="pie-sub-title" v-if="subTitle || $slots.subTitle">
          {{ subTitle && subTitle}}
          <slot v-if="$slots.subTitle" name="subTitle"></slot>
        </h4>
        <div class="pie-stat" v-html="total"></div>
      </div>
    </div>
    <template v-if="hasLegend">
      <ul class="legend">
        <template v-for="(item, i) in legendData">
          <li :key="item.x" @click="handleLegendClick(item, i)">
            <span class="dot" :style="{backgroundColor: !item.checked ? '#aaa' : item.color}">
            </span>
            <span class="legend-title">{{item.x}}</span>
            <div class="divider divider-vertical"></div>
            <span class="percent">
              {{item.percent}}
            </span>
            <span class="value" v-html="valueFormat ? valueFormat(item.y) : item.y"></span>
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
    },
    valueFormat: Function,
    percent: {
      type: Number,
      default: 0
    },
    color: String,
    tooltip: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const legendData: any[] = []
    return {
      legendData,
      legendBlock: false
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
  computed: {
    filteredLegendData(): any[] {
      return this.legendData.filter(l => l.checked)
    },
    options(): any {
      const { filteredLegendData, percent, inner, lineWidth, tooltip } = this
      return {
        tooltip: {
          ...defaultOptions.tooltip,
          show: percent ? false : tooltip,
          confine: true,
          formatter: (params: any) => {
            return `${colorSpan(params.color)}${params.data[0]}: ${
              params.data[3]
            }`
          }
        },
        dataset: {
          sourceHeader: true,
          // source: filteredLegendData
          source: [['x', 'y', 'color', 'percent']].concat(filteredLegendData.map(item => {
            return [item.x, item.y, item.color, item.percent]
          }))
        },
        series: [
          {
            type: 'pie',
            radius: [inner, '100%'],
            label: {
              show: false
            },
            selectedMode: percent ? false : 'single',
            hoverAnimation: !percent,
            hoverOffset: 5,
            selectedOffset: 6,
            encode: {
              value: 'y',
              itemName: 'x'
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: lineWidth,
              color: (params: any) => {
                return params.data[2]
              }
            }
          }
        ]
      }
    },
    totalCount(): number {
      return this.data.reduce((pre, now) => now.y + pre, 0)
    }
  },
  mounted() {
    this.getLegendData()
    this.resize()
    window.addEventListener('resize', debounce(this.resize, 300))
  },
  beforeDestroy() {
    window.removeEventListener('resize', debounce(this.resize, 300))
  },
  methods: {
    resize() {
      const rootRef: any = this.$refs.root
      if (!this.hasLegend || !rootRef) {
        window.removeEventListener('resize', debounce(this.resize, 300))
        return
      }

      if (rootRef.clientWidth <= 300) {
        if (!this.legendBlock) {
          this.legendBlock = true
        }
      } else if (this.legendBlock) {
        this.legendBlock = false
      }
    },
    handleLegendClick(item: any, i: number) {
      item.checked = !item.checked
    },
    getLegendData() {
      if (!this.hasLegend && !this.percent) {
        return []
      }
      const defaultColors =
        this.data.length > 8 ? theme.colorsPie16 : theme.colorsPie
      const colors = this.colors || defaultColors

      let legendData: any[] = []
      if (this.percent) {
        legendData = this.getLegendDataOfPercent(this.percent)
      } else {
        legendData = this.data.map((item, i) => {
          const colorIndex = i % colors.length
          const percent = item.y / this.totalCount
          return {
            ...item,
            color: colors[colorIndex],
            checked: true,
            // percent: item.y / this.totalCount
            percent: `${(isNaN(percent) ? 0 : percent * 100).toFixed(2)}%`
          }
        })
      }

      this.legendData = legendData
    },
    getLegendDataOfPercent(percent: number) {
      if (!percent) {
        return []
      }
      const { color } = this
      return [
        {
          x: '占比',
          y: percent,
          color: color || 'rgba(24, 144, 255, 0.85)',
          percent: `${percent.toFixed(2)}%`,
          checked: true
        },
        {
          x: '反比',
          y: 100 - percent,
          color: '#f0f2f5',
          percent: `${(100 - percent).toFixed(2)}%`,
          checked: true
        }
      ]
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
  &.has-legend .chart {
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
  .legend-title {
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

.legend-block {
  &.has-legend .chart {
    width: 100%;
    margin: 0 0 32px 0;
  }
  .legend {
    position: relative;
    transform: none;
  }
}

.divider {
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  background: #e8e8e8;

  &-vertical {
    margin: 0 8px;
    display: inline-block;
    height: 0.9em;
    width: 1px;
    vertical-align: middle;
    position: relative;
    top: -0.06em;
  }
}
</style>
