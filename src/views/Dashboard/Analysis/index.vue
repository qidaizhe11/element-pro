<template>
  <div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" :style="{marginBottom: 24}">
        <chart-card title="销售总额">
          <el-tooltip slot="action">
            <icon type="info-circle-o"></icon>
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
import Icon from 'components/Icon/AntIcon.vue'

Vue.use(Row)
Vue.use(Col)
Vue.use(Tooltip)

export default Vue.extend({
  components: {
    ChartCard,
    Icon
  }
})
</script>

<style lang="scss" scoped>

</style>


