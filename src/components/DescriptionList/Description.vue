<script lang="ts">
import Vue, { VNode } from 'vue'
import Component from 'vue-class-component'
import { Inject } from 'vue-property-decorator'
import { Col } from 'element-ui'

import responsive from './responsive'

Vue.use(Col)

@Component({
  props: {
    term: {
      type: String,
      default: ''
    }
  }
})
export default class Description extends Vue {
  term: string

  @Inject('list') list: any

  render(h: any): VNode {
    const { term } = this
    const col = this.list.col
    const column: string = col && col > 4 ? 4 : col
    return h(
      'el-col',
      {
        class: 'description',
        props: {
          ...responsive[column],
          ...this.$attrs
        }
      },
      [
        (term || this.$slots.term) &&
          h('div', { class: 'term' }, term || this.$slots.term),
        this.$slots.default &&
          h('div', { class: 'detail' }, this.$slots.default)
      ]
    )
  }
}
</script>
