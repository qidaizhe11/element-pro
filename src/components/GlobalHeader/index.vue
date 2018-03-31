<template>
  <div class="global-header">
    <ant-icon
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      class="trigger"
      @click="toggle"
    />
    <div class="right">
      <header-search
        class="action search"
        placeholder="站内搜索"
        v-model="searchValue"
        :data="['搜索提示一', '搜索提示二', '搜索提示三']"
        @select="onSearchSelect"
      />
      <notice-icon
        class="action notice"
        :tabs="noticeTabs"
      >
      </notice-icon>
      <el-dropdown 
        v-if="currentUser.name" 
        class="action"
        @command="onMenuClick"
      >
        <span class="action account">
          <avatar
            class="avatar"
            size="small"
            :src="currentUser.avatar"
          />
          <span class="name">{{currentUser.name}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>个人中心</el-dropdown-item>
          <el-dropdown-item disabled>设置</el-dropdown-item>
          <el-dropdown-item 
            divided 
            command="logout"
          >
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div v-else class="action loading-wrapper">
        <div class="loading" v-loading="true"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from 'lodash'
import { Loading } from 'element-ui'

import Avatar from 'components/Avatar/index.vue'
import AntIcon from 'components/AntIcon'
import HeaderSearch from 'components/HeaderSearch/index.vue'
import NoticeIcon from 'components/NoticeIcon/index.vue'

Vue.use(Loading)
Vue.use(AntIcon)

const noticeTabs = [
  {
    title: '通知',
    list: [
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
      },
      {
        id: '000000004',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '左侧图标用于区分不同的类型',
        datetime: '2017-08-07',
        type: '通知'
      },
      {
        id: '000000005',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '内容不要超过两行字，超出时自动截断',
        datetime: '2017-08-07',
        type: '通知'
      }
    ],
    emptyText: '你已查看所有通知',
    emptyImage:
      'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg'
  },
  {
    title: '消息',
    list: [
      {
        id: '000000006',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '曲丽丽 评论了你',
        description: '描述信息描述信息描述信息',
        datetime: '2017-08-07',
        type: '消息'
      },
      {
        id: '000000007',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '朱偏右 回复了你',
        description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
        datetime: '2017-08-07',
        type: '消息'
      },
      {
        id: '000000008',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '标题',
        description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
        datetime: '2017-08-07',
        type: '消息'
      }
    ],
    emptyText: '你已读完所有消息',
    emptyImage:
      'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg'
  }
]

export default Vue.extend({
  components: {
    Avatar,
    HeaderSearch,
    NoticeIcon
  },
  props: {
    currentUser: {
      type: Object,
      default() {
        return {}
      }
    },
    collapsed: {
      type: Boolean
    },
    fetchingNotices: {
      type: Array,
      default() {
        return []
      }
    },
    isMobile: Boolean,
    logo: String
  },
  data() {
    return {
      noticeTabs,
      searchValue: ''
    }
  },
  methods: {
    onSearchSelect(value: string) {
      console.log('search select', value)
    },
    onMenuClick(command: string) {
      this.$emit('menu-click', command)
    },
    toggle() {
      const { collapsed } = this
      this.$emit('collapse', !collapsed)
      debounce(this.triggerResizeEvent, 600)()
    },
    triggerResizeEvent() {
      const event = document.createEvent('HTMLEvents')
      event.initEvent('resize', true, false)
      window.dispatchEvent(event)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.global-header {
  height: 64px;
  padding: 0 12px 0 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  display: flex;
  justify-content: space-between;

  .trigger {
    font-size: 20px;
    line-height: 64px;
    cursor: pointer;
    transition: all 0.3s;
    padding: 0 24px;
    &:hover {
      background: $primary-1;
    }
  }
  .right {
    height: 100%;
    display: flex;

    .action {
      cursor: pointer;
      padding: 0 12px;
      transition: all 0.3s;
      height: 100%;
      display: flex;
      align-items: center;
      > i {
        font-size: 16px;
        vertical-align: middle;
      }
      &.popover-open,
      &:hover {
        background: $primary-1;
      }
    }
    .search {
      padding: 0;
      margin: 0 12px;
      &:hover {
        background: transparent;
      }
    }
    .notice {
      padding: 0;
    }
    .account {
      .avatar {
        margin: 20px 8px 20px 0;
        color: $primary-color;
        background: rgba(255, 255, 255, 0.85);
        vertical-align: middle;
      }
    }
    .loading-wrapper {
      .loading {
        width: 30px;
        height: 30px;

        /deep/ .el-loading-spinner {
          margin-top: -15px;
          .circular {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
}
</style>
