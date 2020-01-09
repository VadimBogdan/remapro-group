<template>
  <div>
    <PhotoCarousel v-show="!mobileFallbackIndicator" class="carousel" />
    <MobileFallBack v-show="mobileFallbackIndicator" />
    <Goods />
    <AboutUs />
    <ContactForm />
  </div>
</template>

<script>
import MobileFallBack from '@/components/fallbacks/MobileFallBack'

import PhotoCarousel from '@/components/PhotoCarousel'
import AboutUs from '@/components/AboutUs'
import Goods from '@/components/Goods'
import ContactForm from '@/components/ContactUsForm'

export default {
  components: {
    MobileFallBack,

    PhotoCarousel,

    AboutUs,
    Goods,
    ContactForm
  },
  data() {
    return {
      mobileFallbackIndicator: true,
      mobileFallback: null
    }
  },
  updated() {
    this.onRouteChange()
  },
  mounted() {
    this.$nuxt.$on('routeChanged', this.onRouteChange)
    setTimeout(this.onRouteChange, 1)

    window.addEventListener('load', this.onRouteChange)
    window.addEventListener('resize', this.onRouteChange)
  },
  beforeDestroy() {
    this.$nuxt.$off('routeChanged', this.onRouteChange)
  },
  methods: {
    onRouteChange() {
      this.mobileFallback = document.getElementById('mobile-fallback')
      if (!this.mobileFallback) {
        return
      }
      if (window.innerWidth <= 700) {
        this.mobileFallbackIndicator = true
        this.mobileFallback.style.visibility = 'visible'
        this.mobileFallback.style.height = '500px'
      } else {
        this.mobileFallbackIndicator = false
        this.mobileFallback.style.visibility = ''
        this.mobileFallback.style.height = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid:
    'nav nav nav' 75px
    'carousel carousel carousel' auto
    '. goods .' auto
    '. aboutUs .' auto
    '. form .' auto
    'footer footer footer' auto
    / 1fr minmax(150px, 1170px) 1fr;

  // grid-template-columns: ;repeat(2, 1fr)
  // grid-template-rows: 150px auto repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  // background-size: cover;
}
</style>
