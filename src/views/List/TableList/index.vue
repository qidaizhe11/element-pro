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
            @submit.native="handleSubmit"
          >
          </el-form>
          <el-form
            v-else
            ref="form"
            :model="form"
            inline
            @submit.native="handleSubmit"
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
                  >
                    重置
                  </el-button>
                  <a
                    :style="{marginLeft: '8px'}"
                    href="javascript:;"
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
import { Card, Form, FormItem, Row, Col, Input, Select, Option } from 'element-ui'

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
Vue.use(AntIcon)

export default Vue.extend({
  components: {
    PageHeaderLayout
  },
  data() {
    return {
      expandForm: false,
      form: {
        no: '',
        status: ''
      }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
