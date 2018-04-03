
<script lang="ts">
import Vue, { VNode } from 'vue'

export default Vue.component('ant-icon', {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  render: function(h: any): VNode {
    const { type } = this
    return h('i', {
      class: ['anticon', `anticon-${type}`],
      on: this.$listeners
    })
  }
})
</script>
