<template>
  <div
    class="water-wave"
    ref="root"
  >
    <e-chart
      ref="echart" 
      :options="options" 
      :auto-resize="true"
      :height="height"
    />
    <div
      class="text"
    >
      <span v-if="title">{{title}}</span>
      <h4>{{percent}}%</h4>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import 'echarts-liquidFill'

import EChart from 'components/EChart/index.vue'
import { theme } from 'components/Charts/default'

export default Vue.extend({
  components: {
    EChart
  },
  props: {
    title: String,
    percent: Number,
    height: {
      type: String,
      default: '100%'
    },
    color: {
      type: String,
      default: '#1890FF'
    }
  },
  data() {
    const maskImage: any = null
    return {
      maskImage
    }
  },
  computed: {
    options(): any {
      const { height, percent, color, title } = this
      if (!percent) {
        return {}
      }
      return {
        series: [
          {
            type: 'liquidFill',
            name: title,
            radius: '98%',
            data: [percent / 100],
            color: [color],
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 2,
                borderColor: color
              }
            },
            backgroundStyle: {
              color: '#fff',
              borderColor: '#fff',
              borderWidth: 1
            },
            itemStyle: {
              opacity: 0.8,
              shadowBlur: 0
            },
            label: {
              show: false
            }
          }
        ]
      }
    }
  }
})
</script>

<style lang="scss">
@import '~theme/theme.scss';

.water-wave {
  position: relative;
  .text {
    position: absolute;
    left: 0;
    top: 32px;
    text-align: center;
    width: 100%;
    span {
      color: $text-color-secondary;
      font-size: 14px;
      line-height: 22px;
    }
    h4 {
      color: $heading-color;
      line-height: 32px;
      font-size: 24px;
    }
  }
}
</style>
