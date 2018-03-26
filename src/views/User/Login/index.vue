<template>
  <div class="main">
    <login
      :default-active-key="type"
    >
      <template slot="tab">
        <login-tab
          name="account"
          label="账号密码登录"
        >
          账号登录
        </login-tab>
        <login-tab
          name="mobile"
          label="手机号登录"
        >
          手机号登录
        </login-tab>
      </template>
      <div>
        <el-checkbox
          v-model="autoLogin"
        >
          自动登录
        </el-checkbox>
        <a :style="{float: 'right'}" href="">忘记密码</a>
      </div>
      <div class="other">
        其他登录方式
        
      </div>
    </login>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Checkbox } from 'element-ui'

import Login from 'components/Login'

Vue.use(Checkbox)
Vue.use(Login)

export default Vue.extend({
  data() {
    return {
      type: 'account',
      autoLogin: true
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.main {
  width: 368px;
  margin: 0 auto;

  .icon {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.2);
    margin-left: 16px;
    vertical-align: middle;
    cursor: pointer;
    transition: color .3s;

    &:hover {
      color: $primary-color;
    }
  }

  .other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .register {
      float: right;
    }
  }
}
</style>

