<template>
  <div class="container">
    <InfoBar class="infobar" />
    <InfoBarFixedHelper class="infobarhelper" />
    <PhotoCarousel class="carousel" />
  </div>
</template>

<script>
import InfoBar from '@/components/InfoBar.vue'
import PhotoCarousel from '@/components/PhotoCarousel'
import InfoBarFixedHelper from '@/components/InfoBarFixedHelper'

export default {
  components: {
    InfoBar,
    PhotoCarousel,
    InfoBarFixedHelper
  }
}
</script>

<style lang="scss" scoped>
.container {
  .infobar {
    z-index: 10;
    background-color: white;
  }
  .carousel {
    z-index: 1;
  }
  background-size: cover;
  //background: url('~assets/background.jpg') no-repeat center;
  //background-size: cover;
  //box-shadow: inset 0px 0px 38px -17px rgba(0, 0, 0, 1);
  overflow: auto;
  //background: rgba(0, 0, 0, 0.725) no-repeat center;
}
</style>
