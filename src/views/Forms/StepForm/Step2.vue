<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="20%"
      class="step-form"
    >
      <el-alert
        closable
        show-icon
        title="确认转账后，资金将直接打入对方账户，无法退回。"
        :style="{marginBottom: '24px'}"
      />
      <el-form-item
        label="付款账户"
      >
        {{formData.payAccount}}
      </el-form-item>
      <el-form-item
        label="收款账户"
      >
        {{formData.receiverAccount}}
      </el-form-item>
      <el-form-item
        label="收款人姓名"
      >
        {{formData.receiverName}}
      </el-form-item>
      <el-form-item
        label="转账金额"
      >
        <span class="money">{{formData.amount}}</span>
        <span class="uppercase">（{{digitUppercase(formData.amount)}}）</span>
      </el-form-item>
      <divider
        :style="{ margin: '24px 0' }"
      />
      <el-form-item
        label="支付密码"
        prop="password"
      >
        <el-input
          v-model="form.password"
          type="password"
          auto-complete="off"
          :style="{width: '80%'}"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        :style="{marginBottom: '8px', marginLeft: '20%'}"
      >
        <el-button
          type="primary"
          :loading="submitting"
          @click="onValidateForm"
        >
          提交
        </el-button>
        <el-button
          :style="{marginLeft: '8px'}"
          @click="onPrev"
        >
          上一步
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form, FormItem, Input, Button, Alert } from 'element-ui'

import Divider from 'components/Divider'

import { digitUppercase } from 'utils/utils'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Alert)
Vue.use(Divider)

export default Vue.extend({
  data() {
    return {
      form: {
        password: '123456'
      },
      rules: {
        password: [{ required: true, message: '需要支付密码才能进行支付' }]
      },
      submitting: false
    }
  },
  computed: {
    formData(): any {
      return this.$store.state.form.step
    }
  },
  methods: {
    onValidateForm() {
      const formRef: any = this.$refs.form
      formRef.validate((valid: boolean) => {
        if (valid) {
          this.submitting = true
          this.$store
            .dispatch('form/submitStepForm', {
              ...this.form,
              ...this.formData
            })
            .then(() => {
              this.submitting = false
            })
            .catch(() => {
              this.submitting = false
            })
        }
      })
    },
    onPrev() {
      this.$router.push('/form/step-form')
    },
    digitUppercase(n: number) {
      return digitUppercase(n)
    }
  }
})
</script>

<style lang="scss" src="./style.scss">

</style>
