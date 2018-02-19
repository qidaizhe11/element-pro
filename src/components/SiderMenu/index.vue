
<script lang="ts">
import Vue, { VNode } from 'vue'
import { Aside, Menu } from 'element-ui'
Vue.use(Aside)
Vue.use(Menu)

export default Vue.extend({
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    menuData: {
      type: Array,
      default() {
        return []
      }
    },
    logo: String
  },
  methods: {
    getNavMenuItems(menusData: any[]) {
      if (!menusData) {
        return []
      }
    }
  },
  render(h): VNode {
    const { collapsed, logo } = this
    return h('el-aside', {
      class: {
        'sider': true,
        'collapse': collapsed
      },
      props: {
        width: collapsed ? '64px' : '256px'
      }
    }, [
      h('div', {
        class: 'logo'
      }, [
        h('router-link', {
          props: {
            to: '/'
          }
        }, [
          h('img', {
            attrs: {
              alt: 'logo',
              src: logo
            }
          }),
          h('h1', 'Element UI Pro')
        ])
      ]),
      h('el-menu', {
        props: {
          mode: 'vertical',
          'unique-opened': true,
          collapse: collapsed
        },
        style: {
          padding: '16px 0'
        }
      },
      this.getNavMenuItems(this.menuData))
    ])
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

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
