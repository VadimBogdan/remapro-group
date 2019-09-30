<template>
  <div class="carousel_container">
    <div class="arrows">
      <Arrow
        class="arrow_backward"
        @click.native="photoCarouselActionsDebounced('backward')"
      />
      <Arrow
        class="arrow_forward"
        @click.native="photoCarouselActionsDebounced('forward')"
      />
    </div>
    <div>
      <CarouselImage
        v-for="image in images"
        :id="image.id"
        :key="image.id"
        :src="image.src"
        :is-active="image.isActive"
        :is-moving-backward="image.isMovingBackward"
        :is-forwarding="image.isForwarding"
        :touched-helper="image.touchedHelper"
        :switch-helper="image.switchHelper"
        :untouched-helper="image.untouchedHelper"
        @swipe-carousel-photo="swipeCarouselPhoto($event.direction, $event.id)"
        @touchmove="photoCarouselActionsDebounced('swipe', $event.clientX, $event.id)"
        @touchstart="photoCarouselActionsDebounced('swipe', $event.clientX, $event.id)"
        @touchend="swipeEffectsClear($event.id)"
        @touchcancel="swipeEffectsClear($event.id)"
      />
      <ul class="switchers_container">
        <li
          is="CarouselImageSwitcher"
          v-for="image in images"
          :id="image.id"
          :key="image.id"
          :current-photo-pos="currentPhotoPos"
          class="switcher"
          @change-image-pos="photoCarouselActionsDebounced('switch', $event)"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Arrow from '@/components/small/Arrow.vue'
import CarouselImage from '@/components/small/CarouselImage.vue'
import CarouselImageSwitcher from '@/components/small/CarouselImageSwitcher.vue'

export default {
  components: {
    Arrow,
    CarouselImage,
    CarouselImageSwitcher
  },
  data() {
    return {
      currentPhotoPos: 0,
      twistCarouselDebounced: null,
      photoCarouselActionsDebounced: null,
      swipeIndicators: null,
      currentlyDependentPhotoPos: null,
      currentlyIndependentPhotoPos: null,
      images: [
        {
          src: '/carousel-1.jpg',
          id: 0,
          isActive: true,
          isForwarding: false,
          isMovingBackward: false,
          touchedHelper: { isTouchingBackward: false,
            isTouchingForward: false,
            isDependent: null,
            touchStyles: null,
            touchStylesChangeLeftValue: 0,
            touchStylesChangeRightValue: 0 },
          untouchedHelper: {
            isRecentlyUntouched: false,
            isUntouched: false
          },
          switchHelper: { isHiding: false, isShowing: false, isHidingAnim: false, isShowingAnim: false }
        },
        {
          src: '/carousel-2.jpg',
          id: 1,
          isActive: false,
          isForwarding: false,
          isMovingBackward: false,
          touchedHelper: { isTouchingBackward: false,
            isTouchingForward: false,
            isDependent: null,
            touchStyles: null,
            touchStylesChangeLeftValue: 0,
            touchStylesChangeRightValue: 0 },
          untouchedHelper: {
            isRecentlyUntouched: false,
            isUntouched: false
          },
          switchHelper: { isHiding: false, isShowing: false, isHidingAnim: false, isShowingAnim: false }
        },
        {
          src: '/carousel-3.jpg',
          id: 2,
          isActive: false,
          isForwarding: false,
          isMovingBackward: false,
          touchedHelper: { isTouchingBackward: false,
            isTouchingForward: false,
            isDependent: null,
            touchStyles: null,
            touchStylesChangeLeftValue: 0,
            touchStylesChangeRightValue: 0 },
          untouchedHelper: {
            isRecentlyUntouched: false,
            isUntouched: false
          },
          switchHelper: { isHiding: false, isShowing: false, isHidingAnim: false, isShowingAnim: false }
        }
      ]
    }
  },
  computed: {
    photos() {
      return document
        .getElementsByClassName('carousel_container')[0]
        .querySelectorAll('.carousel_image')
    },
    photosQuantity() {
      return document
        .getElementsByClassName('carousel_container')[0]
        .querySelectorAll('.carousel_image').length
    },
    photosIndicator() {
      const indicator = new Array(this.photosLength).fill(false)
      indicator[0] = true
      return indicator
    }
  },
  created() {
    this.photoCarouselActionsDebounced = this.debounceSpecial({
      forward: this.twistCarouselWrap.bind(this, 'forward'),
      backward: this.twistCarouselWrap.bind(this, 'backward'),
      switch: this.switchChangeImage,
      swipe: this.swipeEffects
    }, 950)
  },
  methods: {
    swipeEffects(distance, id) {
      if (!this.swipeIndicators) {
        this.swipeIndicators = [distance]
      } else if (this.swipeIndicators.length === 1) {
        this.swipeIndicators.push(distance)
        // backward > 0
        if ((this.swipeIndicators[0] - this.swipeIndicators[1]) > 0) {
          // determination of dependent photo
          this.currentlyDependentPhotoPos = ((this.currentPhotoPos - 1) === -1 ? this.photosQuantity - 1 : this.currentPhotoPos - 1)
          this.currentlyIndependentPhotoPos = id
          this.images[this.currentlyDependentPhotoPos].touchedHelper.isTouchingBackward = true
          this.images[this.currentlyDependentPhotoPos].touchedHelper.isDependent = true
          this.images[this.currentlyIndependentPhotoPos].touchedHelper.isTouchingBackward = true
          this.images[this.currentlyIndependentPhotoPos].touchedHelper.isDependent = false
        } else {
          this.currentlyDependentPhotoPos = ((this.currentPhotoPos + 1) === this.photosQuantity ? 0 : this.currentPhotoPos + 1)
          this.currentlyIndependentPhotoPos = id
          this.images[this.currentlyDependentPhotoPos].touchedHelper.isTouchingForward = true
          this.images[this.currentlyDependentPhotoPos].touchedHelper.isDependent = true
          this.images[this.currentlyIndependentPhotoPos].touchedHelper.isTouchingForward = true
          this.images[this.currentlyIndependentPhotoPos].touchedHelper.isDependent = false
        }
      } else if (this.images[this.currentlyDependentPhotoPos].touchedHelper.isTouchingBackward) {
        // backward
        this.images[this.currentlyDependentPhotoPos].touchedHelper.touchStylesChangeLeftValue += this.swipeIndicators[1] - distance
        this.images[this.currentlyIndependentPhotoPos].touchedHelper.touchStylesChangeLeftValue += this.swipeIndicators[1] - distance
        this.swipeIndicators[1] = distance
      } else if (this.images[this.currentlyDependentPhotoPos].touchedHelper.isTouchingForward) {
        // forward
        this.images[this.currentlyDependentPhotoPos].touchedHelper.touchStylesChangeRightValue += this.swipeIndicators[1] - distance
        this.images[this.currentlyIndependentPhotoPos].touchedHelper.touchStylesChangeRightValue += this.swipeIndicators[1] - distance
        this.swipeIndicators[1] = distance
      }
    },
    swipeEffectsClear() {
      if (this.currentlyDependentPhotoPos === undefined || this.currentlyIndependentPhotoPos === undefined) {
        return
      }
      if (this.images[this.currentlyIndependentPhotoPos].touchedHelper.isTouchingBackward) {
        this.images[this.currentlyDependentPhotoPos].untouchedHelper.isRecentlyUntouched = true
        setTimeout(() => {
          this.images[this.currentlyDependentPhotoPos].untouchedHelper.isRecentlyUntouched = false
          this.images[this.currentlyDependentPhotoPos].untouchedHelper.isUntouched = true
        }, 650)
        setTimeout(() => {
          this.images[this.currentlyDependentPhotoPos].untouchedHelper.isUntouched = false
          this.currentlyDependentPhotoPos = undefined
        }, 700)
      }
      Object.keys(this.images[this.currentlyIndependentPhotoPos].touchedHelper).forEach((key) => {
        this.images[this.currentlyIndependentPhotoPos].touchedHelper[key] = false
      })
      Object.keys(this.images[this.currentlyIndependentPhotoPos].untouchedHelper).forEach((key) => {
        this.images[this.currentlyIndependentPhotoPos].touchedHelper[key] = false
      })
      Object.keys(this.images[this.currentlyDependentPhotoPos].touchedHelper).forEach((key) => {
        this.images[this.currentlyDependentPhotoPos].touchedHelper[key] = false
      })
      this.swipeIndicators = undefined
      this.currentlyIndependentPhotoPos = undefined
    },
    swipeCarouselPhoto(direction, id) {
      this.photoCarouselActionsDebounced(direction, id)
    },
    debounceSimple(f, ms) {
      let isCooldown = false

      return function (id) {
        if (isCooldown) {
          return
        }

        f()

        isCooldown = true

        setTimeout(() => (isCooldown = false), ms)
      }
    },
    debounceSpecial(obj, ms) {
      let isCooldown = false

      return function (key, ...optional) {
        if (isCooldown) {
          return
        }

        // added spread
        obj[key](...optional)

        isCooldown = true

        setTimeout(() => (isCooldown = false), ms)
      }
    },
    switchChangeImage(id) {
      if (id === this.currentPhotoPos) {
        return
      }
      const previousPhotoPos = this.currentPhotoPos
      this.currentPhotoPos = id
      this.images[previousPhotoPos].switchHelper.isHidingAnim = true
      setTimeout(() => {
        this.images[previousPhotoPos].isActive = false
        this.images[previousPhotoPos].switchHelper.isHiding = true
        this.images[previousPhotoPos].switchHelper.isHidingAnim = false
        this.images[id].switchHelper.isShowingAnim = true
        this.images[id].switchHelper.isShowing = true
      }, 321)
      setTimeout(() => {
        this.images[id].switchHelper.isShowing = false
        this.images[id].switchHelper.isShowingAnim = false
        this.images[previousPhotoPos].switchHelper.isHiding = false
        this.images[id].isActive = true
      }, 650)
    },
    twistCarouselWrap(direction) {
      const previousPhotoPos = this.currentPhotoPos
      if (direction === 'forward') {
        this.currentPhotoPos++
        if (this.photosQuantity === this.currentPhotoPos) {
          this.currentPhotoPos = 0
        }
        this.images[previousPhotoPos].isActive = false
        this.images[previousPhotoPos].isForwarding = true
        this.images[this.currentPhotoPos].isActive = true
        setTimeout(() => {
          this.images[previousPhotoPos].switchHelper.isHiding = true
          this.images[previousPhotoPos].isForwarding = false
        }, 650)
        setTimeout(() => {
          this.images[previousPhotoPos].switchHelper.isHiding = false
        }, 665)
      } else {
        this.currentPhotoPos--
        if (this.currentPhotoPos === -1) {
          this.currentPhotoPos = this.photosQuantity - 1
        }
        this.images[previousPhotoPos].isActive = false
        this.images[this.currentPhotoPos].isMovingBackward = true
        this.images[this.currentPhotoPos].isActive = true

        setTimeout(() => {
          this.images[this.currentPhotoPos].isMovingBackward = false
        }, 650)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel_container {
  border: 3px solid black;
  border-radius: 3px;
  max-height: 300px;
  max-width: 95%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  background: black;
  .arrows {
    z-index: 1000;
    position: absolute;
    height: auto;
    top: calc(50% - #{$Half_of_arrow_width});
    .arrow_backward {
      transform: rotate(180deg);
    }
    .arrow_forward {
      right: 0;
    }
  }
}
.switchers_container {
  position: absolute;
  width: auto;
  height: auto;
  left: 50%;
  top: 85%;
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: inline-block;
  }
  .switcher {
    z-index: 999;
  }
}
</style>
