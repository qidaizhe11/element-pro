
<script lang="ts">
import Vue, { VNode } from 'vue'
import Component from 'vue-class-component'
import { Provide } from 'vue-property-decorator'
import { Row } from 'element-ui'

Vue.use(Row)

@Component({
  props: {
    title: String,
    col: {
      type: Number,
      default: 3
    },
    layout: {
      type: String,
      default: 'horizontal'
    },
    gutter: {
      type: Number,
      default: 5
    },
    size: String
  }
})
export default class DescriptionList extends Vue {
  title: string
  col: number
  layout: string
  gutter: number
  size: string

  @Provide('list') list = this

  render(h: any): VNode {
    const { title, layout, gutter, size } = this
    return h(
      'div',
      {
        class: {
          'description-list': true,
          layout: true,
          small: size === 'small',
          large: size === 'large'
        },
        props: this.$attrs,
        on: this.$listeners
      },
      [
        (title || this.$slots.title) &&
          h('div', { class: 'title' }, title || this.$slots.title),
        h('el-row', {
          gutter: gutter
        }, this.$slots.default)
      ]
    )
  }
}
</script>

<style lang="scss" scoped>

</style>
