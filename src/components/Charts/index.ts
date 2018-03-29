import * as numeral from 'numeral'

import ChartCard from './ChartCard'
import Field from './Field'
import Trend from './Trend'
import MiniArea from './MiniArea'
import MiniBar from './MiniBar'
import MiniProgress from './MiniProgress'
import Bar from './Bar'
import Pie from './Pie'
import TimelineChart from './TimelineChart'
import Gauge from './Gauge'
import TagCloud from './TagCloud'
import WaterWave from './WaterWave'

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
  TimelineChart,
  Gauge,
  TagCloud,
  WaterWave
}
