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
      </div>
    </el-card>
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
  DatePicker
} from 'element-ui'

import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'
import AntIcon from 'components/AntIcon'

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
Vue.use(AntIcon)

export default Vue.extend({
  components: {
    PageHeaderLayout
  },
  data() {
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
      selectedRows: [],
      loading: false
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
    handleFormReset() {
      const formRef: any = this.$refs.form
      formRef.resetFields()
      this.$store.dispatch('rule/fetch', {})
    },
    toggleForm() {
      this.expandForm = !this.expandForm
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
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
