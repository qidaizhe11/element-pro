<template>
  <div class="ep-list">
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-else>
      <div class="ep-list-empty-text">
        暂无数据
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'EpList'
})
</script>

<style lang="scss" src="./style/index.scss"></style>
