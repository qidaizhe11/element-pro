<template>
  <el-container class="app-container">
    <el-aside width="256px" class="sider">
      <div class="logo">
        <router-link to="/">
          <img :src="logo" alt="logo" />
          <h1>Element UI Pro</h1>
        </router-link>
      </div>
      <el-menu mode="vertical" theme="dark">
        <sidebar-item :menus="navMenuItems">
        </sidebar-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>

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

    return {
      logo,
      menus,
      navMenuItems
    }
  },
  mounted() {
    this.navMenuItems = this.getNavMenuItems(this.menus)
  },
  components: {
    SidebarItem
  },
  methods: {
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
@import "~theme/theme.scss";

.app-container {
  position: relative;
  height: 100%;
}

.sider {
  // height: 100%;
  min-height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
  position: relative;
  z-index: 10;
  background-color: $sider-fill;
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
</style>

