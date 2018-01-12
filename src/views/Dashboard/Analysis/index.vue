<template>
  <div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" :style="{marginBottom: 24}">
        <chart-card title="销售总额">
          <el-tooltip slot="action" content="指标说明" placement="top">
            <ant-icon type="infocirlceo"></ant-icon>
          </el-tooltip>
          <field slot="footer" label="日均销售额" :value="yuan(12423)"></field>
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Row, Col, Tooltip } from 'element-ui'
import * as numeral from 'numeral'

import AntIcon from 'components/AntIcon/index.vue'
import { yuan, ChartCard, Field } from 'components/Charts'

Vue.use(Row)
Vue.use(Col)
Vue.use(Tooltip)

export default Vue.extend({
  components: {
    AntIcon,
    ChartCard,
    Field
  },
  methods: {
    yuan(value: number) {
      return yuan(value)
    }
  }
})
</script>

<style lang="scss" scoped>

</style>


