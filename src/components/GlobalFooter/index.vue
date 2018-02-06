<template>
  <div class="global-footer">
    <div v-if="links"
         class="links">
      <template v-for="link in links">
        <a :key="link.key"
           :target="link.blankTarget ? '_blank' : '_self'"
           :href="link.href">
          <template v-if="link.title">
            {{link.title}}
          </template>
          <template v-else-if="link.titleSlot">
            <slot :name="link.titleSlot"></slot>
          </template>
        </a>
      </template>
    </div>
    <div v-if="$slots.copyright"
         class="copyright">
      <slot name="copyright"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    links: {
      type: Array
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.global-footer {
  padding: 0 16px;
  margin: 48px 0 24px 0;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: $text-color-secondary;
      transition: all 0.3s;

      &:not(:last-child) {
        margin-right: 40px;
      }

      &:hover {
        color: $text-color;
      }
    }
  }

  .copyright {
    color: $text-color-secondary;
    font-size: $font-size-base;
  }
}
</style>
