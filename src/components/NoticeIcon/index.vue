<template>
  <div class="wrapper" :class="{ 'popover-open': popoverOpen }">
    <el-popover ref="notice-popover" v-model="popoverOpen" popper-class="notice-popover"
      placement="bottom-end" :offset="-3">
      <el-tabs class="tabs" v-model="activeTab" @tab-click="onTabChange">
        <template v-for="tab in tabOptions">
          <el-tab-pane class="tab-pane" :key="tab.title" :label="tab.titleShow"
            :name="tab.title">
            {{tab.emptyText}}
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-popover>

    <div class="noticeIcon" v-popover:notice-popover>
      <el-badge :value="13" class="badge">
        <i class="el-icon-bell"></i>
      </el-badge>
    </div>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import { Badge, Popover, Button, Tabs, TabPane } from 'element-ui'

Vue.use(Badge)
Vue.use(Popover)
Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)

export default Vue.extend({
  data() {
    const activeTab =
      this.tabs && this.tabs.length > 0 ? this.tabs[0].title : ''
    return {
      popoverOpen: false,
      activeTab
    }
  },
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    tabOptions(): any[] {
      return this.tabs.map(tab => {
        const titleShow =
          tab.list && tab.list.length > 0
            ? `${tab.title} (${tab.list.length})`
            : tab.title
        return {
          ...tab,
          titleShow
        }
      })
    }
  },
  methods: {
    onTabChange(tab: any, event: any) {
      console.log('NoticeIcon/index, onTabChange, tab:', tab, 'event:', event)
    }
  }
})
</script>

<style lang="scss">
.notice-popover {
  padding-top: 4px;

  &[x-placement^='bottom'] {
    margin-top: -8px;
  }
}
</style>

<style lang="scss" scoped>
.noticeIcon {
  width: 100%;
  height: 100%;
  padding: 0 12px;

  display: flex;
  align-items: center;
}

.badge {
  /deep/ .el-badge__content {
    z-index: 1;
  }
}

.tabs {
  /deep/ .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
  }
}
</style>


