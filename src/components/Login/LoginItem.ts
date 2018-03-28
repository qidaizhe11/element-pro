import Vue, { VNode } from 'vue'
import { Form, FormItem, Button, Row, Col } from 'element-ui'
import Component from 'vue-class-component'
import { Inject } from 'vue-property-decorator'

import map from './map'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)

function generator(context: {
  defaultProps: any
  defaultRules: any
  type: string
  component: string
}) {
  @Component({
    props: {
      prop: {
        type: String,
        default: ''
      }
    }
  })
  class LoginItem extends Vue {
    @Inject('login') login: any

    prop: string

    count: number = 0

    created() {
      this.login.updateForm(this.prop)
    }

    mounted() {
      const parent: any = this.$parent
      const parentName = parent && parent.name ? parent.name : ''
      this.login.updateActive(this.prop, parentName)
    }

    onInput(value: any) {
      this.login.updateForm(this.prop, value)
    }

    render(h: any): VNode {
      const { defaultProps, defaultRules, type, component } = context
      return h(
        'el-form-item',
        {
          props: {
            rules: defaultRules,
            prop: this.prop
          }
        },
        [
          h(component, {
            props: {
              ...defaultProps,
              ...this.$attrs
            },
            on: {
              input: this.onInput
            }
          })
        ]
      )
    }
  }

  return LoginItem
}

const LoginItem: any = {}

Object.keys(map).forEach(item => {
  LoginItem[item] = generator({
    defaultProps: map[item].props,
    defaultRules: map[item].rules,
    type: item,
    component: map[item].component
  })
})

export default LoginItem
