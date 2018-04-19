<template>
  <el-card :body-style="{padding: '20px 24px 8px 24px'}">
    <div class="chart-card">
      <div class="chart-top" :class="{'chart-top-margin': !hasChildren && !hasFooter}">
        <div v-if="$slots.avatar" class="avatar">
          <slot name="avatar"></slot>
        </div>
        <div class="meta-wrap">
          <div class="meta">
            <span class="title">{{title}}</span>
            <span class="action">
              <slot name="action"></slot>
            </span>
          </div>
          <div v-if="total" class="total" v-html="total"></div>
        </div>
      </div>
      <div v-if="hasChildren" class="content" :style="{height: contentHeight || 'auto'}">
        <div :class="{'content-fixed': contentHeight}">
          <slot></slot>
        </div>
      </div>
      <div v-if="hasFooter" class="footer" :class="{'footer-margin': !hasChildren}">
        <slot name="footer"></slot>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Card } from 'element-ui'

Vue.use(Card)

export default Vue.extend({
  props: {
    title: String,
    total: {
      type: [Number, String],
      default: null
    },
    contentHeight: String || null
  },
  computed: {
    hasChildren(): boolean {
      return !!this.$slots.default
    },
    hasFooter(): boolean {
      return !!this.$slots.footer
    }
  },
  data() {
    return {

    }
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.chart-card {
  position: relative;
  .chart-top {
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  .chart-top-margin {
    margin-bottom: 12px;
  }
  .chart-top-has-margin {
    margin-bottom: 20px;
  }
  .meta-wrap {
    float: left;
  }
  .avatar {
    position: relative;
    top: 4px;
    float: left;
    margin-right: 20px;
    img {
      border-radius: 100%;
    }
  }
  .meta {
    color: $text-color-secondary;
    font-size: $font-size-base;
    line-height: 22px;
    height: 22px;
  }
  .action {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
  }
  .total {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    color: $heading-color;
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 30px;
    line-height: 38px;
    height: 38px;
  }
  .content {
    margin-bottom: 12px;
    position: relative;
    width: 100%;
  }
  .content-fixed {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .footer {
    border-top: 1px solid $border-color-split;
    padding-top: 9px;
    margin-top: 8px;
    & > * {
      position: relative;
    }
  }
  .footer-margin {
    margin-top: 20px;
  }
}

</style>

