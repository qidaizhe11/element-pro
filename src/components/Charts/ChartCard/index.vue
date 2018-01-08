<template>
  <ll-card :body-style="{padding: '20px 24px 8px 24px'}">
    <div class="chart-card">
      <div class="chart-top">
        <div class="meta-wrap">
          <div class="meta">
            <span class="title">{{title}}</span>
            <span class="action">
              <slot name="action"></slot>
            </span>
          </div>
        </div>
      </div>
    </div>
  </ll-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Card } from 'element-ui'

import LlCard from 'components/Card/index.vue'

Vue.use(Card)

export default Vue.extend({
  components: {
    LlCard
  },
  props: {
    title: ''
  },
  data() {
    return {

    }
  }
})
</script>

<style lang="scss" scoped>

</style>

