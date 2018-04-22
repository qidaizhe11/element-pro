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
  data() {
    const filters: any = {}
    return {
      pagination: {},
      filters,
      sorter: ''
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
    },
    columnsProps(): any {
      const { columns } = this
      return [
        {
          type: 'selection'
        }
      ].concat(columns)
    }
  },
  methods: {
    handleRowSelectChange(selectedRows: any[]) {
      this.$emit('select-row', selectedRows)
    },
    handlePaginationChange(pagination: any) {
      // this.$emit('pagination-change', pagination)
      this.$emit('change', pagination, this.filters, this.sorter)
      this.pagination = pagination
    },
    handleSortChange(sorter: any) {
      // this.$emit('sorter-change', sorter)
      this.$emit('change', this.paginationProps, this.filters, sorter)
      this.sorter = sorter
    },
    handleFilterChange(filters: any) {
      // this.$emit('filter-change', filters)
      this.$emit('change', this.paginationProps, filters, this.sorter)
      this.filters = filters
    }
  },
  render(h: any): VNode {
    const { columns, paginationProps, columnsProps } = this
    const { list } = this.data

    return h('div', { class: 'standard-table' }, [
      h('el-table-wrapper', {
        props: {
          columns: columnsProps,
          data: list,
          pagination: paginationProps
        },
        on: {
          'selection-change': this.handleRowSelectChange,
          'pagination-change': this.handlePaginationChange,
          'sort-change': this.handleSortChange,
          'filter-change': this.handleFilterChange
        },
        scopedSlots: this.$scopedSlots
      })
    ])
  }
})
</script>

<style lang="scss">

</style>
