<template>
  <el-container class="app-container">
    <sider-menu
      :collapsed="collapsed"
      :logo="logo"
      :menu-data="getMenuData()"
      :Authorized="getAuthrozed()"
    >
    </sider-menu>
    <el-container>
      <el-header
        :style="{padding: 0}"
        height="64px"
      >
        <global-header
          :logo="logo"
          :current-user="currentUser"
          :collapsed="collapsed"
          @collapse="handleMenuCollapse"
          @menu-click="handleMenuClick"
        />
      </el-header>
      <el-main
        :style="{'padding-bottom': 0}"
      >
        <router-view
          :breadcrumbNameMap="breadcrumbNameMap"
        />
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
              <ant-icon class="github-icon" type="github" />
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
import { getRouterData } from 'common/router'
import logo from 'assets/logo.png'
import Authorized from 'utils/Authorized'
import { getRoutes } from 'utils/utils'

import GlobalFooter from 'components/GlobalFooter'
import GlobalHeader from 'components/GlobalHeader/index.vue'
import SiderMenu from 'components/SiderMenu/index.vue'

Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Main)
Vue.use(Footer)
Vue.use(GlobalFooter)

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

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
const getBreadcrumbNameMap = (menuData: any, routerData: any) => {
  const result: any = {}
  const childResult: any = {}
  for (const i of menuData) {
    if (!routerData[i.path]) {
      result[i.path] = i
    }
    if (i.children) {
      Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData))
    }
  }
  return Object.assign({}, routerData, result, childResult)
}

export default Vue.extend({
  name: 'BasicLayout',
  components: {
    GlobalHeader,
    SiderMenu
  },
  data() {
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
        href: 'https://github.com/qidaizhe11/element-pro',
        blankTarget: true
      }
      // {
      //   key: 'Element UI',
      //   title: 'Element UI',
      //   href: 'http://element.eleme.io',
      //   blankTarget: true
      // }
    ]

    const breadcrumbNameMap = getBreadcrumbNameMap(
      getMenuData(),
      getRoutes('/', getRouterData())
    )

    return {
      logo,
      collapsed: false,
      searchValue: '',
      footerLinks,
      breadcrumbNameMap
    }
  },
  computed: {
    currentUser(): any {
      return this.$store.state.user.currentUser
    }
  },
  watch: {
    searchValue(value) {
      console.log('search input', value)
    }
  },
  mounted() {
    this.$store.dispatch('user/fetchCurrent')
  },
  methods: {
    handleMenuCollapse(collapsed: boolean) {
      this.collapsed = collapsed
    },
    handleMenuClick(command: string) {
      if (command === 'logout') {
        this.$store.dispatch('login/logout')
      }
    },
    getMenuData() {
      return getMenuData()
    },
    getAuthrozed() {
      return Authorized
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

.github-icon {
  font-size: 20px;
}
</style>
