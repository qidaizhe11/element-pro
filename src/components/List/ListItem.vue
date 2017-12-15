<template>
  <div class="ep-list-item">
    <slot name="meta"></slot>
    <div class="ep-list-item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {

    }
  }
})
</script>

