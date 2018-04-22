<template>
  <page-header-layout
    title="查询表格"
    v-bind="$attrs"
  >
    <el-card>
      <div class="table-list">
        <div class="table-list-form">
          <el-form
            v-if="expandForm"
            ref="form"
            :model="form"
            inline
            @submit.native="handleSearch"
          >
            <el-row :gutter="8">
              <el-col :xs="24" :sm="8">
                <el-form-item
                  label="规则编号"
                  prop="no"
                >
                  <el-input
                    v-model="form.no"
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8">
                <el-form-item
                  label="使用状态"
                  prop="status"
                >
                  <el-select
                    v-model="form.status"
                    placeholder="请选择"
                    :style="{width: '100%'}"
                  >
                    <el-option value="0" label="关闭" />
                    <el-option value="1" label="运行中" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8">
                <el-form-item
                  label="调用次数"
                  prop="number"
                >
                  <el-input-number
                    v-model="form.number"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="8">
              <el-col :xs="24" :sm="8">
                <el-form-item
                  label="更新日期"
                  prop="updatedAt"
                >
                  <el-date-picker
                    v-model="form.updatedAt"
                    :style="{width: '100%'}"
                    placeholder="请输入更新日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8">
                <el-form-item
                  label="使用状态"
                  prop="status3"
                >
                  <el-select
                    v-model="form.status3"
                    placeholder="请选择"
                    :style="{width: '100%'}"
                  >
                    <el-option value="0" label="关闭" />
                    <el-option value="1" label="运行中" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8">
                <el-form-item
                  label="使用状态"
                  prop="status4"
                >
                  <el-select
                    v-model="form.status4"
                    placeholder="请选择"
                    :style="{width: '100%'}"
                  >
                    <el-option value="0" label="关闭" />
                    <el-option value="1" label="运行中" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div :style="{overflow: 'hidden'}">
              <span :style="{float: 'right', marginBottom: '24px'}">
                <el-button
                  type="primary"
                  native-type="submit"
                >
                  查询
                </el-button>
                <el-button
                  :style="{marginLeft: '8px'}"
                  @click="handleFormReset"
                >
                  重置
                </el-button>
                <a
                  :style="{marginLeft: '8px'}"
                  href="javascript:;"
                  @click="toggleForm"
                >
                  收起 <ant-icon type="up" />
                </a>
              </span>
            </div>
          </el-form>
          <el-form
            v-else
            ref="form"
            :model="form"
            inline
            @submit.native="handleSearch"
          >
            <el-row :gutter="8">
              <el-col :xs="24" :sm="8">
                <el-form-item
                  label="规则编号"
                  prop="no"
                >
                  <el-input
                    v-model="form.no"
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8">
                <el-form-item
                  label="使用状态"
                  prop="status"
                >
                  <el-select
                    v-model="form.status"
                    placeholder="请选择"
                    :style="{width: '100%'}"
                  >
                    <el-option value="0" label="关闭" />
                    <el-option value="1" label="运行中" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8">
                <span class="submit-buttons">
                  <el-button
                    type="primary"
                    native-type="submit"
                  >
                    查询
                  </el-button>
                  <el-button
                    :style="{marginLeft: '8px'}"
                    @click="handleFormReset"
                  >
                    重置
                  </el-button>
                  <a
                    :style="{marginLeft: '8px'}"
                    href="javascript:;"
                    @click="toggleForm"
                  >
                    展开 <ant-icon type="down" />
                  </a>
                </span>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="table-list-operator">
          <el-button
            type="primary"
            @click="handleModalVisible(true)"
          >
            新建
          </el-button>
          <span v-if="selectedRows.length > 0">
            <el-button>批量操作</el-button>
            <el-dropdown @command="handleMenuClick">
              <el-button>
                更多操作 <ant-icon type="down" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="remove">删除</el-dropdown-item>
                <el-dropdown-item command="approval">批量审批</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
        <standard-table
          :data="rule"
          :columns="columns"
          @select-row="handleSelectRows"
          @change="handleStandardTableChange"
        >
          <template slot-scope="scope" slot="callNo">
            {{scope.row.callNo}} 万
          </template>
          <template slot-scope="scope" slot="updatedAt">
            <span>{{moment(scope.row.updatedAt).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
          <template slot-scope="scope" slot="status">
            <a-badge
              :status="statusMap[scope.row.status]"
              :text="status[scope.row.status]"
            />
          </template>
          <template slot-scope="scope" slot="operation">
            <div>
              <a href="">配置</a>
              <Divider type="vertical" />
              <a href="">订阅警报</a>
            </div>
          </template>
        </standard-table>
      </div>
    </el-card>
    <el-dialog
      title="新建规则"
      :visible="modalVisible"
      @close="handleModalVisible(false)"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleModalVisible(false)">取 消</el-button>
        <el-button type="primary" @click="handleModalOk">确 定</el-button>
      </span>
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="addFormRules"
      >
        <el-form-item
          label="描述"
          prop="desc"
          label-width="20%"
        >
          <el-input
            v-model="addForm.desc"
            placeholder="请输入"
            :style="{width: '80%'}"
          />
        </el-form-item>
      </el-form>
    </el-dialog>
  </page-header-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  Card,
  Form,
  FormItem,
  Row,
  Col,
  Input,
  Select,
  Option,
  InputNumber,
  DatePicker,
  Message,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu
} from 'element-ui'
import * as moment from 'moment'

import { Badge } from 'vue-antd-ui'

import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'
import AntIcon from 'components/AntIcon'
import StandardTable from 'components/StandardTable'
import Divider from 'components/Divider'

Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(InputNumber)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(AntIcon)
Vue.use(StandardTable)
Vue.use(Divider)

Vue.component(Badge.name, Badge)

const getValue = (obj: any) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',')

const statusMap = ['default', 'processing', 'success', 'error']
const status = ['关闭', '运行中', '已上线', '异常']

export default Vue.extend({
  components: {
    PageHeaderLayout
  },
  data() {
    const columns = [
      {
        prop: 'no',
        label: '规则编号'
      },
      {
        prop: 'description',
        label: '描述'
      },
      {
        prop: 'callNo',
        label: '服务调用次数',
        align: 'right',
        sortable: true,
        scopedSlot: 'callNo'
      },
      {
        prop: 'status',
        label: '状态',
        scopedSlot: 'status',
        columnKey: 'status',
        filters: [
          {
            text: status[0],
            value: 0
          },
          {
            text: status[1],
            value: 1
          },
          {
            text: status[2],
            value: 2
          },
          {
            text: status[3],
            value: 3
          }
        ],
        filterMethod: (value: string, row: any, column: any) => {
          return row.status.toString() === value.toString()
        }
      },
      {
        prop: 'updatedAt',
        label: '更新时间',
        sortable: true,
        scopedSlot: 'updatedAt'
      },
      {
        label: '操作',
        scopedSlot: 'operation'
      }
    ]
    const selectedRows: any[] = []
    return {
      modalVisible: false,
      expandForm: false,
      form: {
        no: '',
        status: '',
        number: '',
        updatedAt: '',
        status3: '',
        status4: ''
      },
      selectedRows,
      loading: false,
      columns: columns,
      status,
      statusMap,
      addForm: {
        desc: ''
      },
      addFormRules: {
        desc: [{ required: true, message: 'Please input some description...' }]
      }
    }
  },
  computed: {
    rule(): any {
      return this.$store.state.rule
    }
  },
  mounted() {
    this.$store.dispatch('rule/fetch')
  },
  methods: {
    handleStandardTableChange(pagination: any, filtersArg: any, sorter: any) {
      const filters = Object.keys(filtersArg).reduce((obj, key) => {
        const newObj: any = { ...obj }
        newObj[key] = getValue(filtersArg[key])
        return newObj
      }, {})

      const params = {
        currentPage: pagination.currentPage,
        pageSize: pagination.pageSize,
        ...this.form,
        ...filters
      }
      if (sorter.prop) {
        params.sorter = `${sorter.prop}_${sorter.order}`
      }

      this.$store.dispatch('rule/fetch', params)
    },
    handleFormReset() {
      const formRef: any = this.$refs.form
      formRef.resetFields()
      this.$store.dispatch('rule/fetch', {})
    },
    toggleForm() {
      this.expandForm = !this.expandForm
    },
    handleMenuClick(key: string) {
      const { selectedRows } = this

      if (!selectedRows) {
        return
      }

      switch (key) {
        case 'remove':
          this.$store
            .dispatch('rule/remove', {
              no: selectedRows.map(row => row.no).join(',')
            })
            .then(() => {
              this.selectedRows = []
            })
          break
        default:
          break
      }
    },
    handleSelectRows(rows: any) {
      this.selectedRows = rows
    },
    handleSearch(e: any) {
      e.preventDefault()

      const formRef: any = this.$refs.form
      formRef.validate((valid: boolean) => {
        if (valid) {
          this.loading = true
          const vaules: any = {
            ...this.form,
            updatedAt: this.form.updatedAt && this.form.updatedAt.valueOf()
          }
          this.$store
            .dispatch('rule/fetch', vaules)
            .then(() => {
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    handleModalVisible(flag: boolean) {
      this.modalVisible = !!flag
    },
    handleModalOk() {
      const formRef: any = this.$refs.addForm
      formRef.validate((valid: boolean) => {
        if (valid) {
          this.handleAdd(this.addForm)
          formRef.resetFields()
        }
      })
    },
    handleAdd(fields: any) {
      this.$store.dispatch('rule/add', {
        description: fields.desc
      })

      Message.success('添加成功')
      this.modalVisible = false
    },
    moment(value: any) {
      return moment(value)
    }
  }
})
</script>

<style lang="scss" scoped>
.table-list {
  &-operator {
    margin-bottom: 16px;
    button {
      margin-right: 8px;
    }
  }
}

.table-list-form {
  /deep/ .el-form-item {
    &__label {
      margin-bottom: 0;
    }
  }
}
</style>
