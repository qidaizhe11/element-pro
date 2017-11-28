<template>
  <el-container class="app-container">
    <el-aside width="64px" class="sider collapse">
      <div class="logo">
        <router-link to="/">
          <img :src="logo" alt="logo" />
          <h1>Element UI Pro</h1>
        </router-link>
      </div>
      <!-- <el-menu mode="vertical" :default-active="selectedKey" :default-openeds="openKeys"
        :unique-opened="true" :collapse="true">
        <sidebar-item :menus="navMenuItems">
        </sidebar-item>
      </el-menu> -->
      <side-menu :menus="menus" :selected-key="selectedKey"
        :open-keys="openKeys"></side-menu>
    </el-aside>
    <el-container>
      <el-header height="64px" class="header">
        <ant-icon type='menufold' class="trigger" />
        <div class="right">
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
import { getRouteData, navData } from 'router'
import logo from 'assets/logo.png'

import SidebarItem from './SidebarItem.vue'
import SideMenu from './SideMenu.vue'

import Avatar from 'components/Avatar/index.vue'
import AntIcon from 'components/Icon/AntIcon.vue'

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
    const navMenuItems: any[] = []
    const openKeys: string[] = []

    return {
      menus,
      logo,
      navMenuItems,
      selectedKey: '',
      openKeys,
      currentUser: {
        name: 'Serati Ma',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/dRFVcIqZOYPcSNrlJsqQ.png'
      }
    }
  },
  created() {
    this.navMenuItems = this.getNavMenuItems(this.menus)
    this.selectedKey = this.getCurrentMenuSelectedKey()
    this.openKeys = this.getDefaultCollapsedSubMenus()
  },
  components: {
    SidebarItem,
    SideMenu,
    Avatar,
    AntIcon
  },
  methods: {
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
    getNavMenuItems(menusData: any[], parentPath = '') {
      if (!menusData) {
        return []
      }
      return menusData.map((item: any) => {
        if (!item.name) {
          return null
        }
        let itemPath = ''
        if (item.path.indexOf('http') === 0) {
          itemPath = item.path
        } else {
          itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/')
        }
        if (item.children && item.children.some((child: any) => child.name)) {
          const returnItem: SubMenu = {
            name: item.name,
            key: item.key || itemPath,
            icon: item.icon,
            children: this.getNavMenuItems(item.children, itemPath)
          }
          return returnItem
        }

        const returnItem: MenuItem = {
          name: item.name,
          key: item.key || itemPath,
          icon: item.icon,
          path: itemPath,
          target: item.target,
          externalLink: /^https?:\/\//.test(itemPath)
        }
        return returnItem
      })
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

  &.collapse {
    overflow: inherit;
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

