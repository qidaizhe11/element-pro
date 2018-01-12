<template>
  <div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" :style="{marginBottom: 24}">
        <chart-card title="销售总额">
          <el-tooltip slot="action">
            <ant-icon type="info-circle-o"></ant-icon>
          </el-tooltip>
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Row, Col, Tooltip } from 'element-ui'

import ChartCard from 'components/Charts/ChartCard/index.vue'
import AntIcon from 'components/AntIcon/index.vue'

Vue.use(Row)
Vue.use(Col)
Vue.use(Tooltip)

export default Vue.extend({
  components: {
    ChartCard,
    AntIcon
  }
})
</script>

<style lang="scss" scoped>

</style>


