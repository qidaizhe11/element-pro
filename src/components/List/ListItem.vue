<template>
  <div class="ep-list-item">
    <slot name="meta"></slot>
    <div class="ep-list-item-content">
      <slot></slot>
    </div>
    <slot name="action"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {

    }
  },
  created() {
    console.log('ListItem, created, this.slots:', this.$slots)
  }
})
</script>

