import * as numeral from 'numeral'

import ChartCard from './ChartCard/index.vue'
import Field from './Field/index.vue'
import Trend from './Trend/index.vue'
import MiniArea from './MiniArea/index.vue'
import MiniBar from './MiniBar/index.vue'
import MiniProgress from './MiniProgress/index.vue'
import Bar from './Bar/index.vue'
import Pie from './Pie/index.vue'
import TimelineChart from './TimelineChart/index.vue'

const yuan = (val: number) => `&yen; ${numeral(val).format('0,0')}`

export {
  yuan,
  ChartCard,
  Field,
  Trend,
  MiniArea,
  MiniBar,
  MiniProgress,
  Bar,
  Pie,
  TimelineChart
}
