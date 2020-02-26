/* eslint-disable */
export default {
  methods: {
    swipeEffects(x2) {
      if (!this.x1) {
        this.x1 = x2 // 1000
      } else {
        this.shift += x2 - this.x1

        this.$refs.container.style.transform = `translateX(${this.shift}px)`

        this.x1 = x2
      }
    },
    swipeEffectsClear() {
      this.$refs.container.style.transition = 'transform 500ms ease-in-out'
      // current item position (without added translation)
      let origin = -((this.activeIndex + 1) * this.imageWidth)
      let twistData = {}

      const percentages = Math.abs((this.shift - origin) * 100 / this.imageWidth)


      if (percentages >= 10) {
        if (this.shift > origin) {
          twistData = this.twistCarousel('front')
       } else {
          twistData = this.twistCarousel('back')
       }
      }
      
  
      if (!this.twisted)
        this.$refs.container.style.transform = `translateX(${origin}px)`

      setTimeout(() => {
        this.$refs.container.style.transition = ''
        setTimeout(() => {
          requestAnimationFrame(() => {
            if (twistData.newOrigin) {
              this.shift = twistData.newOrigin
              this.$refs.container.style.transform = `translateX(${this.shift}px)`
            } else if (twistData.shift) {
              this.shift = twistData.shift
            } else {
              this.shift = origin
            }
            this.$el.querySelector('.active').classList.remove('active')
            this.imagesElements[this.activeIndex].classList.add('active')
          })
        })
      }, 500)



      this.isSwipeReady = false
      setTimeout(() => {
        this.isSwipeReady = true
      }, 500)

      this.x1 = 0

      this.twisted = false
    },
    correctPosition(pos) {
      if (pos === 'first') {
        this.activeIndex = 0
      } else if (pos === 'last') {
        this.activeIndex = this.imagesElements.length - 1
      }
      console.log(-((this.activeIndex + 1) * this.imageWidth))
      return -((this.activeIndex + 1) * this.imageWidth)
    },
    // swipeCarouselPhoto(direction, id) {
    //   this.photoCarouselActionsDebounced(direction, id)
    // },
    throttlingSimple(f, ms) {
      var isCooldown = false

      return function() {
        if (isCooldown) {
          return
        }

        f()

        isCooldown = true

        setTimeout(() => (isCooldown = false), ms)
      }
    },
    throttlingSpecial(obj, ms) {
      var isCooldown = false

      return function(key, ...optional) {
        if (isCooldown) {
          return
        }

        // added spread
        obj[key](...optional)

        isCooldown = true

        setTimeout(() => (isCooldown = false), ms)
      }
    },
    switchChangeImage(newActiveIndex) {
      let length = this.imagesElements.length - 1
      let correctionDistance = 0
      this.$refs.container.style.transition = 'transform 500ms ease-in-out'
      if (this.activeIndex === 0 && newActiveIndex === length) {
        correctionDistance = this.twistCarousel('front')
      } else if (this.activeIndex === length && newActiveIndex === 0) {
        correctionDistance = this.twistCarousel('back')
      } else if (this.activeIndex > newActiveIndex) {
        this.twistCarousel('front')
      } else {
        this.twistCarousel('back')
      }
      setTimeout(() => {
        this.$refs.container.style.transition = ''
        requestAnimationFrame(() => {
          if (correctionDistance) {
            this.$refs.container.style.transform = `translateX(${correctionDistance}px)`
          }
          this.$el.querySelector('.active').classList.remove('active')
          this.imagesElements[this.activeIndex].classList.add('active')
        })
      }, 500)
    },
    twistCarousel(direction) {
        this.twisted = true

        let shift = 0
        let newOrigin = 0

        if (direction === 'front') {

          if (this.imagesElements[this.activeIndex].previousElementSibling.classList.contains('clone')) {
            this.outbound = true

            shift = -((this.activeIndex) * this.imageWidth)
          } else {
            this.activeIndex--

            shift = -((this.activeIndex + 1) * this.imageWidth)
          }

        } else if (direction === 'back') {

          if (this.imagesElements[this.activeIndex].nextElementSibling.classList.contains('clone')) {
            this.outbound = true

            shift = -((this.activeIndex + 2) * this.imageWidth)
          } else {
            this.activeIndex++

            shift = -((this.activeIndex + 1) * this.imageWidth)
          }

        }

        if (this.outbound) {
          if (this.activeIndex === this.imagesElements.length - 1) {
            newOrigin = this.correctPosition('first')
          } else {
            newOrigin = this.correctPosition('last')
          }
        }

        this.outbound = false
        this.$refs.container.style.transform = `translateX(${shift}px)`
        return { newOrigin, shift }
      }
    }
  }

