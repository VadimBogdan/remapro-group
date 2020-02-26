<template>
  <div class="carouselItem">
    <img draggable="false" :src="require('~/assets/carousel/' + imageId + '.jpg')" class="carouselItem__image" />
    <div class="carouselItem__innerElements--banner">
      <h2>
        <slot name="header"
          >Certified EPAL, UIC and CP pallets <br />
          of top quality</slot
        >
      </h2>
      <p><slot name="paragraph">Production, sales, purchase, repair, and delivery of pallets</slot></p>
    </div>
    <ul class="carouselItem__innerElements--buttonsContainer">
      <li>
        <a class="gotoButton" :href="link">Detailed</a>
      </li>
      <li>
        <a class="gotoButton" href @click.prevent="scrollToContact">Contacts us</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
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
    imageId: {
      type: Number,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    isMouseDown: {
      type: Boolean
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
    // movingClasses() {
    //   return {
    //     active: this.isActive
    //     // forward: this.isForwarding && !this.isActive,
    //     // backward: this.isMovingBackward
    //   }
    // },
    hiddingShowingCarouselImageClass() {
      return {
        hide_anim: this.switchHelper.isHidingAnim,
        hide_carouselItem__image: this.switchHelper.isHiding,
        show_anim: this.switchHelper.isShowingAnim,
        show_carouselItem__image: this.switchHelper.isShowing
      }
    },
    touchedClass() {
      return {
        touched_backward_dependent: this.touchedHelper.isTouchingBackward && this.touchedHelper.isDependent,
        touched: this.touchedHelper.isTouchingBackward || this.touchedHelper.isTouchingForward
      }
    },
    untouchedClass() {
      return {
        untouched_backward_dependent_slideout: this.untouchedHelper.isRecentlyUntouched,
        untouched_backward_dependent: this.untouchedHelper.isUntouched
      }
    }
  },
  methods: {
    scrollToContact() {
      // if (this.isMouseDown) return

      const top = document.getElementById('contact').getBoundingClientRect().top - 80
      window.scroll({ top, behavior: 'smooth' })
    }
  }
}
</script>

<style lang="scss" scoped>
.carouselItem {
  position: relative;
  // transition: all 650ms ease-in-out;

  user-select: none;
  -moz-user-select: none;
  // pointer-events: none;

  // z-index: -1;
  width: 1663px;
  height: 450px;
  // transform: translate(-100%);
  &__innerElements {
    &--buttonsContainer {
      > li {
        float: left;
        margin: 0 20px;
      }
      position: absolute;
      list-style: none;
      left: 50%;
      top: 60%;
      transform: translate(-50%);
      z-index: 1000;
      padding: 0;
      margin: 0;
      &::after {
        content: ' ';
        visibility: hidden;
        display: block;
        height: 0;
        clear: both;
      }
    }
    &--banner {
      position: relative;
      z-index: 1000;
      max-width: 920px;
      margin: 0 auto;
      background-color: rgba(255, 255, 255, 0.75);
      text-align: center;
      > p {
        font-size: 18px;
        line-height: 2;
        text-align: center;
        display: inline-block;
        letter-spacing: 1px;
        text-shadow: 0 0px 1px rgba(155, 155, 155, 0.7);
      }
    }
  }

  .carouselItem__image {
    position: absolute;
    width: 100%;
    height: 100%;

    user-select: none;
    -moz-user-select: none;

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
.active {
  z-index: 1000; // !important;
  // transform: translate(0);
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
.hide_carouselItem__image {
  transition: none !important;
  left: -100% !important;
}
.show_carouselItem__image {
  transition: none !important;
  left: 0 !important;
}
.hide_anim {
  animation: 0.325s shutters;
}
.show_anim {
  animation: 0.325s shutters reverse;
}
@media screen and (max-width: 1150px) {
  .carouselItem__innerElements--banner {
    max-width: 700px;
  }
}
@media screen and (max-width: 860px) {
  .carouselItem__innerElements--banner {
    max-width: 600px;
  }
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
