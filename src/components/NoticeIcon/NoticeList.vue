<template>
  <div>
    <ep-list class="list">
      <template v-for="(item, i) in data">
        <ep-list-item :key="i" class="item">
          <ep-list-item-meta slot="meta" class="meta">
            <avatar slot="avatar" class="avatar" :src="item.avatar"></avatar>
            <div slot="title" class="title">
              {{item.title}}
            </div>
            <div slot="description">
              <div class="description">{{item.description}}</div>
              <div class="datetime">{{item.datetime}}</div>
            </div>
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
@import '~theme/theme.scss';
.list {
  max-height: 400px;
  overflow: auto;
  .item {
    transition: all 0.3s;
    overflow: hidden;
    cursor: pointer;
    padding-left: 24px;
    padding-right: 24px;

    &:last-child {
      border-bottom: 0;
    }
    &:hover {
      background: $primary-1;
    }

    .meta {
      width: 100%;
    }
    .avatar {
      background: #fff;
      margin-top: 4px;
    }
    .title {
      font-weight: normal;
      margin-bottom: 8px;
    }
    .description {
      font-size: 12px;
      line-height: $line-height-base;
    }
    .datetime {
      font-size: 12px;
      margin-top: 4px;
      line-height: $line-height-base;
    }
  }
}
</style>
