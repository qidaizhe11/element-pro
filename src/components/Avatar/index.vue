<template>
  <span :class="className" v-bind="$attrs">
    <template v-if="src && isImgExist">
      <img :src="src" @error="handleImgLoadError" />
    </template>
    <template v-else>
      <span class="avatar-string">
        <slot></slot>
      </span>
    </template>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    const sizeCls = {
      'avatar-lg': this.size === 'large',
      'avatar-sm': this.size === 'small'
    }
    return {
      // TODO: set scale auto if image too large
      // scale: 1,
      isImgExist: true,
      className: {
        'avatar': true,
        ...sizeCls,
        'avatar-image': this.src,
        [`avatar-${this.shape}`]: this.shape
      }
    }
  },
  props: {
    shape: {
      type: String,
      default: 'circle'
    },
    size: {
      type: String,
      default: 'default'
    },
    src: String
  },
  methods: {
    handleImgLoadError() {
      this.isImgExist = false
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

@mixin avatar-size($size, $font-size) {
  width: $size;
  height: $size;
  line-height: $size;
  border-radius: $size / 2;

  & > * {
    line-height: $size;
  }

  &.avatar-icon {
    font-size: $font-size;
  }
}

.avatar {
  display: inline-block;
  text-align: center;
  background: $avatar-bg;
  color: $avatar-color;
  white-space: nowrap;
  position: relative;
  overflow: hidden;

  @include avatar-size($avatar-size-base, $avatar-font-size-base);

  &-lg {
    @include avatar-size($avatar-size-lg, $avatar-font-size-lg);
  }
  &-sm {
    @include avatar-size($avatar-size-sm, $avatar-font-size-sm);
  }

  &-square {
    border-radius: $avatar-border-radius;
  }

  & > img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .avatar-string {
    position: absolute;
    display: inline-block;
    left: calc(50% - 4px);
  }
}
</style>

