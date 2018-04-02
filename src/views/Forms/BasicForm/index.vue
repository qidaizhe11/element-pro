<template>
  <page-header-layout
    title="基础表单"
    content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
    v-bind="$attrs"
  >
    <el-card>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        :style="{marginTop: '8px'}"
        label-width="30%"
        class="form"
        @submit.native="handleSubmit"
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
            v-model="form.goal"
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
            v-model="form.standard"
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
        <el-form-item
          prop="invites"
        >
          <span slot="label">
            邀评人<em class="optional">（选填）</em>
          </span>
          <el-input
            v-model="form.invites"
            placeholder="请直接 @姓名／工号，最多可邀请 5 人"
          />
        </el-form-item>
        <el-form-item
          prop="weight"
        >
          <span slot="label">
            权重<em class="optional">（选填）</em>
          </span>
          <el-input-number
            v-model="form.weight"
            placeholder="请输入"
            :min="0"
            :max="100"
            :controls="false"
          />
          <span>%</span>
        </el-form-item>
        <el-form-item
          label="目标公开"
          prop="public"
        >
          <div class="item-public">
            <el-radio-group v-model="form.public">
              <el-radio label="1">公开</el-radio>
              <el-radio label="2">部分公开</el-radio>
              <el-radio label="3">不公开</el-radio>
            </el-radio-group>
            <el-form-item
              :style="{marginBottom: 0}"
              v-show="form.public === '2'"
            >
              <el-select
                multiple
                v-model="form.publicUsers"
                placeholder="公开给"
                :style="{margin: '8px 0'}"
              >
                <el-option value="1" label="同事甲" />
                <el-option value="2" label="同事乙" />
                <el-option value="3" label="同事丙" />
              </el-select>
            </el-form-item>
            <div class="form-explain">
              客户、邀评人默认被分享
            </div>
          </div>
        </el-form-item>
        <el-form-item
          :style="{marginTop: '32px'}"
        >
          <el-button
            type="primary"
            native-type="submit"
            :loading="submitting"
          >
            提交
          </el-button>
          <el-button
            :style="{marginLeft: '8px'}"
          >
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </page-header-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  Card,
  Form,
  FormItem,
  Input,
  DatePicker,
  Tooltip,
  InputNumber,
  Radio,
  RadioGroup,
  Select,
  Option,
  Button
} from 'element-ui'

import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'
import AntIcon from 'components/AntIcon'

Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(DatePicker)
Vue.use(Tooltip)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
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
        public: '1',
        publicUsers: ''
      },
      rules: {
        title: [{ required: true, message: '请输入标题' }],
        date: [{ required: true, message: '请选择起止日期' }],
        goal: [{ required: true, message: '请输入目标描述' }],
        standard: [{ required: true, message: '请输入衡量标准' }]
      },
      submitting: false
    }
  },
  methods: {
    handleSubmit(e: any) {
      e.preventDefault()
      const formRef: any = this.$refs.form
      formRef.validate((valid: boolean) => {
        if (valid) {
          this.submitting = true
          this.$store
            .dispatch('form/submitRegularForm', this.form)
            .then(() => {
              this.submitting = false
            })
            .catch(() => {
              this.submitting = false
            })
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.form {
  /deep/ .el-form-item {
    &__content {
      width: 50%;
    }
  }

  .item-public {
    /deep/ .el-radio-group {
      line-height: inhert;

      .el-radio {
        margin-bottom: 0;
        line-height: inhert;
      }
    }

    /deep/ .el-form-item__content {
      width: 100%;
    }

    /deep/ .el-select {
      width: 100%;
    }
  }
}

.optional {
  color: $text-color-secondary;
  font-style: normal;
}

.form-explain {
  color: rgba(0, 0, 0, 0.45);
  line-height: 1.5;
}
</style>
