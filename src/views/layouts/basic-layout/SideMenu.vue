<script lang="ts">
import Vue, { VNode } from 'vue'

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
          return h('el-submenu', {
            props: {
              index: key
            },
            key: key
          }, [
            h('div', {
              slot: 'title'
            }, [
              item.icon && h('i', { class: item.icon }),
              h('span', { slot: 'title' }, item.name)
            ])
          ].concat(this.getNavMenuItems(h, item.children, itemPath)))
        }
        return h('el-menu-item', {
          props: {
            index: key
          }
        }, [
          item.icon && h('i', { class: item.icon }),
          h('span', { slot: 'title' }, item.name)
        ])
      })
    }
  },
  render(h): VNode {
    return h('el-menu', {
      props: {
        mode: 'vertical',
        'unique-opened': true,
        'collapse': true,
        'default-active': this.selectedKey,
        'default-openeds': this.openKeys
      }
    }, this.getNavMenuItems(h, this.menus))
  }
})
</script>
