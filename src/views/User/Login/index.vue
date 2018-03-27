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
          <user-name
            name="userName" 
            placeholder="admin/user"
          />
          <password
            name="password"
            placeholder="888888/123456"
          />
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
      <login-submit>登录</login-submit>
      <div class="other">
        其他登录方式
        <ant-icon class="icon" type="wechat" />
        <ant-icon class="icon" type="qq" />
        <ant-icon class="icon" type="weibo" />
        <router-link
          class="register" 
          to="/user/register"
        >
          注册账户
        </router-link>
      </div>
    </login>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Checkbox } from 'element-ui'

import Login, { LoginItem } from 'components/Login'
import LoginTab from 'components/LoginTab'
import LoginSubmit from 'components/LoginSubmit'
import AntIcon from 'components/AntIcon'

Vue.use(Checkbox)
Vue.use(Login)
Vue.use(LoginTab)
Vue.use(LoginSubmit)
Vue.use(AntIcon)

export default Vue.extend({
  components: {
    UserName: LoginItem.UserName,
    Password: LoginItem.Password
  },
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
    transition: color 0.3s;

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

