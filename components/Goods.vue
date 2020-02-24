<template>
  <div id="goods">
    <Merchandise v-for="(image, index) in images" :key="index" :src="image.src" :title="image.title">
      <ul>
        <li v-for="(content, ind) in image.contents" :key="ind">
          {{ content.line }}
        </li>
      </ul>
    </Merchandise>
  </div>
</template>

<script>
import Merchandise from './small/goods/Merchandise.vue'
export default {
  components: {
    Merchandise
  },
  data() {
    return {
      images: JSON.parse(
        '[{"src": "goods-1","title": "Pallets EPAL",' +
          '"contents": [{ "line": "EPAL - 1200 x 800 mm" },{ "line": "EPAL 2 - 1200 x 1000 mm" },{ "line": "EPAL 3 - 1000 x 1200 mm" }]},{"src": "goods-2","title": "CP pallets",' +
          '"contents": [{ "line": "CP1 - 1200 x 1000 mm" },{ "line": "CP2 - 1200 x 800 mm" },{ "line": "CP3 - CP9" }]},{"src": "goods-3","title": "Used pallets",' +
          '"contents": [{ "line": "Class I (light) EPAL" },{ "line": "Class I (light) MIX" },{ "line": "Class II (dark)" }]}]'
      ),
      goods: [],
      marginTop: 100,
      resizing: null,
      scrollListener: null
    }
  },
  mounted() {
    this.regulateMerchScrollHandler()

    addEventListener('resize', this.regulateMerchScrollHandler)
  },
  methods: {
    regulateMerchScrollHandler() {
      if (window.matchMedia('(min-width: 0px) and (max-width: 500px)').matches) {
        const forOfs = 0
        const backOfs = -100
        const biasFor = 100
        const biasBack = 100

        this.goods = this.getMerch(forOfs, backOfs)

        this.changeOnWith(1, 0, 100)

        this.scrollListener = this.merchSrollHandler(biasFor, biasBack)

        addEventListener('scroll', this.scrollListener)
      } else if (window.matchMedia('(min-width: 500px) and (max-width: 700px)').matches) {
        const forOfs = 50
        const backOfs = -100
        const biasFor = 50
        const biasBack = 50

        this.goods = this.getMerch(forOfs, backOfs)

        this.changeOnWith(1, -50, 50)
        // this.changeOnWith(2, -150, 25)

        this.scrollListener = this.merchSrollHandler(biasFor, biasBack)

        addEventListener('scroll', this.scrollListener)
      } else if (window.matchMedia('(min-width: 700px) and (max-width: 1600px)').matches) {
        const forOfs = 0
        const backOfs = -150
        const biasFor = 50
        const biasBack = 50

        this.goods = this.getMerch(forOfs, backOfs)
        this.changeOnWith(1, 0, 100)
        this.changeOnWith(2, -150, 25)

        this.scrollListener = this.merchSrollHandler(biasFor, biasBack)

        addEventListener('scroll', this.scrollListener)
      } else {
        const biasFor = 100
        const biasBack = 100

        this.goods = this.getMerch()
        this.changeOnWith(1, 0, 100)

        this.scrollListener = this.merchSrollHandler(biasFor, biasBack)

        addEventListener('scroll', this.scrollListener)
      }
    },
    merchSrollHandler(biasFor, biasBack) {
      // && el.pos.bottom - el.h / 2 >= 0
      return function() {
        const bF = biasFor
        const bB = biasBack
        this.goods.forEach(el => (el.pos = el.elem.getBoundingClientRect()))
        this.goods.forEach((el, index) => {
          if (Math.abs(el.pos.top) <= el.h) {
            if (el.layout === 'right') {
              el.elem.style.transform = `translateX(${el.transform}px)`
              el.transform -= bF
            } else {
              el.elem.style.transform = `translateX(${el.transform}px)`
              el.transform += bF
            }
            el.elem.style.opacity = `${el.opacity}`
            el.opacity += 0.15
          } else {
            if (el.layout === 'right') {
              el.elem.style.transform = `translateX(${el.transform}px)`
              el.transform += bB
            } else {
              el.elem.style.transform = `translateX(${el.transform}px)`
              el.transform -= bB
            }
            el.elem.style.opacity = `${el.opacity}`
            el.opacity -= 0.15
          }
        })
      }.bind(this)
    },
    changeOnWith(index, bOfs, fOfs) {
      if (this.goods.length - 1 < index || index < 0) return
      Object.defineProperty(this.goods[index], 'transform', {
        get() {
          return this.tr
        },
        set(val) {
          let actualVal = val - this.tr
          function getNearest() {
            if (actualVal < 0) actualVal++
            else actualVal--
          }
          while (this.tr + actualVal < bOfs || this.tr + actualVal > fOfs) getNearest()

          this.tr = this.tr + actualVal
        },

        configurable: true,
        enumerable: true
      })
      this.goods[index].tr = bOfs
    },
    getMerch(forOfs = 100, backOfs = -100) {
      return Array.from(document.getElementsByClassName('merch')).map((el, index) => {
        return {
          elem: el,
          h: el.offsetHeight + this.marginTop,
          pos: el.getBoundingClientRect(),
          set transform(val) {
            let actualVal = val - this.tr
            function getNearest() {
              if (actualVal < 0) actualVal++
              else actualVal--
            }
            if ((this.tr === backOfs || this.tr === forOfs) && Math.sign(this.tr) === Math.sign(actualVal)) return
            while (this.tr + actualVal < backOfs || this.tr + actualVal > forOfs) getNearest()
            // if (this.tr + (val - this.tr) < backOfs || this.tr + (val - this.tr) > forOfs) {
            //   return
            // }
            this.tr += actualVal
          },
          get transform() {
            return this.tr
          },
          set opacity(val) {
            let actualVal = val - this.op
            function getNearest() {
              if (actualVal < 0) actualVal += 0.01
              else actualVal -= 0.01
            }
            while (this.op + actualVal < 0.15 || this.op + actualVal > 1) getNearest()

            this.op += actualVal
          },
          get opacity() {
            return Math.round(this.op * 100) / 100
          },
          layout: index % 2 ? 'right' : 'left',
          tr: backOfs,
          op: 0.15
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#goods {
  display: flex;
  grid-area: goods;

  overflow-x: hidden;
  margin-top: 70px;

  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
