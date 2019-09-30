<template>
  <div
    class="carousel_image_container"
    :class="[movingClasses, hiddingShowingCarouselImageClass, touchedClass, untouchedClass]"
    :style="[touchedDependentStyles, touchedIndependentStyles]"
    draggable="false"
    ondragstart="return false;"
    @touchstart="$emit('touchstart', { clientX: $event.changedTouches[0].clientX, id: id })"
    @touchend="$emit('touchend', { clientX: $event.changedTouches[0].clientX, id: id })"
    @touchmove="$emit('touchmove', { clientX: $event.changedTouches[0].clientX, id: id })"
    @touchcancel="$emit('touchcancel', { clientX: $event.changedTouches[0].clientX, id: id })"
  >
    <img :src="src" class="carousel_image">
    <div class="carousel_image--more">
      MORE
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean
    },
    isForwarding: {
      type: Boolean
    },
    isMovingBackward: {
      type: Boolean
    },
    switchHelper: {
      type: Object,
      required: true
    },
    touchedHelper: {
      type: Object,
      required: true
    },
    untouchedHelper: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      touchStart: 0,
      touchEnd: 0
    }
  },
  computed: {
    touchedIndependentStyles() {
      if (this.touchedHelper.isDependent) {
        return
      }

      if (this.touchedHelper.isTouchingBackward) {
        return {
          left: `calc(${0}% - ${this.touchedHelper.touchStylesChangeLeftValue}px) !important`
        }
      } else if (this.touchedHelper.isTouchingForward) {
        return {
          left: `calc(${0}% - ${this.touchedHelper.touchStylesChangeRightValue}px) !important`
        }
      } else {
        return null
      }
    },
    touchedDependentStyles() {
      if (!this.touchedHelper.isDependent) {
        return
      }

      if (this.touchedHelper.isTouchingBackward) {
        return {
          left: `calc(${100}% - ${this.touchedHelper.touchStylesChangeLeftValue}px) !important`
        }
      } else if (this.touchedHelper.isTouchingForward) {
        return {
          left: `calc(${-100}% - ${this.touchedHelper.touchStylesChangeRightValue}px) !important`
        }
      } else {
        return null
      }
    },
    movingClasses() {
      return {
        'active_image': this.isActive,
        'forward': this.isForwarding && !this.isActive,
        'backward': this.isMovingBackward
      }
    },
    hiddingShowingCarouselImageClass() {
      return {
        'hide_anim': this.switchHelper.isHidingAnim,
        'hide_carousel_image': this.switchHelper.isHiding,
        'show_anim': this.switchHelper.isShowingAnim,
        'show_carousel_image': this.switchHelper.isShowing
      }
    },
    touchedClass() {
      return {
        'touched_backward_dependent': this.touchedHelper.isTouchingBackward && this.touchedHelper.isDependent,
        'touched_forward_dependent': this.touchedHelper.isTouchingForward && this.touchedHelper.isDependent,
        'touched_forward': this.touchedHelper.isTouchingForward && !this.touchedHelper.isDependent,
        'touched_backward': this.touchedHelper.isTouchingBackward && !this.touchedHelper.isDependent
      }
    },
    untouchedClass() {
      return {
        'untouched_backward_dependent_slideout': this.untouchedHelper.isRecentlyUntouched,
        'untouched_backward_dependent': this.untouchedHelper.isUntouched
      }
    }
  },
  methods: {
    logging(event) {
      console.log(event.changedTouches[0].clientX)
    },
    // lately rework
    logTouchStart(event) {
      this.touchStart = event.changedTouches[0].clientX
    },
    logTouchEnd(event) {
      this.touchEnd = event.changedTouches[0].clientX

      if ((this.touchStart - this.touchEnd) > 100) {
        this.$emit('swipe-carousel-photo', { id: this.id, direction: 'backward' })
      } else if ((this.touchStart - this.touchEnd) < -100) {
        this.$emit('swipe-carousel-photo', { id: this.id, direction: 'forward' })
      }

      this.touchStart = 0
      this.touchEnd = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel_image_container {
  position: absolute;
  transition: all 650ms ease-in-out;
  user-select: none;
  z-index: -1;
  width: 100%;
  height: 100%;
  left: -100%;
  .carousel_image {
    position: absolute;
    width: 100%;
    height: 100%;
    &--more {
      user-select: none;
      position: absolute;
      display: inline-block;
      width: auto;
      height: auto;
      color: white;
      border: 5px solid pink;
      top: calc(60% - #{$Half_of_MORE_height});
      left: 50%;
      &:active {
        background: yellow;
        color: black;
      }
    }
  }
}
.touched_forward {
  transition: none !important;
}
.touched_backward {
  transition: none !important;
}
.touched_forward_dependent {
  transition: none !important;
}
.touched_backward_dependent {
  transition: none !important;
  left: 100% !important;
}
.untouched_backward_dependent_slideout {
  left: 100% !important;
}
.untouched_backward_dependent {
  transition: none !important;
  left: -100% !important;
}
.active_image {
  z-index: 10 !important;
  left: 0 !important;
}
.backward {
  animation: backward_move 650ms ease-in-out 0ms 1 normal;
}
.forward {
  left: 100% !important;
}
@keyframes backward_move {
  from {
    left: 100%;
  }
  to {
    left: 0;
  }
}
.hide_carousel_image {
  transition: none !important;
  left: -100% !important;
}
.show_carousel_image {
  transition: none !important;
  left: 0 !important;
}
.hide_anim {
  animation: 0.325s shutters;
}
.show_anim {
  animation: 0.325s shutters reverse;
}
@keyframes shutters {
  0% {
    clip-path: polygon(
      0% 0%,
      20% 0%,
      20% 100%,
      20% 100%,
      20% 0%,
      40% 0%,
      40% 100%,
      40% 100%,
      40% 0%,
      60% 0%,
      60% 100%,
      60% 100%,
      60% 0%,
      80% 0%,
      80% 100%,
      80% 100%,
      80% 0%,
      100% 0%,
      100% 100%,
      0% 100%
    );
  }
  100% {
    clip-path: polygon(
      20% 0%,
      20% 0%,
      20% 100%,
      40% 100%,
      40% 0%,
      40% 0%,
      40% 100%,
      60% 100%,
      60% 0%,
      60% 0%,
      60% 100%,
      80% 100%,
      80% 0%,
      80% 0%,
      80% 100%,
      100% 100%,
      100% 0%,
      100% 0%,
      100% 100%,
      20% 100%
    );
  }
}
</style>
