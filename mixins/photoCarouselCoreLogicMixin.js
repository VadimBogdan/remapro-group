/* eslint-disable */
export default {
  methods: {
    swipeEffects(distance) {
      if (!this.start) {
        this.path = distance
        this.start = +/-?\d+/.exec(this.$refs.container.style.transform)[0]
      } else {
        this.start -= this.path - distance
        this.$refs.container.style.transform = `translateX(${this.start}px)`
        this.path = distance
        }
      },
    swipeEffectsClear() {
      this.$refs.container.style.transition = 'transform 500ms ease-in-out'
      let origin = -((this.activeIndex + 1) * this.imageWidth)
      let correctionDistance = 0

      const percentages = Math.abs((this.start - origin) * 100 / this.imageWidth)

      if (this.start > origin) {
        if (percentages >= 10) correctionDistance = this.twistCarousel('front')
      } else {
        if (percentages >= 10) correctionDistance = this.twistCarousel('back')
      }
        if (!this.twisted) {
          let distance = -((this.activeIndex + 1) * this.imageWidth)
          this.$refs.container.style.transform = `translateX(${distance}px)`
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



      this.isSwipeReady = false
      setTimeout(() => {
        this.isSwipeReady = true
      }, 500)

      this.start = 0
      this.path = 0

      this.twisted = false
    },
    correctPosition(pos) {
      let distance = 0
      if (pos === 'first') {
        this.activeIndex = 0
      } else if (pos === 'last') {
        this.activeIndex = this.imagesElements.length - 1
      }
      return distance = -((this.activeIndex + 1) * this.imageWidth)
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
        let distance = 0
        let correctionDistance = 0
        if (direction === 'front') {
          if (this.imagesElements[this.activeIndex].previousElementSibling.classList.contains('clone')) {
            this.outbound = true
            distance = -((this.activeIndex) * this.imageWidth)
          } else {
            this.activeIndex--
            distance = -((this.activeIndex + 1) * this.imageWidth)
          }
        } else if (direction === 'back') {
          if (this.imagesElements[this.activeIndex].nextElementSibling.classList.contains('clone')) {
            distance = -((this.activeIndex + 2) * this.imageWidth)
            this.outbound = true
          } else {
            this.activeIndex++
            distance = -((this.activeIndex + 1) * this.imageWidth)
          }
        }
        if (this.outbound) {
          if (this.activeIndex === this.imagesElements.length - 1) {
            correctionDistance = this.correctPosition('first')
          } else {
            correctionDistance = this.correctPosition('last')
          }
        }
        this.outbound = false
        this.$refs.container.style.transform = `translateX(${distance}px)`
        return correctionDistance
      }
    }
  }

