<template>
  <div>
    <ep-list>
      <template v-for="(item, i) in data">
        <ep-list-item :key="i">
          <ep-list-item-meta slot="meta" title="hehe">
            <img slot="avatar" src="">
          </ep-list-item-meta>
          <span>{{item.title}}</span>
          <a slot="action">edit</a>
          <a slot="action">delete</a>
        </ep-list-item>
      </template>
    </ep-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EpList from '../List/index.vue'
import EpListItem from '../List/ListItem.vue'
import EpListItemMeta from '../List/ListItemMeta.vue'

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
    EpListItem,
    EpListItemMeta
  }
})
</script>

<style lang="scss" scoped>



</style>
