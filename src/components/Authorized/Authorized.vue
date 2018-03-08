
<script lang="ts">
import Vue, { VNode } from 'vue'

import CheckPermissions from './CheckPermissions'

export default Vue.extend({
  props: {
    authority: String
  },
  render(h): VNode {
    const slots = this.$slots
    const children =
      slots.default && slots.default.length > 0 ? slots.default[0] : null
    const noMatch =
      slots.noMatch && slots.noMatch.length > 0 ? slots.noMatch[0] : null
    return CheckPermissions(this.authority, children, noMatch) || h()
  }
})
</script>
