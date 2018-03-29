<template>
  <div
    class="tag-cloud"
    ref="root"
    :style="{width: '100%', height: height}"
  >
    <e-chart
      ref="echart" 
      :options="options" 
      :auto-resize="true"
      :height="`calc(${height} * 4)`"
      width="400%"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import 'echarts-wordcloud'

import EChart from 'components/EChart/index.vue'
import { theme } from 'components/Charts/default'

const imgUrl =
  'https://gw.alipayobjects.com/zos/rmsportal/gWyeGLCdFFRavBGIDzWk.png'

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
    const maskImage: any = null
    return {
      maskImage
    }
  },
  computed: {
    options(): any {
      const { data, maskImage, height } = this
      const colors = theme.colors16
      return {
        series: [
          {
            type: 'wordCloud',
            rotationRange: [0, 0],
            sizeRange: [20, 70],
            gridSize: 10,
            maskImage: maskImage,
            width: '100%',
            height: '100%',
            textStyle: {
              normal: {
                color: () => {
                  return colors[Math.round(Math.random() * 16)]
                }
              }
            },
            data: data
          }
        ]
      }
    }
  },
  created() {
    const maskImage = new Image()
    maskImage.crossOrigin = ''
    maskImage.src = imgUrl
    maskImage.onload = this.onload
    this.maskImage = maskImage
  },
  methods: {
    onload() {
      const echartRef: any = this.$refs.echart
      if (echartRef) {
        echartRef.refresh()
      }
    }
  }
})
</script>

<style lang="scss">
.tag-cloud {
  overflow: hidden;
  canvas {
    transform: scale(0.25);
    transform-origin: 0 0;
  }
}
</style>
