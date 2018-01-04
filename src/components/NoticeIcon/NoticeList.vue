<template>
  <div>
    <ep-list>
      <template v-for="(item, i) in data">
        <ep-list-item :key="i">
          <ep-list-item-meta slot="meta" :title="item.title" description="这是描述">
            <avatar slot="avatar" class="avatar" src=""></avatar>
          </ep-list-item-meta>
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
