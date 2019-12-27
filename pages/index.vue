<template>
  <div class="container">
    <NavInfoBar class="infobar" />
    <PhotoCarousel v-show="!mobileFallback" class="carousel" />
    <MobileFallBack v-show="mobileFallback" />
    <Goods class="goods" />
    <AboutUs />
    <ContactForm />
    <Footer />
  </div>
</template>

<script>
import MobileFallBack from '@/components/fallbacks/MobileFallBack'

import PhotoCarousel from '@/components/PhotoCarousel'
import NavInfoBar from '@/components/NavInfoBar'
import AboutUs from '@/components/AboutUs'
import Goods from '@/components/Goods'
import ContactForm from '@/components/ContactUsForm'
import Footer from '@/components/Footer'

export default {
  components: {
    MobileFallBack,

    PhotoCarousel,
    NavInfoBar,
    AboutUs,
    Goods,
    ContactForm,
    Footer
  },
  data() {
    return {
      mobileFallback: true
    }
  },
  beforeUpdate() {
    if (window.innerWidth <= 700) {
      this.mobileFallback = true
    } else {
      this.mobileFallback = false
    }
  },
  beforeMount() {
    window.addEventListener('load', () => {
      if (window.innerWidth <= 700) {
        this.mobileFallback = true
      } else {
        this.mobileFallback = false
      }
    })
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 700) {
        this.mobileFallback = true
      } else {
        this.mobileFallback = false
      }
    })
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
