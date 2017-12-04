<template>
  <span class="headerSearch" @click="enterSearchMode">
    <i class="el-icon-search icon"></i>
    <el-autocomplete v-model="value" :class="['autocomplete', {show: searchMode}]"
      :fetch-suggestions="querySearch"
      @blur="leaveSearchMode"></el-autocomplete>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import { Autocomplete } from 'element-ui'

Vue.use(Autocomplete)

export default Vue.extend({
  data() {
    return {
      searchMode: false,
      value: ''
    }
  },
  methods: {
    querySearch(queryString: string, cb: any) {
      const results = [
        { value: '搜索提示一' },
        { value: '搜索提示二' },
        { value: '搜索提示三' }
      ]
      cb(results)
    },
    enterSearchMode() {
      this.searchMode = true
    },
    leaveSearchMode() {
      this.searchMode = false
    }
  }
})
</script>

<style lang="scss" scoped>
.headerSearch {
  .icon {
    cursor: pointer;
    font-size: 16px;
  }
  .autocomplete {
    transition: width 0.3s, margin-left 0.3s;
    width: 0;
    background: transparent;
    border-radius: 0;

    /deep/ .el-input {
      /deep/ .el-input__inner {
        border: 0;
        border-radius: 0;
        padding-left: 0;
        padding-right: 0;
        box-shadow: none !important;

        border-bottom: 1px solid #d9d9d9;

        // &:hover,
        // &:focus {
        //   border-bottom: 1px solid #d9d9d9;
        // }
      }
    }

    &.show {
      width: 210px;
      margin-left: 8px;
    }
  }
}
</style>

