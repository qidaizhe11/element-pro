<template>
  <div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" :style="{marginBottom: 24}">
        <chart-card title="销售总额">

        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Row, Col } from 'element-ui'

import ChartCard from 'components/Charts/ChartCard/index.vue'

Vue.use(Row)
Vue.use(Col)

export default Vue.extend({
  components: {
    ChartCard
  }
})
</script>

<style lang="scss" scoped>

</style>


