<template>
  <div class="wrapper" :class="{ 'popover-open': popoverOpen }">
    <el-popover ref="notice-popover" v-model="popoverOpen" popper-class="notice-popover"
      placement="bottom-end" :offset="-3">
      <el-tabs class="tabs" v-model="activeTab" @tab-click="onTabChange">
        <template v-for="tab in tabOptions">
          <el-tab-pane class="tab-pane" :key="tab.title" :label="tab.titleShow"
            :name="tab.title">
            <!-- {{tab.emptyText}} -->
            <notice-list :data="noticeList" title="通知"></notice-list>
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-popover>

    <div class="noticeButton" v-popover:notice-popover>
      <el-badge :value="13" class="badge">
        <i class="el-icon-bell"></i>
      </el-badge>
    </div>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import { Badge, Popover, Button, Tabs, TabPane } from 'element-ui'

import NoticeList from './NoticeList.vue'

Vue.use(Badge)
Vue.use(Popover)
Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)

export default Vue.extend({
  data() {
    const activeTab =
      this.tabs && this.tabs.length > 0 ? this.tabs[0].title : ''

    const noticeList = [
      {
        id: '000000001',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '你收到了 14 份新周报',
        datetime: '2017-08-09',
        type: '通知'
      },
      {
        id: '000000002',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: '你推荐的 曲妮妮 已通过第三轮面试',
        datetime: '2017-08-08',
        type: '通知'
      },
      {
        id: '000000003',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: '这种模板可以区分多种通知类型',
        datetime: '2017-08-07',
        read: true,
        type: '通知'
      }
    ]
    return {
      popoverOpen: false,
      activeTab,
      noticeList
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
  components: {
    NoticeList
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
  width: 336px;
  padding: 4px 0 0 0;

  &[x-placement^='bottom'] {
    margin-top: -8px;
  }
}
</style>

<style lang="scss" scoped>
.noticeButton {
  width: 100%;
  height: 100%;
  padding: 0 12px;

  display: flex;
  align-items: center;

  transition: all 0.3s;
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

  /deep/ .el-tabs__header {
    margin-bottom: 4px;
  }
}
</style>


