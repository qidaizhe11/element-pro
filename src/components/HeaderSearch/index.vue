<template>
  <span class="headerSearch" @click="enterSearchMode">
    <i class="el-icon-search icon"></i>
    <el-autocomplete :value="value" :class="['autocomplete', {show: searchMode}]"
      ref="autocomplete" :fetch-suggestions="querySearch" :select-when-unmatched="true"
      v-bind="$attrs" @input="onSearchInput"
      @blur="leaveSearchMode" @select="onSearchSelect"></el-autocomplete>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import { Autocomplete } from 'element-ui'

Vue.use(Autocomplete)

interface SuggestionItem {
  value: string
}

export default Vue.extend({
  data() {
    return {
      searchMode: false,
      value: ''
    }
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    suggestionData(): SuggestionItem[] {
      return this.data.map(datum => {
        return { value: datum }
      })
    }
  },
  methods: {
    querySearch(queryString: string, cb: any) {
      const suggestionData = this.suggestionData
      const results = queryString ? suggestionData.filter(this.createFilter(queryString)) : suggestionData
      cb(results)
    },
    createFilter(queryString: string) {
      return (item: SuggestionItem) => {
        return item.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
      }
    },
    enterSearchMode() {
      this.searchMode = true
      const ref: any = this.$refs.autocomplete
      setTimeout(() => {
        ref.$refs.input.focus()
      }, 300)
    },
    leaveSearchMode() {
      this.searchMode = false
      this.value = ''
      this.$emit('input', '')
      const ref: any = this.$refs.autocomplete
      ref.close()
    },
    onSearchSelect(item: SuggestionItem) {
      this.searchMode = true
      this.$emit('select', item.value)
    },
    onSearchInput(value: string) {
      this.value = value
      this.$emit('input', value)
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
      }
    }

    &.show {
      width: 210px;
      margin-left: 8px;
    }
  }
}
</style>

