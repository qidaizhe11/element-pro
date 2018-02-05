const COLOR_PLATE_8 = [
  '#1890FF',
  '#2FC25B',
  '#FACC14',
  '#223273',
  '#8543E0',
  '#13C2C2',
  '#3436C7',
  '#F04864'
]
const COLOR_PLATE_16 = [
  '#1890FF',
  '#41D9C7',
  '#2FC25B',
  '#FACC14',
  '#E6965C',
  '#223273',
  '#7564CC',
  '#8543E0',
  '#5C8EE6',
  '#13C2C2',
  '#5CA3E6',
  '#3436C7',
  '#B381E6',
  '#F04864',
  '#D598D9'
]
const COLOR_PLATE_24 = [
  '#1890FF',
  '#66B5FF',
  '#41D9C7',
  '#2FC25B',
  '#6EDB8F',
  '#9AE65C',
  '#FACC14',
  '#E6965C',
  '#57AD71',
  '#223273',
  '#738AE6',
  '#7564CC',
  '#8543E0',
  '#A877ED',
  '#5C8EE6',
  '#13C2C2',
  '#70E0E0',
  '#5CA3E6',
  '#3436C7',
  '#8082FF',
  '#DD81E6',
  '#F04864',
  '#FA7D92',
  '#D598D9'
]
const COLOR_PIE = [
  '#1890FF',
  '#13C2C2',
  '#2FC25B',
  '#FACC14',
  '#F04864',
  '#8543E0',
  '#3436C7',
  '#223273'
]
const COLOR_PIE_16 = [
  '#1890FF',
  '#73C9E6',
  '#13C2C2',
  '#6CD9B3',
  '#2FC25B',
  '#9DD96C',
  '#FACC14',
  '#E6965C',
  '#F04864',
  '#D66BCA',
  '#8543E0',
  '#8E77ED',
  '#3436C7',
  '#737EE6',
  '#223273',
  '#7EA2E6'
]

export const theme = {
  colors: COLOR_PLATE_8,
  colors16: COLOR_PLATE_16,
  colors24: COLOR_PLATE_24,
  colorsPie: COLOR_PIE,
  colorsPie16: COLOR_PIE_16
}

export const colorSpan = (color: string) => {
  return `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:8px;height:8px;background-color:${color};border: 1px solid #fff;"></span>`
}

export const defaultOptions = {
  color: COLOR_PLATE_8,
  tooltip: {
    textStyle: {
      fontSize: 12
    },
    padding: [10, 5]
  },
  grid: {
    left: 0,
    right: 0,
    top: 10,
    bottom: 5,
    containLabel: true
  },
  xAxis: {
    splitLine: {
      show: false
    },
    axisLabel: {
      color: '#797979',
      margin: 12
    },
    axisTick: {
      show: true,
      alignWithLabel: true
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#bebebe'
      }
    },
    axisPointer: {
      status: 'hide'
    }
  },
  miniXAxis: {
    axisLabel: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisPointer: {
      status: 'hide'
    }
  },
  yAxis: {
    axisLabel: {
      color: '#797979'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dotted'
      }
    }
  },
  series: {
    line: {
      itemStyle: {
        shadowBlur: 15,
        borderWidth: 1,
        borderColor: '#fff'
      },
      getItemStyle: (color: string) => {
        return {
          color: color,
          shadowColor: color,
          shadowBlur: 15,
          borderWidth: 1,
          borderColor: '#fff'
        }
      },
      showSymbol: false,
      symbol: 'circle',
      symbolSize: 2
    }
  }
}
