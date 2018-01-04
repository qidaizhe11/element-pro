<template>
  <div :class="cls">
    <template v-if="this.$slots.avatar">
      <div :class="`${cls}-avatar`">
        <slot name="avatar"></slot>
      </div>
    </template>
    <template v-if="showContent">
      <div :class="`${cls}-content`">
        <h4 v-if="title || this.$slots.title" :class="`${cls}-title`">
          <template v-if="title">
            {{title}}
          </template>
          <template v-else>
            <slot name="title"></slot>
          </template>
        </h4>
        <div v-if="description || this.$slots.description" :class="`${cls}-description`">
          <template v-if="description">
            {{description}}
          </template>
          <template v-else>
            <slot name="description"></slot>
          </template>
        </div>
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
  },
  computed: {
    showContent(): boolean {
      return !!(
        this.title ||
        this.$slots.title ||
        this.description ||
        this.$slots.description
      )
    }
  }
})
</script>

