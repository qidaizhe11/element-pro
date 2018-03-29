<template>
  <div class="trend-item" :class="{'trend-item-grey': !colorful}"  v-bind="$attrs">
    <span class="value">
      <slot></slot>
    </span>
    <span v-if="flag" :class="flag">
      <ant-icon :type="`caret-${flag}`"></ant-icon>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import AntIcon from 'components/AntIcon'

Vue.use(AntIcon)

export default Vue.extend({
  props: {
    colorful: {
      type: Boolean,
      default: true
    },
    flag: String
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.trend-item {
  display: inline-block;
  font-size: $font-size-base;
  line-height: 22px;

  .up,
  .down {
    margin-left: 4px;
    position: relative;
    top: 1px;
    i {
      font-size: 12px;
      transform: scale(0.83);
    }
  }
  .up {
    color: $red-6;
  }
  .down {
    color: $green-6;
    top: -1px;
  }

  &.trend-item-grey .up,
  &.trend-item-grey .down {
    color: $text-color;
  }
}
</style>

