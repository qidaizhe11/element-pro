<template>
  <div class="main">
    <login
      :default-active-key="type"
      @tab-change="onTabChange"
      @submit="handleSubmit"
    >
      <template slot="tab">
        <login-tab
          name="account"
          label="账号密码登录"
        >
          <template
            v-if="login && login.status === 'error' && login.type === 'account' && !submitting"
          >
            <message message="账户或密码错误（admin/888888）" />
          </template>
          <user-name
            prop="userName" 
            placeholder="admin/user"
          />
          <password
            prop="password"
            placeholder="888888/123456"
          />
        </login-tab>
        <login-tab
          name="mobile"
          label="手机号登录"
        >
          <mobile prop="mobile" />
          <captcha prop="captcha" />
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
      <login-submit :loading="submitting">登录</login-submit>
      <div class="other">
        其他登录方式
        <ant-icon class="icon" type="wechat" />
        <ant-icon class="icon" type="qq" />
        <ant-icon class="icon" type="weibo" />
        <!-- <router-link
          class="register" 
          to="/user/register"
        >
          注册账户
        </router-link> -->
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
import Message from './Message.vue'

Vue.use(Checkbox)
Vue.use(Login)
Vue.use(LoginTab)
Vue.use(LoginSubmit)
Vue.use(AntIcon)

export default Vue.extend({
  components: {
    Message,
    UserName: LoginItem.UserName,
    Password: LoginItem.Password,
    Mobile: LoginItem.Mobile,
    Captcha: LoginItem.Captcha
  },
  data() {
    return {
      type: 'account',
      autoLogin: true,
      submitting: false
    }
  },
  computed: {
    login(): any {
      return this.$store.state.login
    }
  },
  methods: {
    onTabChange(type: string) {
      this.type = type
    },
    handleSubmit(err: boolean, values: any) {
      const { type } = this
      console.log('User/Login, handleSubmit, values:', values)
      if (!err) {
        this.submitting = true
        this.$store
          .dispatch('login/login', {
            type,
            ...values
          })
          .then(() => {
            this.submitting = false
          })
          .catch(() => {
            this.submitting = false
          })
      }
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

