<template>
  <div :style="{ margin: '-20px -20px 0 '}">
    <slot name="top"></slot>
    <page-header
      :title="title || $slots.title"
      :content="content || $slots.content"
      :logo="logo || $slots.logo"
      :action="action || $slots.action"
      :extra-content="extraContent || $slots['extra-content']"
      :breadcrumb-name-map="breadcrumbNameMap"
      :tab-list="tabList"
      :tab-active-key="tabActiveKey"
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
  },
  props: {
    title: String,
    content: String,
    logo: String,
    action: String,
    extraContent: String,
    breadcrumbNameMap: Object,
    tabList: Array,
    tabActiveKey: String
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.content {
  margin: 24px 24px 0;
}

@media screen and (max-width: $screen-sm) {
  .content {
    margin: 24px 0 0;
  }
}
</style>
