<script lang="ts">
import Vue, { VNode } from 'vue'

import { AntIcon } from '../AntIcon'

export default Vue.extend({
  components: {
    AntIcon
  },
  props: {
    title: String,
    description: String,
    type: String
  },
  methods: {
    renderIcon() {
      const { type } = this
      if (type === 'error') {
        return this.$createElement('ant-icon', {
          class: 'error',
          props: {
            type: 'close-circle'
          }
        })
      }
      if (type === 'success') {
        return this.$createElement('ant-icon', {
          class: 'success',
          props: {
            type: 'check-circle'
          }
        })
      }
      return this.$createElement()
    }
  },
  render(h: any): VNode {
    const { title, description } = this
    return h(
      'div',
      {
        class: 'result',
        props: this.$attrs,
        on: this.$listeners
      },
      [
        h('div', { class: 'icon' }, [this.renderIcon()]),
        h('div', { class: 'title' }, title || this.$slots.title),
        (description || this.$slots.description) &&
          h(
            'div',
            { class: 'description' },
            description || this.$slots.description
          ),
        this.$slots.extra && h('div', { class: 'extra' }, this.$slots.extra),
        this.$slots.actions &&
          h('div', { class: 'actions' }, this.$slots.actions)
      ]
    )
  }
})
</script>

<style lang="scss">
@import '~theme/theme.scss';

.result {
  text-align: center;
  width: 72%;
  margin: 0 auto;

  .icon {
    font-size: 72px;
    line-height: 72px;
    margin-bottom: 24px;

    & > .success {
      color: $success-color;
    }

    & > .error {
      color: $error-color;
    }
  }

  .title {
    font-size: 24px;
    color: $heading-color;
    font-weight: 500;
    line-height: 32px;
    margin-bottom: 16px;
  }

  .description {
    font-size: 14px;
    line-height: 22px;
    color: $text-color-secondary;
    margin-bottom: 24px;
  }

  .extra {
    background: #fafafa;
    padding: 24px 40px;
    border-radius: $border-radius-sm;
    text-align: left;
  }

  .actions {
    margin-top: 32px;

    button:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>
