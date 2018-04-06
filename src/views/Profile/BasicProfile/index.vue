<template>
  <page-header-layout
    title="基础详情页"
    v-bind="$attrs"
  >
    <el-card>
      <description-list
        size="large"
        title="退款申请"
        :style="{marginBottom: '32px'}"
      >
        <description term="取货单号">1000000000</description>
        <description term="状态">已取货</description>
        <description term="销售单号">1234123421</description>
        <description term="子订单">3214321432</description>
      </description-list>
      <divider :style="{marginBottom: '32px'}" />
      <description-list
        size="large"
        title="用户信息"
        :style="{marginBottom: '32px'}"
      >
        <description term="用户姓名">付小小</description>
        <description term="联系电话">18100000000</description>
        <description term="常用快递">菜鸟仓储</description>
        <description term="取货地址">浙江省杭州市西湖区万塘路18号</description>
        <description term="备注">无</description>
      </description-list>
      <divider :style="{marginBottom: '32px'}" />
      <div class="title">退货商品</div>
      <el-table
        :style="{marginBottom: '24px'}"
        v-loading="loading"
        :data="goodsData"
      >
        <el-table-column
          prop="id"
          label="商品编号"
        >
          <template slot-scope="scope">
            <template v-if="scope.$index < basicGoods.length">
              <a href="">{{scope.row.id}}</a>
            </template>
            <template v-else>
              <span :style="{fontWeight: 600 }">总计</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
        >
        </el-table-column>
        <el-table-column
          prop="barcode"
          label="商品条码"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          align="right"
        >
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量（件）"
          align="right"
        >
          <template slot-scope="scope">
            <template v-if="scope.$index < basicGoods.length">
              {{scope.row.num}}
            </template>
            <template v-else>
              <span :style="{fontWeight: 600 }">{{scope.row.num}}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额"
          align="right"
        >
          <template slot-scope="scope">
            <template v-if="scope.$index < basicGoods.length">
              {{scope.row.amount}}
            </template>
            <template v-else>
              <span :style="{fontWeight: 600 }">{{scope.row.amount}}</span>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="title">退货进度</div>
      <el-table
        :style="{marginBottom: '16px'}"
        v-loading="loading"
        :data="basicProgress"
      >
        <el-table-column
          prop="time"
          label="时间"
        >
        </el-table-column>
        <el-table-column
          prop="rate"
          label="当前进度"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.status === 'success'"
              type="success"
            >
              成功
            </el-tag>
            <el-tag v-else>进行中</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="operator"
          label="操作员ID"
        >
        </el-table-column>
        <el-table-column
          prop="cost"
          label="耗时"
        >
        </el-table-column>
      </el-table>
    </el-card>
  </page-header-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Card, Table, TableColumn, Loading, Tag } from 'element-ui'

import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'
import DescriptionList from 'components/DescriptionList'
import Description from 'components/Description'
import Divider from 'components/Divider'

Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(DescriptionList)
Vue.use(Description)
Vue.use(Divider)

export default Vue.extend({
  components: {
    PageHeaderLayout
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    basicGoods(): any[] {
      return this.$store.state.profile.basicGoods
    },
    basicProgress(): any[] {
      return this.$store.state.profile.basicProgress
    },
    goodsData() {
      const basicGoods: any[] = this.basicGoods
      let goodsData = []
      if (basicGoods.length) {
        let num = 0
        let amount = 0
        basicGoods.forEach(item => {
          num += Number(item.num)
          amount += Number(item.amount)
        })
        goodsData = basicGoods.concat({
          id: '总计',
          num,
          amount
        })
      }
      return goodsData
    }
  },
  mounted() {
    this.$store.dispatch('profile/fetchBasic')
  }
})
</script>

<style lang="scss" scoped>
@import '~theme/theme.scss';

.title {
  color: $heading-color;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
</style>
