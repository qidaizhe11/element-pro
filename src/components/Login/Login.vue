
<script lang="ts">
import Vue, { VNode } from 'vue'
import Component from 'vue-class-component'
import { Provide } from 'vue-property-decorator'
import { Tabs } from 'element-ui'

Vue.use(Tabs)

@Component({
  props: {
    defaultActiveKey: {
      type: String,
      default: ''
    }
  }
})
export default class Login extends Vue {
  defaultActiveKey: string

  tabs: any[] = []
  active: any = {}
  type: string = this.defaultActiveKey

  @Provide('login') login = this

  addTab(id: string) {
    this.tabs.push(id)
  }

  removeTab(id: string) {
    this.tabs = this.tabs.filter(currentId => currentId !== id)
  }

  render(h: any): VNode {
    const { tabs, type } = this
    return h(
      'div',
      {
        class: 'login'
      },
      this.$slots.tab
        ? [
            h('div', [
              h(
                'el-tabs',
                {
                  class: 'tabs',
                  props: {
                    value: type
                  }
                },
                this.$slots.tab
              )
            ].concat(this.$slots.default))
          ]
        : this.$slots.default
    )
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.login {
  .tabs {
    padding: 0 2px;
    margin: 0 -2px;
    .ant-tabs-tab {
      font-size: 16px;
      line-height: 24px;
    }
    .ant-input-affix-wrapper .ant-input:not(:first-child) {
      padding-left: 34px;
    }
  }

  .ant-tabs .ant-tabs-bar {
    border-bottom: 0;
    margin-bottom: 24px;
    text-align: center;
  }

  .ant-form-item {
    margin-bottom: 24px;
  }

  .prefixIcon {
    font-size: $font-size-base;
    color: $disabled-color;
  }

  .getCaptcha {
    display: block;
    width: 100%;
  }

  .submit {
    width: 100%;
    margin-top: 24px;
  }
}
</style>
