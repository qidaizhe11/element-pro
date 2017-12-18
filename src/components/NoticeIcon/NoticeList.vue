<template>
  <div>
    <ep-list>
      <template v-for="(item, i) in data">
        <ep-list-item :key="i">
          <span>{{item.title}}</span>
          <div slot="action">
            <a>edit</a>
          </div>
          <div slot="action">
            <a>delete</a>
          </div>
        </ep-list-item>
      </template>
    </ep-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EpList from '../List/index.vue'
import EpListItem from '../List/ListItem.vue'

export default Vue.extend({
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    EpList,
    EpListItem
  }
})
</script>

<style lang="scss" scoped>



</style>
