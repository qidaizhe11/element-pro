<template>
  <div class="global-footer">
    <div v-if="links"
         class="links">
      <template v-for="link in links">
        <a :key="link.key"
           :target="link.blankTarget ? '_blank' : '_self'"
           :href="link.href">
          {{link.href}}
        </a>
      </template>
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

</style>

