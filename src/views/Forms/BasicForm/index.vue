<template>
  <page-header-layout
    title="基础表单"
    content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
    v-bind="$attrs"
  >
    <el-card>
      <el-form
        :ref="form"
        :model="form"
        :rules="rules"
        :style="{marginTop: '8px'}"
        label-width="30%"
        class="form"
      >
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input
            placeholder="给目标起个名字"
            v-model="form.title"
          />
        </el-form-item>
        <el-form-item
          label="起止日期"
          prop="date"
        >
          <el-date-picker
            v-model="form.date"
            :style="{width: '100%'}"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item
          label="目标描述"
          prop="goal"
        >
          <el-input
            type="textarea"
            :style="{minHeight: '32px'}"
            placeholder="请输入你的阶段性工作目标"
            :rows="4"
          />
        </el-form-item>
        <el-form-item
          label="衡量标准"
          prop="standard"
        >
          <el-input
            type="textarea"
            :style="{minHeight: '32px'}"
            placeholder="请输入衡量标准"
            :rows="4"
          />
        </el-form-item>
        <el-form-item
          prop="client"
        >
          <span slot="label">
            客户
            <em class="optional">
              （选填）
              <el-tooltip
                content="目标的服务对象"
                placement="top"
              >
                <ant-icon
                  type="info-circle-o"
                  :style="{marginRight: '4px'}"
                />
              </el-tooltip>
            </em>
          </span>
          <el-input
            v-model="form.client"
            placeholder="请描述你服务的客户，内部客户直接 @姓名／工号"
          />
        </el-form-item>
      </el-form>
    </el-card>
  </page-header-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Card, Form, FormItem, Input, DatePicker, Tooltip } from 'element-ui'

import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'
import AntIcon from 'components/AntIcon'

Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(DatePicker)
Vue.use(Tooltip)
Vue.use(AntIcon)

export default Vue.extend({
  components: {
    PageHeaderLayout
  },
  data() {
    return {
      form: {
        title: '',
        date: '',
        goal: '',
        standard: '',
        client: '',
        invites: '',
        weight: '',
        public: '',
        publicUsers: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题' }
        ],
        date: [
          { required: true, message: '请选择起止日期' }
        ],
        goal: [
          { required: true, message: '请输入目标描述' }
        ],
        standard: [
          { required: true, message: '请输入衡量标准' }
        ]
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.form {
  /deep/ .el-form-item__content {
    width: 50%;
  }
}

.optional {
  color: $text-color-secondary;
  font-style: normal;
}
</style>
