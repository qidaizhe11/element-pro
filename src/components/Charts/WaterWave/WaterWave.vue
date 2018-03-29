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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from 'lodash'
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
      const { height, percent } = this
      // const colors = theme.colors16
      if (!percent) {
        return {}
      }
      return {
        series: [
          {
            type: 'liquidFill',
            radius: '95%',
            data: [percent / 100]
          }
        ]
      }
    }
  }
})
</script>

<style lang="scss">

</style>
