
<script lang="ts">
import Vue, { VNode } from 'vue'

function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val
}

export default Vue.extend({
  props: {
    target: [Date, Number]
  },
  data() {
    const timer: any = null
    return {
      lastTime: 0,
      timer,
      interval: 1000
    }
  },
  watch: {
    target: function(val, oldVal) {
      clearTimeout(this.timer)
      const { lastTime } = this.initTime(val)
      this.lastTime = lastTime
      this.$nextTick(() => {
        this.tick()
      })
    }
  },
  created() {
    const { lastTime } = this.initTime()
    this.lastTime = lastTime
  },
  mounted() {
    this.tick()
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    initTime(newTarget: any = null) {
      const target: any = newTarget || this.target
      let lastTime = 0
      let targetTime = 0
      try {
        if (Object.prototype.toString.call(target) === '[object Date]') {
          targetTime = target.getTime()
        } else {
          targetTime = new Date(target).getTime()
        }
      } catch (e) {
        throw new Error('invalid target prop')
      }

      lastTime = targetTime - new Date().getTime()
      return {
        lastTime: lastTime < 0 ? 0 : lastTime
      }
    },
    tick() {
      const { lastTime } = this

      this.timer = setTimeout(() => {
        if (lastTime < this.interval) {
          clearTimeout(this.timer)
          this.lastTime = 0
          this.$emit('end')
        } else {
          this.lastTime = lastTime - this.interval
          // this.$nextTick(() => {
          //   this.tick()
          // })
          this.tick()
        }
      }, this.interval)
    },
    renderDefaultFormat(time: number) {
      const hours = 60 * 60 * 1000
      const minutes = 60 * 1000

      const h = Math.floor(time / hours)
      const m = Math.floor((time - h * hours) / minutes)
      const s = Math.floor((time - h * hours - m * minutes) / 1000)

      const content = `${fixedZero(h)}:${fixedZero(m)}:${fixedZero(s)}`

      return this.$createElement('span', content)
    }
  },
  render(h: any): VNode {
    const { lastTime } = this
    return h(
      'span',
      {
        props: this.$attrs,
        on: this.$listeners
      },
      [this.renderDefaultFormat(lastTime)]
    )
  }
})
</script>
