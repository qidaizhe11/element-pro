<template>
  <result
    type="success"
    title="操作成功"
    description="预计两小时内到账"
    class="step-result"
  >
    <div slot="actions">
      <el-button
        type="primary"
        @click="onFinish"
      >
        再转一笔
      </el-button>
      <el-button>查看账单</el-button>
    </div>
    <div
      slot="extra"
      class="step-information"
    >
      <el-row>
        <el-col
          :span="8"
          class="label"
        >
          付款账户：
        </el-col>
        <el-col
          :span="16"
        >
          {{formData.payAccount}}
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="8"
          class="label"
        >
          收款账户：
        </el-col>
        <el-col
          :span="16"
        >
          {{formData.receiverAccount}}
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="8"
          class="label"
        >
          收款人姓名：
        </el-col>
        <el-col
          :span="16"
        >
          {{formData.receiverName}}
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="8"
          class="label"
        >
          转账金额：
        </el-col>
        <el-col
          :span="16"
        >
          <span class="money">{{formData.amount}}</span> 元
        </el-col>
      </el-row>
    </div>
  </result>
</template>

<script lang="ts">
import Vue from 'vue'
import { Col, Row, Button } from 'element-ui'

import Result from 'components/Result'

Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Result)

export default Vue.extend({
  data() {
    return {
    }
  },
  computed: {
    formData(): any {
      return this.$store.state.form.step
    }
  },
  methods: {
    onFinish() {
      this.$router.push('/form/step-form')
    }
  }
})
</script>

<style lang="scss" src="./style.scss">

</style>

