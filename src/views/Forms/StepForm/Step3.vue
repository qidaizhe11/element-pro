<template>
  <result
    type="success"
    title="操作成功"
    description="预计两小时内到账"
    class="step-result"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { Col, Row, Button } from 'element-ui'

import Result from 'components/Result'

Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Result)

export default Vue.extend({
  data() {
    return {
    }
  },
  computed: {
    formData(): any {
      return this.$store.state.form.step
    }
  },
  methods: {
    onFinish() {
      this.$router.push('/form/step-form')
    }
  }
})
</script>

<style lang="scss" src="./style.scss">

</style>

