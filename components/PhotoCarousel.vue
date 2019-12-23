<template>
  <div class="carousel_container">
    <Arrow class="arrow_backward" @click.native="photoCarouselActionsDebounced('backward')" />
    <Arrow class="arrow_forward" @click.native="photoCarouselActionsDebounced('forward')" />
    <div>
      <CarouselImage
        v-for="image in images"
        :key="image.id"
        v-bind="image"
        @swipe-carousel-photo="swipeCarouselPhoto($event.direction, $event.id)"
        @touchmove.passive="isSwipeReady ? swipeEffects($event.clientX) : 0"
        @touchstart.passive="isSwipeReady ? swipeEffects($event.clientX) : 0"
        @touchend.passive="photoCarouselActionsDebounced('swipeClear')"
        @mousemove.passive="isSwipeReady ? swipeEffects($event.clientX) : 0"
      />
      <ul class="switchers-container">
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
import photoCarouselCoreLogicMixin from '@/mixins/photoCarouselCoreLogicMixin.js'

import Arrow from '@/components/small/carousel/Arrow.vue'
import CarouselImage from '@/components/small/carousel/CarouselImage.vue'
import CarouselImageSwitcher from '@/components/small/carousel/CarouselImageSwitcher.vue'

export default {
  components: {
    Arrow,
    CarouselImage,
    CarouselImageSwitcher
  },
  mixins: [photoCarouselCoreLogicMixin],
  data() {
    return {
      currentPhotoPos: 0,
      twistCarouselDebounced: null,
      photoCarouselActionsDebounced: null,
      swipeIndicators: null,
      isSwipeReady: true,
      imageMaxWidth: 0,
      currentlyDependentFrontPhotoPos: undefined,
      currentlyDependentBackPhotoPos: undefined,
      currentlyIndependentPhotoPos: undefined,
      photosQuantity: 0,
      images: [
        {
          src: 'carousel-1',
          id: 0,
          isActive: true,
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
          src: 'carousel-2',
          id: 1,
          isActive: false,
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
          src: 'carousel-3',
          id: 2,
          isActive: false,
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
  created() {
    this.photoCarouselActionsDebounced = this.throttlingSpecial(
      {
        forward: this.twistCarousel.bind(this, 'forward'),
        backward: this.twistCarousel.bind(this, 'backward'),
        switch: this.switchChangeImage,
        swipeClear: this.swipeEffectsClear
      },
      725
    )
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.changeMaxLeftScrolling)
  },
  mounted() {
    window.addEventListener('resize', this.changeMaxLeftScrolling)

    this.imageMaxWidth = document.getElementsByClassName('carousel_image_container')[0].clientWidth

    this.photosQuantity = document.getElementsByClassName('carousel_image_container').length
  },
  methods: {
    changeMaxLeftScrolling() {
      this.imageMaxWidth = document.getElementsByClassName('carousel_image_container')[0].clientWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel_container {
  grid-area: carousel;
  cursor: pointer;
  height: 350px;
  width: 100%;
  // min-width: 150px;
  align-self: end;
  position: relative;
  overflow: hidden;
  background: black;
  z-index: 1;
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
.switchers-container {
  position: absolute;
  list-style: none;

  left: 50%;
  top: 85%;

  padding: 0;
  margin: 0;

  li {
    float: left;
  }
  .switcher {
    z-index: 500;
  }
}
</style>
