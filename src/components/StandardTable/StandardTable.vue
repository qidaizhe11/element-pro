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
  computed: {
    paginationProps(): any {
      const { pagination } = this.data
      const props = {
        layout: 'prev, pager, next, sizes, jumper',
        background: true,
        ...pagination
      }
      if (pagination.current) {
        props.currentPage = pagination.current
      }
      return props
    }
  },
  methods: {
    handleRowSelectChange(selectedRows: any[]) {
      this.$emit('select-row', selectedRows)
    }
  },
  render(h: any): VNode {
    const { columns, paginationProps } = this
    const { list } = this.data

    const columnsProps = [
      {
        type: 'selection'
      }
    ].concat(columns)

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
