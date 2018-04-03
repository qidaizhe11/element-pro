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
        >
          下一步
        </el-button>
      </el-form-item>
    </el-form>
  </div>
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
      },
      submitting: false
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
  }
})
</script>

<style lang="scss" src="./style.scss">
</style>
