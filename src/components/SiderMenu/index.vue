
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
    getMenuItem(h: any, item: any) {
      const elMenuItem = h(
        'el-menu-item',
        {
          props: {
            index: item.path
          }
        },
        [
          item.icon && h('i', { class: item.icon }),
          h('span', { slot: 'title' }, item.name)
        ]
      )

      const itemPath = this.conversionPath(item.path)
      if (/^https?:\/\//.test(itemPath)) {
        return h(
          'a',
          {
            attrs: {
              href: itemPath,
              target: item.target
            }
          },
          [elMenuItem]
        )
      } else {
        return h(
          'router-link',
          {
            props: {
              to: itemPath
            }
          },
          [elMenuItem]
        )
      }
    },
    getSubMenuOrItem(h: any, item: any) {
      if (item.children && item.children.some((child: any) => child.name)) {
        return h(
          'el-submenu',
          {
            props: {
              index: item.path
            },
            key: item.path,
            scopedSlots: {
              title: (props: any) => {
                // return [
                //   item.icon && h('i', { class: item.icon }),
                //   h('span', { slot: 'title' }, item.name)
                // ]
                return h('span', item.name)
              }
            }
          },
          [
            h(
              'template',
              {
                slot: 'title'
              },
              [
                item.icon && h('i', { class: item.icon }),
                h('span', item.name)
              ]
            )
          ].concat(this.getNavMenuItems(h, item.children))
        )
      } else {
        return this.getMenuItem(h, item)
      }
    },
    getNavMenuItems(h: any, menusData: any[]): any {
      if (!menusData) {
        return []
      }
      return menusData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => {
          return this.getSubMenuOrItem(h, item)
        })
    },
    // conversion Path
    // 转化路径
    conversionPath(path: string) {
      if (path && path.indexOf('http') === 0) {
        return path
      } else {
        return `/${path || ''}`.replace(/\/+/g, '/')
      }
    }
  },
  render(h): VNode {
    const { collapsed, logo } = this
    return h(
      'el-aside',
      {
        class: {
          sider: true,
          collapse: collapsed
        },
        style: {
          minWidth: collapsed ? '64px' : '256px',
          maxWidth: collapsed ? '64px' : '256px'
        }
      },
      [
        h(
          'div',
          {
            class: 'logo'
          },
          [
            h(
              'router-link',
              {
                props: {
                  to: '/'
                }
              },
              [
                h('img', {
                  attrs: {
                    alt: 'logo',
                    src: logo
                  }
                }),
                h('h1', 'Element UI Pro')
              ]
            )
          ]
        ),
        h(
          'el-menu',
          {
            props: {
              mode: 'vertical',
              'unique-opened': true,
              collapse: collapsed
            },
            style: {
              padding: '16px 0',
              // width: collapsed ? '64px' : '256px'
              width: '100%'
            }
          },
          this.getNavMenuItems(h, this.menuData)
        )
      ]
    )
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
    overflow: hidden;
  }

  /deep/ .el-menu {
    color: $menu-dark-color;
    background: $menu-dark-bg;
    border-right: 0;

    &-item {
      color: $menu-dark-color;
      i {
        color: $menu-dark-color;
      }
      &:hover {
        color: #fff;
        background: transparent;
        > a {
          color: #fff;
        }
        i {
          color: #fff;
        }
      }
      > a {
        color: $menu-dark-color;
        text-decoration: none;
        outline: none;
      }
      &.is-active {
        color: #fff;
        background-color: #1890ff;
        > a {
          color: #fff;
        }
        i {
          color: inherit;
        }
      }
    }

    .el-submenu {
      &__title {
        color: $menu-dark-color;
        > i {
          color: $menu-dark-color;
        }
        &:hover {
          color: #fff;
          background-color: transparent;
          > i {
            color: #fff;
          }
        }

        &__icon-arrow {
          margin-top: -4px;
        }
      }

      &.is-active {
        > .el-submenu__title {
          color: #fff;
          > i {
            color: #fff;
          }
        }
      }
    }
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
