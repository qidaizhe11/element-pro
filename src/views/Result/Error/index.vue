<template>
  <page-header-layout
    v-bind="$attrs"
  >
    <el-card>
      <result
        type="error"
        title="提交失败"
        description="请核对并修改以下信息后，再重新提交。"
        :style="{marginTop: '48px', marginBottom: '16px'}"
      >
        <div slot="extra">
          <div
            :style="{
              fontSize: '16px',
              color: 'rgba(0, 0, 0, 0.85)', 
              fontWeight: '500', 
              marginBottom: '18px'
            }"
          >
            您提交的内容有如下错误：
          </div>
          <div :style="{marginBottom: '16px'}">
            <ant-icon
              type="close-circle-o"
              :style="{color: '#f5222d', marginRight: '8px'}"
            />您的账户已被冻结
            <a
              :style="{marginLeft: '16px'}"
              href=""
            >
              立即解冻 <ant-icon type="right" />
            </a>
          </div>
          <div>
            <ant-icon
              type="close-circle-o"
              :style="{color: '#f5222d', marginRight: '8px'}"
            />您的账户还不具备申请资格
            <a 
              :style="{marginLeft: '16px'}"
              href=""
            >
              立即升级 <ant-icon type="right" />
            </a>
          </div>
        </div>
        <div slot="actions">
          <el-button type="primary">返回修改</el-button>
        </div>
      </result>
    </el-card>
  </page-header-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Card, Button } from 'element-ui'

import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'
import Result from 'components/Result'
import AntIcon from 'components/AntIcon'

Vue.use(Card)
Vue.use(Button)
Vue.use(Result)
Vue.use(AntIcon)

export default Vue.extend({
  components: {
    PageHeaderLayout
  }
})
</script>

<style lang="scss" scoped>

</style>
