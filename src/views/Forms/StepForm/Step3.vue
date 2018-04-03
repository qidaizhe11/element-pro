<template>
  
</template>

<script lang="ts">
import Vue from 'vue'
import { Col, Row, Button } from 'element-ui'

Vue.use(Button)
Vue.use(Col)
Vue.use(Row)

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

