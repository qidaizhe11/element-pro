<template>
  <el-alert 
    :style="{marginBottom: '24px'}" 
    :title="message" 
    type="error"
    show-icon
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { Alert } from 'element-ui'

Vue.use(Alert)

export default Vue.extend({
  props: {
    message: String
  }
})
</script>

