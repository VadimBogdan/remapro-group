<template>
  <li class="carousel_image_switcher" :class="activeImageIndicationClass" @click="$emit('change-image-pos', id)" />
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    currentPhotoPos: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isIndicatorFirst: false
    }
  },
  computed: {
    activeImageIndicationClass() {
      const indication = this.id === this.currentPhotoPos
      return {
        active_indicator: indication,
        active_indicator_animation_1: indication && ((this.id % 3 === 0) || (this.id % 3) === 1),
        active_indicator_animation_2: indication && (this.id % 3) === 2
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel_image_switcher {
  position: relative;
  margin: 0 12px 0 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid white;
}
.active_indicator {
  background: white;
  box-shadow: 0px 0px 5px 2px rgba(255, 255, 255, 1);
  &_animation_1 {
    animation: rotation1 0.65s;
  }
  &_animation_2 {
    animation: rotation2 0.65s;
  }
}
@keyframes rotation1 {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(180deg) rotateY(180deg);
  }
}
@keyframes rotation2 {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(180deg) rotateY(-180deg);
  }
}
</style>
