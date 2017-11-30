<template>
  <span class="headerSearch">
    <i class="el-icon-search icon"></i>
    <el-autocomplete class="autocomplete" ref="autocomplete"></el-autocomplete>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {

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
    // width: 0;
    background: transparent;
    border-radius: 0;

    /deep/ .el-input {
      /deep/ .el-input__inner {
        border: 0;
        border-radius: 0;
        padding-left: 0;
        padding-right: 0;
        box-shadow: none !important;

        &:hover, &:focus {
          border-bottom: 1px solid #d9d9d9;
        }
      }
    }

    width: 210px;
    margin-left: 8px;
  }
}
</style>

