
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
        h(
          'el-row',
          {
            gutter: gutter
          },
          this.$slots.default
        )
      ]
    )
  }
}
</script>

<style lang="scss">
@import '~theme/theme.scss';

.description-list {
  /deep/ .el-row {
    margin-bottom: -16px;
    overflow: hidden;
  }

  .title {
    font-size: 14px;
    color: $heading-color;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .term {
    line-height: 22px;
    padding-bottom: 16px;
    margin-right: 8px;
    color: $heading-color;
    white-space: nowrap;
    display: table-cell;

    &:after {
      content: ':';
      margin: 0 8px 0 2px;
      position: relative;
      top: -0.5px;
    }
  }

  .detail {
    line-height: 22px;
    width: 100%;
    padding-bottom: 16px;
    color: $text-color;
    display: table-cell;
  }

  &.small {
    // offset the padding-bottom of last row
    /deep/ .el-row {
      margin-bottom: -8px;
      overflow: hidden;
    }
    .title {
      margin-bottom: 12px;
      color: $text-color;
    }
    .term,
    .detail {
      padding-bottom: 8px;
    }
  }

  &.large {
    .title {
      font-size: 16px;
    }
  }

  &.vertical {
    .term {
      padding-bottom: 8px;
      display: block;
    }

    .detail {
      display: block;
    }
  }
}
</style>
