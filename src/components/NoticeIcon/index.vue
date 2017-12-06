<template>
  <div class="wrapper">
    <el-popover ref="notice-popover" placement="bottom" width="160" v-model="popoverVisible">
      <div>
        <p>这是一段内容这是一段内容确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
          <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
        </div>
      </div>
    </el-popover>

    <div class="noticeIcon" v-popover:notice-popover>
      <el-badge :value="13" class="badge">
        <i class="el-icon-bell"></i>
      </el-badge>
    </div>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import { Badge, Popover, Button } from 'element-ui'

Vue.use(Badge)
Vue.use(Popover)
Vue.use(Button)

export default Vue.extend({
  data() {
    return {
      popoverVisible: false
    }
  }
})
</script>

<style lang="scss" scoped>

.noticeIcon {
  width: 100%;
  height: 100%;
  padding: 0 12px;

  display: flex;
  align-items: center;
}

.badge {
  /deep/ .el-badge__content {
    z-index: 1;
  }
}

</style>


