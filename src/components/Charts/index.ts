import * as numeral from 'numeral'

import ChartCard from './ChartCard/index.vue'
import Field from './Field/index.vue'
import Trend from './Trend/index.vue'

const yuan = (val: number) => `&yen; ${numeral(val).format('0,0')}`

export {
  yuan,
  ChartCard,
  Field,
  Trend
}
