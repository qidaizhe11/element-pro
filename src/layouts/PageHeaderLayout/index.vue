<template>
  <div :style="{ margin: '-24px -24px 0 '}">
    <slot name="top"></slot>
    <page-header
      v-bind="$attrs"
      v-on="$listeners"
    />
    <div
      v-if="$slots.default" 
      class="content"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { PageHeader } from 'components/PageHeader'

export default Vue.extend({
  components: {
    PageHeader
  }
})
</script>
