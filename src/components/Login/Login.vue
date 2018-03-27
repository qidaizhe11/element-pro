
<script lang="ts">
import Vue, { VNode } from 'vue'
import Component from 'vue-class-component'
import { Provide } from 'vue-property-decorator'
import { Tabs, Form } from 'element-ui'

Vue.use(Tabs)
Vue.use(Form)

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

  form: any = {}
  active: any = {}
  type: string = this.defaultActiveKey

  @Provide('login') login = this

  updateForm(name: string, value: any) {
    this.form[name] = value || ''
  }

  updateActive(activeItem: string) {
    const { type, active } = this
    if (active[type]) {
      active[type].push(activeItem)
    } else {
      // active[type] = [activeItem]
      Vue.set(active, type, [activeItem])
    }
  }

  onSwitch(type: string) {
    this.type = type
    this.$emit('tab-change', type)
  }

  handleSubmit(e: any) {
    e.preventDefault()
    const formRef: any = this.$refs.form
    formRef.validate((valid: boolean) => {
      this.$emit('submit', !valid, this.form)
    })
  }

  renderTabs() {
    const { type } = this
    return this.$createElement(
      'div',
      [
        this.$createElement(
          'el-tabs',
          {
            class: 'tabs',
            props: {
              value: this.type
            },
            on: {
              tabClick: this.onSwitch
            }
          },
          this.$slots.tab
        )
      ].concat(this.$slots.default)
    )
  }

  render(h: any): VNode {
    return h(
      'div',
      {
        class: 'login'
      },
      [
        h(
          'el-form',
          {
            ref: 'form',
            props: {
              model: this.form
            },
            nativeOn: {
              submit: this.handleSubmit
            }
          },
          [this.$slots.tab ? [this.renderTabs()] : this.$slots.default]
        )
      ]
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
    /deep/ .el-tabs__item {
      font-size: 16px;
      line-height: 24px;
    }
    /deep/ .el-tabs__nav-scroll {
      display: flex;
      justify-content: center;
    }
    /deep/ .el-tabs__header {
      border-bottom: 0;
      margin-bottom: 24px;
      text-align: center;
    }
    /deep/ .el-tabs__nav-wrap::after {
      height: 0;
    }
    .ant-input-affix-wrapper .ant-input:not(:first-child) {
      padding-left: 34px;
    }
  }

  /deep/ .el-form-item {
    margin-bottom: 24px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
  }
}
</style>
