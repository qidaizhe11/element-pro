
<script lang="ts">
import Vue, { VNode } from 'vue'

export default Vue.extend({
  data() {
    return {}
  },
  methods: {
    renderActions(h: any): any {
      const actions = this.$slots.action
      if (!actions || !(actions.length > 0)) {
        return null
      }
      const children = actions.map((item: any, i) => {
        return h('li', { key: `ep-list-item-action-${i}` }, [
          item,
          i !== actions.length - 1 &&
            h('em', { class: 'ep-list-item-action-split' })
        ])
      })
      return h('div', { class: 'ep-list-item-action' }, children)
    }
  },
  render(h): VNode {
    const content = this.$slots.default ? h(
      'div',
      { class: 'ep-list-item-content' },
      this.$slots.default
    ) : null
    const meta = this.$slots.meta
    const extra = this.$slots.extra
    const actions = this.renderActions(h)

    const extraContent = h('div', { class: 'ep-list-item-extra-wrapper' }, [
      h('div', { class: 'ep-list-item-main' }, [meta, content, actions]),
      h('div', { class: 'ep-list-item-extra' }, extra)
    ])

    if (extra) {
      return h('div', { class: 'ep-list-item' }, [extraContent])
    }
    return h('div', { class: 'ep-list-item' }, [meta, content, actions])
  }
})
</script>

