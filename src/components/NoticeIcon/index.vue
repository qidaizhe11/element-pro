<template>
  <span class="noticeButton">
    <el-badge :value="13" class="badge">
      <i class="el-icon-bell"></i>
    </el-badge>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import { Badge } from 'element-ui'

Vue.use(Badge)

export default Vue.extend({
  data() {
    return {

    }
  }
})
</script>

<style lang="scss" scoped>

</style>


