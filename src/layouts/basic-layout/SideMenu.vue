<script lang="ts">
import Vue, { VNode } from 'vue'
import { Menu, MenuItem, Submenu } from 'element-ui'

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)

export default Vue.extend({
  props: {
    menus: {
      type: Array,
      default() {
        return []
      }
    },
    selectedKey: {
      type: String,
      default: ''
    },
    openKeys: {
      type: Array,
      default() {
        return []
      }
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getNavMenuItems(h: any, menus: any[], parentPath = ''): any[] {
      if (!menus) {
        return []
      }
      return menus.map((item: any) => {
        if (!item.name) {
          return null
        }
        let itemPath = ''
        if (item.path.indexOf('http') === 0) {
          itemPath = item.path
        } else {
          itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/')
        }
        const key = item.key || itemPath
        if (item.children && item.children.some((child: any) => child.name)) {
          return h(
            'el-submenu',
            {
              props: {
                index: key
              },
              key: key,
              scopedSlots: {
                title: (props: any) => {
                  return [
                    item.icon && h('i', { class: item.icon }),
                    h('span', { slot: 'title' }, item.name)
                  ]
                }
              }
            },
            this.getNavMenuItems(h, item.children, itemPath)
          )
        }

        const elMenuItem = h(
          'el-menu-item',
          {
            props: {
              index: key
            }
          },
          [
            item.icon && h('i', { class: item.icon }),
            h('span', { slot: 'title' }, item.name)
          ]
        )

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
      })
    }
  },
  render(h): VNode {
    return h(
      'el-menu',
      {
        props: {
          mode: 'vertical',
          'unique-opened': true,
          collapse: this.collapse,
          'default-active': this.selectedKey,
          'default-openeds': this.openKeys
        },
        style: {
          padding: '16px 0'
        }
      },
      this.getNavMenuItems(h, this.menus)
    )
  }
})
</script>
