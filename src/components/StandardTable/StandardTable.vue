<script lang="ts">
import Vue, { VNode } from 'vue'
import { Table, TableColumn, Pagination } from 'element-ui'

import ElTableWrapper from 'el-table-wrapper'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(ElTableWrapper)

export default Vue.extend({
  props: {
    columns: Array,
    data: {
      type: Object,
      default() {
        return {
          list: [],
          pagination: {}
        }
      }
    }
  },
  render(h: any): VNode {
    const { data, columns } = this
    const { list, pagination } = data

    return h('div', { class: 'standard-table' }, [
      h('el-table-wrapper', {
        props: {
          columns,
          data: list
        },
        scopedSlots: this.$scopedSlots
      })
    ])
  }
})
</script>

<style lang="scss">

</style>
