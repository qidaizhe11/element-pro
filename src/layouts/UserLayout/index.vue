<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <router-link to="/">
            <img alt="logo" class="logo" :src="logo" />
            <span class="title">Element UI Pro</span>
          </router-link>
        </div>
        <div class="desc">Vue 版 Ant Design Pro（基于 Element-ui 实现）</div>
      </div>
      <router-view></router-view>
    </div>
    <global-footer :links="links">
      <template slot="copyright">
        <div>
          Copyright
          <ant-icon type="copyright" /> 2018 Daizhe
        </div>
      </template>
    </global-footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import GlobalFooter from 'components/GlobalFooter'
import AntIcon from 'components/AntIcon'

import logo from 'assets/logo.png'

Vue.use(GlobalFooter)
Vue.use(AntIcon)

const links = [
  {
    key: 'help',
    title: '帮助',
    href: ''
  },
  {
    key: 'privacy',
    title: '隐私',
    href: ''
  },
  {
    key: 'terms',
    title: '条款',
    href: ''
  }
]

export default Vue.extend({
  name: 'UserLayout',
  data() {
    return {
      logo,
      links
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: #f0f2f5;
}

.content {
  padding: 32px 0;
  flex: 1;
}

@media (min-width: $screen-md-min) {
  .container {
    background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
  }

  .content {
    padding: 112px 0 24px 0;
  }
}

.top {
  text-align: center;
}

.header {
  height: 44px;
  line-height: 44px;
  a {
    text-decoration: none;
  }
}

.logo {
  height: 44px;
  vertical-align: top;
  margin-right: 16px;
}

.title {
  font-size: 33px;
  color: $heading-color;
  font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}

.desc {
  font-size: $font-size-base;
  color: $text-color-secondary;
  margin-top: 12px;
  margin-bottom: 40px;
}
</style>
