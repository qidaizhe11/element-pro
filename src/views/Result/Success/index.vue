<template>
  <page-header-layout
    v-bind="$attrs"
  >
    <el-card>
      <result
        type="success"
        title="提交成功"
        description="提交结果页用于反馈一系列操作任务的处理结果，
        如果仅是简单操作，使用 Message 全局提示反馈即可。
        本文字区域可以展示简单的补充说明，如果有类似展示
        “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"
        :style="{marginTop: '48px', marginBottom: '16px'}"
      >
        <div slot="extra">
          <div
            :style="{
              fontSize: '16px',
              color: 'rgba(0, 0, 0, 0.85)', 
              fontWeight: '500', 
              marginBottom: '20px'
            }"
          >
            项目名称
          </div>
          <el-row :style="{marginBottom: '16px'}">
            <el-col :xs="24" :sm="12" :md="12" :lg="6">
              <span :style="{color: 'rgba(0, 0, 0, 0.85)'}">项目 ID：</span>
              23421
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6">
              <span :style="{color: 'rgba(0, 0, 0, 0.85)'}">负责人：</span>
              曲丽丽
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
              <span :style="{color: 'rgba(0, 0, 0, 0.85)'}">生效时间：</span>
              2016-12-12 ~ 2017-12-12
            </el-col>
          </el-row>
          <el-steps
            :active="1"
            align-center
            :style="{marginLeft: '-42px', width: 'calc(100% + 84px)'}"
          >
            <el-step>
              <span
                slot="title"
                :style="{fontSize: '14px'}"
              >
                创建项目
              </span>
              <div
                slot="description"
                :style="{
                  fontSize: '12px',
                  color: 'rgba(0, 0, 0, 0.45)'
                }"
              >
                <div :style="{margin: '8px 0 4px'}">
                  曲丽丽
                  <ant-icon
                    type="dingding-o"
                    :style="{marginLeft: '8px'}"
                  />
                </div>
                <div>2016-12-12 12:32</div>
              </div>
            </el-step>
            <el-step title="部门初审">
              <span
                slot="title"
                :style="{fontSize: '14px'}"
              >
                部门初审
              </span>
              <div
                slot="description"
                :style="{
                  fontSize: '12px',
                  color: 'rgba(0, 0, 0, 0.45)'
                }"
              >
                <div :style="{margin: '8px 0 4px'}">
                  周毛毛
                  <ant-icon
                    type="dingding-o"
                    :style="{color: '#00A0E9', marginLeft: '8px'}"
                  />
                </div>
                <div>
                  <a href="">催一下</a>
                </div>
              </div>
            </el-step>
            <el-step>
              <span
                slot="title"
                :style="{fontSize: '14px'}"
              >
                财务复核
              </span>
            </el-step>
            <el-step>
              <span
                slot="title"
                :style="{fontSize: '14px'}"
              >
                完成
              </span>
            </el-step>
          </el-steps>
        </div>
        <div slot="actions">
          <el-button type="primary">返回列表</el-button>
          <el-button>查看项目</el-button>
          <el-button>打 印</el-button>
        </div>
      </result>
    </el-card>
  </page-header-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Card, Button, Row, Col, Steps, Step } from 'element-ui'

import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'
import Result from 'components/Result'
import AntIcon from 'components/AntIcon'

Vue.use(Card)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Result)
Vue.use(AntIcon)

export default Vue.extend({
  components: {
    PageHeaderLayout
  }
})
</script>
