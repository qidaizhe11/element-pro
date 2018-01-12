
<script lang="ts">
import Vue from 'vue'
export default Vue.component('ant-icon', {
  functional: true,
  props: {
    type: {
      type: String,
      required: true
    }
  },
  render: function(h, context) {
    return h('i', {
      'class': {
        'anticon': true,
        [`icon-${context.props.type}`]: true,
        [context.data.staticClass || '']: context.data.staticClass
      },
      on: context.data.on
    })
  }
})
</script>
