<script lang="ts">
import Vue, { VNode } from 'vue'
import { Table, TableColumn, Pagination, Checkbox } from 'element-ui'

import ElTableWrapper from 'el-table-wrapper'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Checkbox)
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
  methods: {
    handleRowSelectChange(selectedRows: any[]) {
      this.$emit('select-row', selectedRows)
    }
  },
  render(h: any): VNode {
    const { data, columns } = this
    const { list, pagination } = data

    const columnsProps = [
      {
        type: 'selection'
      }
    ].concat(columns)

    const paginationProps = {
      layout: 'prev, pager, next, sizes, jumper',
      background: true,
      ...pagination
    }

    return h('div', { class: 'standard-table' }, [
      h('el-table-wrapper', {
        props: {
          columns: columnsProps,
          data: list,
          pagination: paginationProps
        },
        on: {
          'selection-change': this.handleRowSelectChange
        },
        scopedSlots: this.$scopedSlots
      })
    ])
  }
})
</script>

<style lang="scss">

</style>
