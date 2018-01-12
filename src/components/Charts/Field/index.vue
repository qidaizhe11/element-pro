<template>
  <div class="field" v-bind="$attrs">
    <span>{{label}}</span>
    <span v-html="value"></span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: String,
    value: String
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.field {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  span {
    font-size: $font-size-base;
    line-height: 22px;
  }
  span:last-child {
    margin-left: 8px;
    color: $heading-color;
  }
}
</style>

