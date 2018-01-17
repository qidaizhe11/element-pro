function computeHeight(node) {
  const totalHeight = parseInt(getComputedStyle(node).height || '', 10)
  const padding =
    parseInt(getComputedStyle(node).paddingTop || '', 10) +
    parseInt(getComputedStyle(node).paddingBottom || '', 10)
  return totalHeight - padding
}

function getAutoHeight(n) {
  if (!n) {
    return 0
  }

  let node = n

  console.log('getAutoHeight.')

  let height = computeHeight(node.$el)

  while (!height) {
    node = node.$parent
    if (node) {
      height = computeHeight(node.$el)
    } else {
      break
    }
  }

  return height
}

export default {
  data() {
    return {
      computeHeight: 0
    }
  },
  methods: {},
  mounted() {
    this.$nextTick(() => {
      if (!this.height) {
        const h = getAutoHeight(this)
        this.computeHeight = h
      }
    })
  }
}
