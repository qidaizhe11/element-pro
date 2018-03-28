<template>
  <div class="number-info" :class="{[`number-info-${theme}`]: theme}">
    <div v-if="title || this.$slots.title" class="number-info-title">
      <template v-if="title">
        {{title}}
      </template>
      <template v-else>
        <slot name="title"></slot>
      </template>
    </div>
    <div v-if="subTitle || this.$slots.subTitle" class="number-info-sub-title">
      <template v-if="subTitle">
        {{subTitle}}
      </template>
      <template v-else>
        <slot name="subTitle"></slot>
      </template>
    </div>
    <div class="number-info-value" :style="gapStyle">
      <span>
        {{total && total}}
        <slot v-if="$slots.total" name="total"></slot>
        <em v-if="suffix || this.$slots.suffix" class="suffix">
          {{suffix && suffix}}
          <slot v-if="$slots.suffix" name="suffix"></slot>
        </em>
      </span>
      <span v-if="status || subTotal" class="sub-total">
        {{subTotal}}
        <ant-icon v-if="status" :type="`caret-${status}`"></ant-icon>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AntIcon from 'components/AntIcon'

Vue.use(AntIcon)

export default Vue.extend({
  props: {
    title: String,
    subTitle: String,
    theme: String,
    total: [Number, String],
    status: String,
    subTotal: Number,
    gap: Number,
    suffix: String
  },
  data() {
    const gapStyle = this.gap ? { marginTop: `${this.gap}px` } : null
    return {
      gapStyle
    }
  }
})
</script>

<style lang="scss">
@import '~theme/theme.scss';

.number-info {
  .suffix {
    color: $text-color;
    font-size: 16px;
    font-style: normal;
    margin-left: 4px;
  }
  .number-info-title {
    color: $text-color;
    font-size: $font-size-lg;
    margin-bottom: 16px;
    transition: all .3s;
  }
  .number-info-sub-title {
    color: $text-color-secondary;
    font-size: $font-size-base;
    height: 22px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
  }
  .number-info-value {
    margin-top: 4px;
    font-size: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    & > span {
      color: $heading-color;
      display: inline-block;
      line-height: 32px;
      height: 32px;
      font-size: 24px;
      margin-right: 32px;
    }
    .sub-total {
      color: $text-color-secondary;
      font-size: $font-size-lg;
      vertical-align: top;
      margin-right: 0;
      i {
        font-size: 12px;
        transform: scale(0.82);
        margin-left: 4px;
      }
      /deep/ {
        .anticon.icon-caretup {
          color: $red-6;
        }
        .anticon.icon-caretdown {
          color: $green-6;
        }
      }
    }
  }
}
.number-infolight {
  .number-info-value {
    & > span {
      color: $text-color;
    }
  }
}
</style>
