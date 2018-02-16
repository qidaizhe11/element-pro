<template>
  <el-container class="app-container">
    <el-aside :width="siderWidth"
              :class="{'sider': true, 'collapse': collapsed}">
      <div class="logo">
        <router-link to="/">
          <img :src="logo"
               alt="logo" />
          <h1>Element UI Pro</h1>
        </router-link>
      </div>
      <side-menu :menus="menus"
                 :selected-key="selectedKey"
                 :open-keys="openKeys"
                 :collapse="collapsed"></side-menu>
    </el-aside>
    <el-container>
      <el-header :style="{padding: 0}">
        <global-header
          :logo="logo"
          :current-user="currentUser"
          :collapsed="collapsed"
          @collapse="handleMenuCollapse"
        />
      </el-header>
      <el-main :style="{'padding-bottom': 0}">
        <router-view></router-view>
        <el-footer height="auto"
                   :style="{padding: 0, flex: '0 0 auto'}">
          <global-footer :links="footerLinks">
            <template slot="copyright">
              <div>
                Copyright
                <ant-icon type="copyright" /> 2018 Daizhe
              </div>
            </template>
            <template slot="github-slot">
              <ant-icon type="github" />
            </template>
          </global-footer>
        </el-footer>
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
  Main,
  Footer
} from 'element-ui'
import { debounce } from 'lodash'

import { getMenuData } from 'common/menu'
import logo from 'assets/logo.png'

import SideMenu from './SideMenu.vue'

import GlobalFooter from 'components/GlobalFooter/index.vue'
import GlobalHeader from 'components/GlobalHeader/index.vue'

Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Main)
Vue.use(Footer)

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

/**
 * 根据菜单取得重定向地址.
 */
const redirectData: any[] = []
const getRedirect = (item: any) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`
      })
      item.children.forEach((children: any) => {
        getRedirect(children)
      })
    }
  }
}
getMenuData().forEach(getRedirect)

export default Vue.extend({
  name: 'BasicLayout',
  components: {
    SideMenu,
    GlobalFooter,
    GlobalHeader
  },
  data() {
    // const menus: any = navData.reduce((prev: any, current: any) => {
    //   return prev.concat(current.children)
    // }, [])
    const menus: any[] = []
    const openKeys: string[] = []

    const footerLinks = [
      // {
      //   key: 'Element UI Pro',
      //   title: 'Element UI Pro',
      //   href: '',
      //   blankTarget: true
      // },
      {
        key: 'github',
        titleSlot: 'github-slot',
        href: 'https://github.com/element-pro/element-pro',
        blankTarget: true
      }
      // {
      //   key: 'Element UI',
      //   title: 'Element UI',
      //   href: 'http://element.eleme.io',
      //   blankTarget: true
      // }
    ]

    return {
      menus,
      logo,
      selectedKey: '',
      openKeys,
      collapsed: false,
      searchValue: '',
      footerLinks
    }
  },
  computed: {
    currentUser(): any {
      return this.$store.state.user.currentUser
    },
    siderWidth(): string {
      return this.collapsed ? '64px' : '256px'
    }
  },
  watch: {
    collapsed(value) {
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
  mounted() {
    this.$store.dispatch('user/fetchCurrent')
  },
  methods: {
    handleMenuCollapse(collapsed: boolean) {
      this.collapsed = collapsed
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
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.app-container {
  position: relative;
  height: 100%;
  background: $layout-body-background;
}

.sider {
  // height: 100%;
  min-height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  position: relative;
  z-index: 10;
  background-color: $layout-sider-background;
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
</style>

