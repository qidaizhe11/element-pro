
<script lang="ts">
import Vue, { VNode } from 'vue'
import Component from 'vue-class-component'

import CheckPermissions, { pass } from './CheckPermissions'

@Component({
  props: {
    authority: String
  }
})
export default class Authorized extends Vue {
  static check: any = CheckPermissions
  static pass: any = pass

  authority: string

  render(h: any): VNode {
    const slots = this.$slots
    const children =
      slots.default && slots.default.length > 0 ? slots.default[0] : null
    const noMatch =
      slots.noMatch && slots.noMatch.length > 0 ? slots.noMatch[0] : null
    return CheckPermissions(this.authority, children, noMatch) || h()
  }
}
</script>
