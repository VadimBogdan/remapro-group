<template>
  <ul id="switch" ref="switch">
    <li v-for="(image, index) in images" :key="index" @click="$emit('change-image-pos', index)"></li>
  </ul>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  watch: {
    activeIndex(newIndex, oldIndex) {
      this.$refs.switch.children[newIndex].classList.toggle('switch--active')
      this.$refs.switch.children[oldIndex].classList.toggle('switch--active')
    }
  },
  mounted() {
    this.$refs.switch.children[this.activeIndex].classList.toggle('switch--active')
  }
}
</script>

<style lang="scss" scoped>
#switch {
  > .switch--active {
    background: white;
    box-shadow: 0px 0px 5px 2px rgba(255, 255, 255, 1);
  }
  position: absolute;
  list-style: none;

  left: 50%;
  top: 85%;
  transform: translateX(-50%);
  z-index: 9999;

  padding: 0;
  margin: 0;

  > li {
    float: left;
    position: relative;

    padding: 7.5px;

    margin-right: 10px;

    border-radius: 50%;
    border: 1.4px solid white;
    transition: all 250ms ease-in-out;
  }
}
</style>
