import Vue from 'vue'
import { Input } from 'element-ui'
import AntIcon from '../AntIcon'

Vue.use(Input)
Vue.use(AntIcon)

const map: any = {
  UserName: {
    component: 'el-input',
    props: {
      size: 'large',
      // prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: 'admin'
    },
    rules: [
      {
        required: true,
        message: 'Please enter username!'
      }
    ]
  },
  Password: {
    component: 'el-input',
    props: {
      size: 'large',
      // prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: 'password',
      placeholder: '888888'
    },
    rules: [
      {
        required: true,
        message: 'Please enter password!'
      }
    ]
  },
  Mobile: {
    component: 'el-input',
    props: {
      size: 'large',
      // prefix: <Icon type="mobile" className={styles.prefixIcon} />,
      placeholder: 'mobile number'
    },
    rules: [
      {
        required: true,
        message: 'Please enter mobile number!'
      },
      {
        pattern: /^1\d{10}$/,
        message: 'Wrong mobile number format!'
      }
    ]
  },
  Captcha: {
    component: 'el-input',
    props: {
      size: 'large',
      // prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: 'captcha'
    },
    rules: [
      {
        required: true,
        message: 'Please enter Captcha!'
      }
    ]
  }
}

export default map
