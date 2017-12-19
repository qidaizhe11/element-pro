
<script lang="ts">
import Vue from 'vue'

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
      return h('div', { class: 'ep-list-item-actions' }, children)
    }
  },
  render(h) {
    return h('div', { class: 'ep-list-item' }, [
      this.$slots.meta,
      h('div', { class: 'ep-list-item-content' }, this.$slots.default),
      this.renderActions(h)
    ])
  }
})
</script>

