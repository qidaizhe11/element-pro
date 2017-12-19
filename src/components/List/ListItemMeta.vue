<template>
  <div :class="cls">
    <template v-if="this.$slots.avatar">
      <div :class="`${cls}-avatar`">
        <slot name="avatar"></slot>
      </div>
    </template>
    <template v-if="title || description">
      <div :class="`${cls}-content`">
        <h4 v-if="title" :class="`${cls}-title`">{{title}}</h4>
        <div v-if="description" :class="`${cls}-description`">{{description}}</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: String,
    description: String
  },
  data() {
    return {
      cls: 'ep-list-item-meta'
    }
  }
})
</script>

