<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="20%"
      class="step-form"
    >
      <el-form-item
        label="付款账户"
        prop="payAccount"
      >
        <el-select
          placeholder="test@example.com"
          v-model="form.payAccount"
          :style="{width: '100%'}"
        >
          <el-option value="ant-design@alipay.com" label="ant-design@alipay.com" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="收款账户"
        prop="receiverAccount"
      >
        <el-input
          v-model="form.receiverAccount"
          placeholder="test@example.com"
        >
          <el-select
            slot="prepend"
            placeholder="test@example.com"
            :style="{width: '100px'}"
            value="alipay"
          >
            <el-option value="alipay" label="支付宝" />
            <el-option value="bank" label="银行账户" />
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item
        label="收款人姓名"
        prop="receiverName"
      >
        <el-input
          v-model="form.receiverName"
          placeholder="请输入收款人姓名"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="转账金额"
        prop="amount"
      >
        <el-input
          v-model="form.amount"
          placeholder="请输入金额"
        >
          <span slot="prefix">￥</span>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onValidateForm"
        >
          下一步
        </el-button>
      </el-form-item>
    </el-form>
    <divider
      :style="{ margin: '40px 0 24px' }"
    />
    <div class="step-desc">
      <h3>说明</h3>
      <h4>转账到支付宝账户</h4>
      <p>
        如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
      </p>
      <h4>转账到银行卡</h4>
      <p>
        如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  Card,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Button
} from 'element-ui'

import Divider from 'components/Divider'

Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Divider)

export default Vue.extend({
  data() {
    return {
      form: {
        payAccount: '',
        receiverAccount: '',
        receiverName: '',
        amount: ''
      },
      rules: {
        payAccount: [{ required: true, message: '请选择付款账户' }],
        receiverAccount: [
          { required: true, message: '请输入收款人账户' },
          { type: 'email', message: '账户名应为邮箱格式' }
        ],
        receiverName: [{ required: true, message: '请输入收款人姓名' }],
        amount: [
          { required: true, message: '请输入转账金额' },
          {
            pattern: /^(\d+)((?:\.\d+)?)$/,
            message: '请输入合法金额数字'
          }
        ]
      }
    }
  },
  computed: {
    formData(): any {
      return this.$store.state.form.step
    }
  },
  watch: {
    formData: {
      immediate: true,
      handler: function(val) {
        this.form = val
      }
    }
  },
  methods: {
    onValidateForm() {
      const formRef: any = this.$refs.form
      formRef.validate((valid: boolean) => {
        if (valid) {
          this.$store.commit('form/saveStepFormData', this.form)
          this.$router.push('/form/step-form/confirm')
        }
      })
    }
  }
})
</script>

<style lang="scss" src="./style.scss">
</style>
