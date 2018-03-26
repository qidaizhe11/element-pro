import Vue, { VNode } from 'vue'
import { Form, FormItem, Button, Row, Col } from 'element-ui'

import map from './map'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)

function generator(context: {
  defaultProps: any
  defaultRules: any
  type: string,
  component: string
}) {
  return Vue.extend({
    props: {
      name: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        count: 0
      }
    },
    render(h): VNode {
      const { defaultProps, defaultRules, type, component } = context
      return h('el-form-item', {
        props: {
          rules: defaultRules,
          prop: this.name
        }
      }, [
        h(component, {
          props: {
            ...defaultProps,
            ...this.$attrs
          }
        })
      ])
    }
  })
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
