<template>
  <div
    class="carousel_image_container"
    :class="[movingClasses, hiddingShowingCarouselImageClass, touchedClass, untouchedClass]"
    :style="[touchedDependentStyles, touchedIndependentStyles]"
    draggable="false"
    ondragstart="return false;"
    @touchstart.passive="$emit('touchstart', { clientX: $event.changedTouches[0].clientX })"
    @touchend.passive="$emit('touchend', { clientX: $event.changedTouches[0].clientX })"
    @touchcancel.passive="$emit('touchend', { clientX: $event.changedTouches[0].clientX })"
    @touchmove.passive="$emit('touchmove', { clientX: $event.changedTouches[0].clientX })"

    @mousedown.passive="$emit('touchstart', { clientX: $event.x }) && (isMouseDown = true)"
    @mousemove.passive="isMouseDown ? $emit('touchmove', { clientX: $event.x }) : 0"
    @mouseup.passive="$emit('touchend', { clientX: $event.x }) && (isMouseDown = false)"
    @mouseout.passive="$emit('touchend', { clientX: $event.x }) && (isMouseDown = false)"
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
      isMouseDown: false
    }
  },
  computed: {
    touchedIndependentStyles() {
      if (this.touchedHelper.isDependent) {
        return
      }
      if (this.touchedHelper.isTouchingBackward) {
        return {
          left: `calc(${0}% - ${this.touchedHelper.touchStylesChangeRightValue}px) !important`
        }
      } else if (this.touchedHelper.isTouchingForward) {
        return {
          left: `calc(${0}% - ${this.touchedHelper.touchStylesChangeLeftValue}px) !important`
        }
      } else {
        return undefined
      }
    },
    touchedDependentStyles() {
      if (!this.touchedHelper.isDependent) {
        return
      }
      if (this.touchedHelper.isTouchingBackward) {
        return {
          left: `calc(${100}% - ${this.touchedHelper.touchStylesChangeRightValue}px) !important`
        }
      } else if (this.touchedHelper.isTouchingForward) {
        return {
          left: `calc(${-100}% - ${this.touchedHelper.touchStylesChangeLeftValue}px) !important`
        }
      } else {
        return undefined
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
        'touched': this.touchedHelper.isTouchingBackward || this.touchedHelper.isTouchingForward
      }
    },
    untouchedClass() {
      return {
        'untouched_backward_dependent_slideout': this.untouchedHelper.isRecentlyUntouched,
        'untouched_backward_dependent': this.untouchedHelper.isUntouched
      }
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
.touched {
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
