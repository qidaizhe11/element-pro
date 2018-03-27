<template>
  <el-form-item>
    <el-button
      size="large"
      class="submit"
      type="primary"
      native-type="submit"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot></slot>
    </el-button>
  </el-form-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { FormItem, Button } from 'element-ui'

Vue.use(FormItem)

export default Vue.extend({
})
</script>

<style lang="scss" scoped>
.submit {
  width: 100%;
  margin-top: 24px;
}
</style>
