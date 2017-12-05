<template>
  <el-container class="app-container">
    <el-aside :width="siderWidth" :class="{'sider': true, 'collapse': collapse}">
      <div class="logo">
        <router-link to="/">
          <img :src="logo" alt="logo" />
          <h1>Element UI Pro</h1>
        </router-link>
      </div>
      <side-menu :menus="menus" :selected-key="selectedKey" :open-keys="openKeys"
        :collapse="collapse"></side-menu>
    </el-aside>
    <el-container>
      <el-header height="64px" class="header">
        <ant-icon :type="collapse ? 'menuunfold' : 'menufold'" class="trigger"
          @click="toggle" />
        <div class="right">
          <header-search class="action search" placeholder="站内搜索" v-model="searchValue"
            :data="suggestionData" @select="onSearchSelect">
          </header-search>
          <notice-icon class="action">
          </notice-icon>
          <el-dropdown class="action">
            <span class="account">
              <avatar class="avatar" size="small" :src="currentUser.avatar"
              /> {{currentUser.name}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled>个人中心</el-dropdown-item>
              <el-dropdown-item disabled>设置</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  Container,
  Aside,
  Header,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Main
} from 'element-ui'
import { debounce } from 'lodash'

import { getRouteData, navData } from 'router'
import logo from 'assets/logo.png'

import SideMenu from './SideMenu.vue'

import Avatar from 'components/Avatar/index.vue'
import AntIcon from 'components/Icon/AntIcon.vue'
import HeaderSearch from 'components/HeaderSearch/index.vue'
import NoticeIcon from 'components/NoticeIcon/index.vue'

Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Main)

interface SubMenu {
  name: string
  key: string
  icon?: string
  children: any[] | null
}

interface MenuItem {
  name: string
  key: string
  icon?: string
  path: string
  target?: string
  externalLink: boolean
}

export default Vue.extend({
  name: 'BasicLayout',
  data() {
    const menus: any = navData.reduce((prev: any, current: any) => {
      return prev.concat(current.children)
    }, [])
    const openKeys: string[] = []

    const suggestionData = ['搜索提示一', '搜索提示二', '搜索提示三']

    return {
      menus,
      logo,
      selectedKey: '',
      openKeys,
      collapse: false,
      suggestionData,
      searchValue: '',
      currentUser: {
        name: 'Serati Ma',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/dRFVcIqZOYPcSNrlJsqQ.png'
      }
    }
  },
  computed: {
    siderWidth(): string {
      return this.collapse ? '64px' : '256px'
    }
  },
  watch: {
    collapse(value) {
      this.openKeys = this.getDefaultCollapsedSubMenus()
    },
    searchValue(value) {
      console.log('search input', value)
    }
  },
  created() {
    this.selectedKey = this.getCurrentMenuSelectedKey()
    this.openKeys = this.getDefaultCollapsedSubMenus()
  },
  components: {
    SideMenu,
    Avatar,
    AntIcon,
    HeaderSearch,
    NoticeIcon
  },
  methods: {
    onSearchSelect(value: string) {
      console.log('search select', value)
    },
    getDefaultCollapsedSubMenus(): string[] {
      const currentMenuSelectedKey = this.getCurrentMenuSelectedKey()
      let keys = currentMenuSelectedKey.split('/').slice(1)
      if (keys.length === 1 && keys[0] === '') {
        keys = [this.menus[0].key]
      }
      keys.splice(-1, 1)
      let tempKey = ''
      const menuKeys = keys.map(key => {
        tempKey += `/${key}`
        return tempKey
      })
      return menuKeys
    },
    getCurrentMenuSelectedKey(): string {
      const path = this.$route.path
      if (!path) {
        return this.menus[0].key
      }
      return path
    },
    toggle() {
      this.collapse = !this.collapse
      debounce(this.triggerResizeEvent, 600)
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

.app-container {
  position: relative;
  height: 100%;
}

.header {
  padding: 0 12px 0 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
}

.sider {
  // height: 100%;
  min-height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  position: relative;
  z-index: 10;
  background-color: $sider-fill;
  transition: all 0.3s;

  &.collapse {
    overflow: inherit;
  }
}

.sider.collapse {
  .logo {
    padding-left: 16px;
  }
}

.logo {
  height: 64px;
  position: relative;
  line-height: 64px;
  padding-left: 24px;
  transition: all 0.3s;
  background: #002140;
  overflow: hidden;
  img {
    display: inline-block;
    vertical-align: middle;
    height: 32px;
  }
  h1 {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    margin: 0 0 0 12px;
    // font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
  }
}

.trigger {
  font-size: 20px;
  line-height: 64px;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0 24px;
  &:hover {
    background: $color-primary-1;
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
    &:hover {
      background: $color-primary-1;
    }
  }
  .search {
    padding: 0;
    margin: 0 12px;
    &:hover {
      background: transparent;
    }
  }
  .account {
    .avatar {
      margin: 20px 8px 20px 0;
      color: $color-primary;
      background: rgba(255, 255, 255, 0.85);
      vertical-align: middle;
    }
  }
}
</style>

