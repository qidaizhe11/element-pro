
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
    }
  },
  render(h): VNode {
    const { collapsed } = this
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
              src: ''
            }
          })
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
      })
    ])
  }
})
</script>

<style lang="scss" scoped>

</style>
