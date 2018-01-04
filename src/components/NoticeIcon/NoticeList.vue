<template>
  <div>
    <ep-list class="list">
      <template v-for="(item, i) in data">
        <ep-list-item :key="i" class="item">
          <ep-list-item-meta slot="meta" class="meta" :title="item.title" :description="item.datetime">
            <avatar slot="avatar" class="avatar" :src="item.avatar"></avatar>
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
.list {
  max-height: 400px;
  overflow: auto;
  .item {
    transition: all 0.3s;
    overflow: hidden;
    cursor: pointer;
    padding-left: 24px;
    padding-right: 24px;

    .meta {
      width: 100%;
    }

    .avatar {
      background: #fff;
      margin-top: 4px;
    }
  }
}
</style>
