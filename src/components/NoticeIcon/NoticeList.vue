<template>
  <div>
    <ep-list>
      <template v-for="(item, i) in data">
        <ep-list-item :key="i">
          <ep-list-item-meta slot="meta" title="hehe" description="这是描述">
            <avatar slot="avatar" class="avatar" src=""></avatar>
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
import EpList from 'components/List/index.vue'
import EpListItem from 'components/List/ListItem.vue'
import EpListItemMeta from 'components/List/ListItemMeta.vue'

import Avatar from 'components/Avatar/index.vue'

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
    EpListItemMeta,
    Avatar
  }
})
</script>

<style lang="scss" scoped>



</style>
