<template>
  <div class="echarts" :style="style"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as echarts from 'echarts'
import { debounce } from 'lodash'

import EChart = echarts.ECharts

export default Vue.extend({
  props: {
    options: Object,
    theme: [String, Object],
    initOptions: Object,
    group: String,
    autoResize: Boolean,
    watchShallow: Boolean,
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    const chart: any = null
    const resizeHandler: any = null
    const style = {
      width: this.width,
      height: this.height
    }
    return {
      chart,
      resizeHandler,
      style
    }
  },
  created() {
    this.$watch(
      'options',
      options => {
        if (!this.chart && options) {
          this.init()
        } else {
          this.chart.setOption(this.options, true)
        }
      },
      { deep: !this.watchShallow }
    )
    let watched = ['theme', 'initOptions', 'autoResize', 'watchShallow', 'width', 'height']
    watched.forEach(prop => {
      this.$watch(
        prop,
        () => {
          this.refresh()
        },
        { deep: true }
      )
    })
  },
  mounted() {
    // auto init if `options` is already provided
    if (this.options) {
      this.init()
    }
  },
  activated() {
    if (this.autoResize) {
      this.chart && this.chart.resize()
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.destroy()
  },
  methods: {
    resize() {
      this.delegateMethod('resize', this.options)
    },
    clear() {
      this.delegateMethod('clear')
    },
    dispose() {
      this.delegateMethod('dispose')
    },
    delegateMethod(name: string, ...args: any[]) {
      const chart: any = this.chart
      if (!chart) {
        console.warn(
          `Cannot call [${name}] before the chart is initialized. Set prop [options] first.`
        )
        return
      }
      chart[name](...args)
    },
    init() {
      if (this.chart) {
        return
      }

      let chart = echarts.init(
        this.$el as HTMLDivElement,
        this.theme,
        this.initOptions
      )

      if (this.group) {
        chart.group = this.group
      }

      chart.setOption(this.options, true)

      if (this.autoResize) {
        this.resizeHandler = debounce(
          () => {
            chart.resize()
          },
          100,
          { leading: true }
        )
        window.addEventListener('resize', this.resizeHandler)
      }

      this.chart = chart
    },
    destroy() {
      if (this.autoResize) {
        window.removeEventListener('resize', this.resizeHandler)
      }
      this.dispose()
      this.chart = null
    },
    refresh() {
      this.destroy()
      this.init()
    }
  }
})
</script>
