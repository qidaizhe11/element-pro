<template>
  <Exception
    type="403"
    :style="{minHeight: 500, height: '80%'}"
  >
  </Exception>
</template>

<script lang="ts">
import Vue from 'vue'

import Exception from 'components/Exception'

Vue.use(Exception)

export default Vue.extend({
})
</script>

