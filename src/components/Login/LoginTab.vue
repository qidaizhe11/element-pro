
<script lang="ts">
import Vue, { VNode, RenderContext } from 'vue'
import { TabPane } from 'element-ui'

Vue.use(TabPane)

export default Vue.extend({
  functional: true,
  render(h: any, context: RenderContext): VNode {
    return h(
      'el-tab-pane',
      {
        props: context.props,
        on: context.data.on
      },
      context.children
    )
  }
})
</script>

<style lang="scss" scoped>

</style>
