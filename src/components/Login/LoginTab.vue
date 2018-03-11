
<script lang="ts">
import Vue, { VNode } from 'vue'
import Component from 'vue-class-component'
import { Inject } from 'vue-property-decorator'
import { TabPane } from 'element-ui'

Vue.use(TabPane)

const generateId = (() => {
  let i = 0
  return (prefix = '') => {
    i += 1
    return `${prefix}${i}`
  }
})()

@Component
export default class LoginTab extends Vue {
  static _ANT_PRO_LOGIN_TAB: boolean = true

  uniqueId: string = generateId('login-tab-')

  @Inject('login') login: any

  beforeMount() {
    if (this.login) {
      this.login.addTab(this.uniqueId)
    }
  }

  render(h: any): VNode {
    return h(
      'el-tab-pane',
      {
        props: this.$attrs,
        on: this.$listeners
      },
      this.$slots.default
    )
  }
}
</script>

<style lang="scss" scoped>

</style>
