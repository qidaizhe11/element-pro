<template>
  <div class="mini-progress">
    <el-tooltip v-if="target" :content="`目标值：${target}%`" placement="top">
      <div class="target" :style="{left: (target ? `${target}%` : null)}">
        <span :style="{backgroundColor: color || null}"></span>
        <span :style="{backgroundColor: color || null}"></span>
      </div>
    </el-tooltip>
    <div class="progress-wrap">
      <div class="progress" :style="progressStyle">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Tooltip } from 'element-ui'

Vue.use(Tooltip)

export default Vue.extend({
  props: {
    color: {
      type: String,
      default: 'rgb(19, 194, 194)'
    },
    percent: Number,
    strokeWidth: Number,
    target: Number
  },
  computed: {
    progressStyle(): any {
      return {
        backgroundColor: this.color || null,
        width: this.percent ? `${this.percent}%` : null,
        height: this.strokeWidth ? `${this.strokeWidth}px` : null
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.mini-progress {
  padding: 5px 0;
  position: relative;
  width: 100%;
  .progress-wrap {
    background-color: $background-color-base;
    position: relative;
  }
  .progress {
    transition: all .4s cubic-bezier(.08, .82, .17, 1) 0s;
    border-radius: 1px 0 0 1px;
    background-color: $primary-color;
    width: 0;
    height: 100%;
  }
  .target {
    position: absolute;
    top: 0;
    bottom: 0;
    span {
      border-radius: 100px;
      position: absolute;
      top: 0;
      left: 0;
      height: 4px;
      width: 2px;
    }
    span:last-child {
      top: auto;
      bottom: 0;
    }
  }
}
</style>
