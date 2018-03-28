<template>
  <div>
    <el-row :gutter="24">
      <el-col :lg="18" :md="24" :sm="24" :xs="24">
        <el-card>
          <div slot="header">
            活动实时交易情况
          </div>
          <el-row>
            <el-col :sm="6" :xs="24">
              <number-info
                sub-title="今日交易总额"
                suffix="元"
                :total="numeral(124543233).format('0,0')"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Row, Col, Card } from 'element-ui'
import * as numeral from 'numeral'

import { yuan } from 'components/Charts'
import NumberInfo from 'components/NumberInfo'

Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(NumberInfo)

export default Vue.extend({
  methods: {
    yuan(value: number) {
      return yuan(value)
    },
    numeral(value: any) {
      return numeral(value)
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
