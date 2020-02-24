<template>
  <div class="carousel">
    <Arrow class="arrow_backward" @click.native="photoCarouselActionsDebounced('backward')" />
    <Arrow class="arrow_forward" @click.native="photoCarouselActionsDebounced('forward')" />
    <div
      ref="container"
      class="carousel-images"
      @touchstart="touch($event)"
      @touchmove="touch($event)"
      @touchend="touchEnd($event)"
      @touchcancel="touchEnd($event)"
      @mousedown="mouseDown($event)"
      @mouseup="mouseUp($event)"
      @mousemove="mouseMove($event)"
      @mouseout="mouseOut($event)"
    >
      <CarouselImage
        class="clone"
        v-bind="images[2]"
        :image-id="2"
        :is-mouse-down="isMouseDown"
        @swipe-carousel-photo="swipeCarouselPhoto($event.direction, $event.id)"
      >
        <template v-slot:header>{{ images[2].header }}</template>
        <template v-slot:paragraph>{{ images[2].paragraph }}</template>
      </CarouselImage>
      <CarouselImage
        v-for="(image, index) in images"
        :key="index"
        v-bind="image"
        :image-id="index"
        :is-mouse-down="isMouseDown"
        @swipe-carousel-photo="swipeCarouselPhoto($event.direction, $event.id)"
      >
        <template v-slot:header>{{ image.header }}</template>
        <template v-slot:paragraph>{{ image.paragraph }}</template>
      </CarouselImage>
      <CarouselImage
        class="clone"
        v-bind="images[0]"
        :image-id="0"
        :is-mouse-down="isMouseDown"
        @swipe-carousel-photo="swipeCarouselPhoto($event.direction, $event.id)"
      >
        <template v-slot:header>{{ images[0].header }}</template>
        <template v-slot:paragraph>{{ images[0].paragraph }}</template>
      </CarouselImage>
    </div>
    <ImageSwitcher
      :images="images"
      :length="imagesElements.length - 1"
      :active-index="activeIndex"
      @change-image-pos="photoCarouselActionsDebounced('switch', $event)"
    />
  </div>
</template>

<script>
import photoCarouselCoreLogicMixin from '@/mixins/photoCarouselCoreLogicMixin.js'

import Arrow from '@/components/small/carousel/Arrow.vue'
import CarouselImage from '@/components/small/carousel/CarouselImage.vue'
import ImageSwitcher from '@/components/small/carousel/ImageSwitcher.vue'

export default {
  components: {
    Arrow,
    CarouselImage,
    ImageSwitcher
  },
  mixins: [photoCarouselCoreLogicMixin],
  data() {
    return {
      imagesElements: [],
      path: 0,
      twisted: false,
      isMouseDown: false,
      activeIndex: 0,
      imageWidth: 1663,
      outbound: false,
      // backFrom: 0,
      // backTo: 3,
      // frontFrom: 4,
      // frontTo: 1,

      currentImageIndex: 0,
      twistCarouselDebounced: null,
      photoCarouselActionsDebounced: null,
      swipeIndicators: null,
      isSwipeReady: true,
      currentlyDependentFrontPhotoPos: undefined,
      currentlyDependentBackPhotoPos: undefined,
      currentlyIndependentPhotoPos: undefined,
      images: [
        {
          paragraph: 'Certified EPAL, UIC and CP pallets of top quality',
          header: 'Production, sales, purchase, repair, and delivery of pallets',
          link: '/pallets-epal-uic',
          isForwarding: false,
          isMovingBackward: false,
          touchedHelper: {
            isTouchingBackward: false,
            isTouchingForward: false,
            isDependent: null,
            touchStyles: null,
            touchStylesChangeLeftValue: 0,
            touchStylesChangeRightValue: 0
          },
          untouchedHelper: {
            isRecentlyUntouched: false,
            isUntouched: false
          },
          switchHelper: {
            isHiding: false,
            isShowing: false,
            isHidingAnim: false,
            isShowingAnim: false
          }
        },
        {
          paragraph:
            'Deliveries via our own transport. Guaranteed delivery of any volume of goods' +
            'all over Ukraine and Europe every day of the year: 365 / 7 / 24 service',
          header: 'Logistics',
          link: '/logistic',
          isForwarding: false,
          isMovingBackward: false,
          touchedHelper: {
            isTouchingBackward: false,
            isTouchingForward: false,
            isDependent: null,
            touchStyles: null,
            touchStylesChangeLeftValue: 0,
            touchStylesChangeRightValue: 0
          },
          untouchedHelper: {
            isRecentlyUntouched: false,
            isUntouched: false
          },
          switchHelper: {
            isHiding: false,
            isShowing: false,
            isHidingAnim: false,
            isShowingAnim: false
          }
        },
        {
          paragraph:
            'All types of pallets. Wholesale and individual orders.' +
            'We purchase pallets all over Ukraine and deliver it via our own transport',
          header: 'Purchase, repair and sales of used pallets',
          link: '/used-pallets',
          isForwarding: false,
          isMovingBackward: false,
          touchedHelper: {
            isTouchingBackward: false,
            isTouchingForward: false,
            isDependent: null,
            touchStyles: null,
            touchStylesChangeLeftValue: 0,
            touchStylesChangeRightValue: 0
          },
          untouchedHelper: {
            isRecentlyUntouched: false,
            isUntouched: false
          },
          switchHelper: {
            isHiding: false,
            isShowing: false,
            isHidingAnim: false,
            isShowingAnim: false
          }
        }
      ]
    }
  },
  updated() {
    this.getMaxLeftScrolling()
    this.imagesElements[this.activeIndex].classList.add('active')
    // this.frontFrom = this.imagesElements.length - 1
  },
  // beforeDestroy() {
  //   window.removeEventListener('resize', this.getMaxLeftScrolling)
  //   window.removeEventListener('load', this.getMaxLeftScrolling)
  //   this.$nuxt.$off('routeChanged', this.getMaxLeftScrolling)
  // },
  mounted() {
    window.addEventListener('resize', this.getMaxLeftScrolling)
    window.addEventListener('load', this.getMaxLeftScrolling)
    this.$nuxt.$on('routeChanged', this.getMaxLeftScrolling)
    setTimeout(this.getMaxLeftScrolling, 1)

    this.getMaxLeftScrolling()
    this.imagesElements = Array.from(this.$el.querySelectorAll('.carouselItem:not(.clone)'))
    this.imagesElements[this.activeIndex].classList.add('active')
    this.imagesElements.forEach(el => (el.style.width = `${this.imageWidth}px`))
    this.frontFrom = this.imagesElements.length - 1

    this.toActive()

    this.photoCarouselActionsDebounced = this.throttlingSpecial(
      {
        // forward: this.twistCarousel.bind(this, 'forward'),
        // backward: this.twistCarousel.bind(this, 'backward'),
        switch: this.switchChangeImage,
        swipeClear: this.swipeEffectsClear
      },
      500
    )
  },
  methods: {
    toActive() {
      const translate = -((this.activeIndex + 1) * this.imageWidth)
      this.$refs.container.style.transform = `translateX(${translate}px)`
    },
    touch(e) {
      if (this.isSwipeReady) {
        this.swipeEffects(e.changedTouches[0].clientX)
      }
    },
    touchEnd(e) {
      this.photoCarouselActionsDebounced('swipeClear')
    },
    mouseOut(e) {
      if (!this.isMouseDown) {
        return
      }
      this.isMouseDown = false
      this.photoCarouselActionsDebounced('swipeClear')
    },
    mouseMove(e) {
      if (!this.isMouseDown) {
        return
      }
      this.swipeEffects(e.clientX)
    },
    mouseUp(e) {
      if (this.isSwipeReady) {
        this.swipeEffects(e.clientX)
      }
      this.isMouseDown = false
      this.photoCarouselActionsDebounced('swipeClear')
    },
    mouseDown(e) {
      if (this.isSwipeReady) {
        this.swipeEffects(e.clientX)
      }
      this.isMouseDown = true
    },
    getMaxLeftScrolling() {
      if (!document.querySelector('.carousel').clientWidth) {
        this.imageWidth = 1663
        return
      }
      this.imageWidth = document.querySelector('.carousel').clientWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  grid-area: carousel;
  cursor: pointer;
  height: 450px;
  width: 100%;
  max-width: 1663px;
  align-self: end;
  position: relative;
  overflow: hidden;
  background: black;
  // z-index: 1;
  &-images {
    display: inline-flex;
    transform-origin: center;
  }

  margin: 0 auto;
  .arrow_backward {
    transform: rotate(180deg);
    z-index: 1000;
    top: calc(50% - #{$Half_of_arrow_width});
  }
  .arrow_forward {
    z-index: 1000;
    top: calc(50% - #{$Half_of_arrow_width});
    right: 0;
  }
}
</style>
